import { Injectable } from '@angular/core'
import { BehaviorSubject, EMPTY, Observable } from 'rxjs'
import { MessagesService } from '../buyer-notification/messages.service'
import { catchError, map, tap } from 'rxjs/operators'
import { ChosenProducts, GetChosenProducts } from './query/get-chosen-products.query'
import { SetChosenProducts } from './mutation/set-chosen-products.mutation'

@Injectable()
export class ChosenService {
  chosenProducts$: Observable<ChosenProducts>
  isLoading$ = new BehaviorSubject(false)

  constructor(
    private getChosenProducts: GetChosenProducts,
    private setChosenProducts: SetChosenProducts,
    private messagesService: MessagesService
  ) {
    this.isLoading$.next(true)
    this.chosenProducts$ = getChosenProducts.watch({}, { fetchPolicy: 'network-only' }).valueChanges.pipe(
      tap(() => this.isLoading$.next(false)),
      catchError(err => {
        err.message === 'Forbidden resource'
          ? messagesService.showMessage('Добавлять в избранное можно только авторизованными пользователям')
          : messagesService.showMessage(err.message)

        return EMPTY
      }),
      map(res => res.data.getChosenProducts)
    )
  }

  setProduct(productId: number, isDelete = false) {
    this.setChosenProducts.mutate(
      { items: [productId], isDelete },
      { refetchQueries: [{ query: this.getChosenProducts.document }] }
    ).pipe(
      catchError(err => {
        this.messagesService.showMessage(err.message)
        return EMPTY
      })
    ).subscribe()
  }

  addItem(productId: number) {
    this.setProduct(productId)
  }

  deleteItem(productId: number) {
    this.setProduct(productId, true)
  }

}
