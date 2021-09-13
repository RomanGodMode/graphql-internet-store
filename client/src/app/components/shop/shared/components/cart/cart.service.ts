import { Injectable } from '@angular/core'
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs'
import { Cart, GetCartGQL } from '../../../../shared/quyery/get-cart.query'
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators'
import { MessagesService } from '../buyer-notification/messages.service'
import { CartItemInput, SetCartItemsGQL } from '../../mutation/setCartItems.mutation'
import { BuyerAuthService } from '../../../buyer-auth/buyer-auth.service'


@Injectable()
export class CartService {
  cart$: Observable<Cart>
  isLoading$ = new BehaviorSubject(false)

  constructor(
    private getCart: GetCartGQL,
    private setCart: SetCartItemsGQL,
    private messagesService: MessagesService,
    private authService: BuyerAuthService
  ) {
    this.isLoading$.next(true)
    this.cart$ = authService.isAuth$.pipe(
      filter(isAuth => isAuth),
      switchMap(() => getCart.watch({}, { fetchPolicy: 'network-only' }).valueChanges),
      tap(() => this.isLoading$.next(false)),
      catchError(err => {
        err.message === 'Forbidden resource'
          ? messagesService.showMessage('Совершать покупки можно только авторизованными пользователям')
          : messagesService.showMessage(err.message)

        return of({ data: { getCart: { items: [] as any, totalPrice: 0 } } })
      }),
      map(res => res.data.getCart)
    )
  }

  setItems(items: CartItemInput[]) {
    this.setCart.mutate(
      { items },
      { refetchQueries: [{ query: this.getCart.document }] }
    ).pipe(
      catchError(err => {
        this.messagesService.showMessage(err.message)
        return EMPTY
      })
    ).subscribe()
  }

  setItem(productId: number, count: number) {
    this.setItems([{ productId, count }])
  }

  deleteItem(productId: number) {
    this.setItems([{ productId, count: 0 }])
  }

  buyOne(productId: number) {
    this.setItems([{ productId, count: 1 }])
  }


}
