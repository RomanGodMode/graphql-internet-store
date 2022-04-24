import { Component, OnInit } from '@angular/core'
import { GetNewProductsGQL } from './query/get-new-products.query'
import { BehaviorSubject, EMPTY, Observable } from 'rxjs'
import { CategorizedProduct } from '../../../shared/quyery/get-category-with-filtered-products.query'
import { catchError, map, tap } from 'rxjs/operators'
import { MessagesService } from '../../shared/components/buyer-notification/messages.service'

@Component({
  selector: 'shop-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GetNewProductsGQL]
})
export class HomeComponent implements OnInit {

  constructor(
    private getNewProductsGQL: GetNewProductsGQL,
    private messagesService: MessagesService
  ) {
  }

  newProducts$: Observable<CategorizedProduct[]>
  isLoading$ = new BehaviorSubject(false)

  ngOnInit(): void {
    this.isLoading$.next(true)
    this.newProducts$ = this.getNewProductsGQL.fetch().pipe(
      catchError(err => {
        this.messagesService.showErrorMessage(err.message)
        return EMPTY
      }),
      tap(() => this.isLoading$.next(false)),
      map(res => res.data.getNewProducts)
    )
    this.newProducts$.subscribe()
  }

}
