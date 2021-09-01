import { Injectable } from '@angular/core'
import { GetMyOrdersGQL, Order, Status } from '../../query/get-orders.query'
import { PushOrderGQL } from '../../mutation/push-order.mutation'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { GetCartGQL } from '../../../../shared/quyery/get-cart.query'
import { localizeDate } from '../../../../../functions/localize-date'
import { localizeStatus } from '../../../../../functions/localize-status'

@Injectable()
export class OrderService {
  constructor(
    private getMyOrdersGQL: GetMyOrdersGQL,
    private pushOrderGQL: PushOrderGQL,
    private getCartGQL: GetCartGQL
  ) {
    this.isLoading$.next(true)

    this.orders$ = this.getMyOrdersGQL.fetch({}, { fetchPolicy: 'network-only' }).pipe(
      tap(() => this.isLoading$.next(false)),
      map(res => res.data.myOrders),
      tap(console.log),
      map(orders => orders.map(order => ({
          ...order,
          orderingDate: localizeDate(order.orderingDate),
          status: localizeStatus(order.status) as Status
        })
      ))
    )
  }

  orders$: Observable<Order[]>
  isLoading$ = new BehaviorSubject(false)

  // fetchOrders() {
  //
  // }

  pushOrder(onSuccess?: () => any) {
    this.pushOrderGQL.mutate({}, {
      refetchQueries: [
        { query: this.getCartGQL.document },
        { query: this.getMyOrdersGQL.document }
      ]
    }).subscribe(onSuccess)
  }

}
