import { Injectable } from '@angular/core'
import { GetMyOrdersGQL } from '../../query/get-my-orders.query'
import { PushOrderGQL } from '../../mutation/push-order.mutation'
import { BehaviorSubject, EMPTY } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { GetCartGQL } from '../../../../shared/quyery/get-cart.query'
import { localizeDate } from '../../../../../functions/localize-date'
import { localizeStatus } from '../../../../../functions/localize-status'
import { Order, ServerStatus, Status } from '../../query/types'
import { SearchOrdersGQL } from '../../query/search-orders.query'
import { MessagesService } from '../buyer-notification/messages.service'
import { PatchOrderGQL } from '../../mutation/patch-order.mutation'

export type SearchOrdersPayload = {
  id: number | null
  status: ServerStatus | null
}

@Injectable()
export class OrderService {
  constructor(
    private getMyOrdersGQL: GetMyOrdersGQL,
    private searchOrdersGQL: SearchOrdersGQL,
    private pushOrderGQL: PushOrderGQL,
    private getCartGQL: GetCartGQL,
    private messagesService: MessagesService,
    private patchOrderGQL: PatchOrderGQL
  ) {
  }

  _orders$ = new BehaviorSubject<Order[]>([])
  orders$ = this._orders$.asObservable()
  isLoading$ = new BehaviorSubject(false)

  fetchMyOrders() {
    this.isLoading$.next(true)
    this.getMyOrdersGQL.fetch({}, { fetchPolicy: 'network-only' }).pipe(
      tap(() => this.isLoading$.next(false)),
      tap(console.log),
      map(res => res.data.myOrders),
      map(this.normalizeOrders)
    ).subscribe(
      order => this._orders$.next(order)
    )
  }

  searchOrders(payload: SearchOrdersPayload) {
    this.isLoading$.next(true)
    return this.searchOrdersGQL.watch(payload).valueChanges.pipe(
      map(res => res.data.searchOrders),
      map(this.normalizeOrders),
      tap(orders => this._orders$.next(orders)),
      tap(() => this.isLoading$.next(false)),
      catchError(err => {
        this.messagesService.showErrorMessage(err.message)
        this.isLoading$.next(false)
        return EMPTY
      })
    )
  }

  _selectedOrderFilter$ = new BehaviorSubject<SearchOrdersPayload>({ id: null, status: null })
  _isSelectedOrderedOrder$ = new BehaviorSubject(false)

  confirmOrderComplete(orderId: number) {
    this.patchOrderGQL.mutate({ id: orderId, status: 'completed' }, {
      update: (cache) => {
        const selectedOrderFilter = this._selectedOrderFilter$.value
        let orders: Order[] = (cache.readQuery({
          query: this.searchOrdersGQL.document,
          variables: selectedOrderFilter
        }) as any).searchOrders.map(order => ({ ...order }))

        const completedOrder = orders.find(order => order.id === orderId)
        if (selectedOrderFilter.status === null) {
          completedOrder.status = 'Завершён'
        } else {
          orders = orders.filter(order => order !== completedOrder)
        }


        cache.writeQuery({
          query: this.searchOrdersGQL.document,
          variables: selectedOrderFilter,
          data: {
            searchOrders: orders
          }
        })

      }
    }).subscribe(() => this.messagesService.showSuccessMessage('Заказ успешно завершён'))
  }

  pushOrder(onSuccess?: () => any) {
    this.pushOrderGQL.mutate({}, {
      refetchQueries: [
        { query: this.getCartGQL.document },
        { query: this.getMyOrdersGQL.document }
      ]
    }).subscribe(onSuccess)
  }

  private normalizeOrders = (orders: Order[]) => orders.map(order => ({
      ...order,
      orderingDate: localizeDate(order.orderingDate),
      status: localizeStatus(order.status) as Status
    })
  )

}
