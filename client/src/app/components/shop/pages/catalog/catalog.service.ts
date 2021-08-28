import { Injectable } from '@angular/core'
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { CatalogData, GetCategoryWithFilteredProductsGQL } from '../../../shared/quyery/get-category-with-filtered-products.query'
import { ActivatedRoute } from '@angular/router'
import { MessagesService } from '../../shared/components/buyer-notification/messages.service'

@Injectable()
export class CatalogService {

  catalogData$ = new Observable<CatalogData>()
  _isLoading$ = new BehaviorSubject(false)

  constructor(
    private getCategoryWithFilteredProductsGQL: GetCategoryWithFilteredProductsGQL,
    private messagesService: MessagesService,
    private route: ActivatedRoute
  ) {
    this._isLoading$.next(true)
    this.catalogData$ = combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        switchMap(([params, query]) => this.getCategoryWithFilteredProductsGQL.fetch({
          id: +params.categoryId,
          name: query.name,
          minPrice: query.minPrice && +query.minPrice,
          maxPrice: query.maxPrice && +query.maxPrice,
          pageNumber: query.pageNumber && +query.pageNumber,
          ordering: query.ordering
        }, { fetchPolicy: 'network-only' })),
        tap(() => this._isLoading$.next(false)),
        catchError(err => {
          messagesService.showMessage(err.message)
          return EMPTY
        }),
        map(res => res.data.getCategory)
      )
  }
}
