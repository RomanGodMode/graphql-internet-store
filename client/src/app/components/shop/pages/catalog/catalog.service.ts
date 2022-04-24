import { Injectable } from '@angular/core'
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import {
  CatalogData,
  GetCategoryWithFilteredProductsGQL,
  InfoNumFilter
} from '../../../shared/quyery/get-category-with-filtered-products.query'
import { ActivatedRoute, Params } from '@angular/router'
import { MessagesService } from '../../shared/components/buyer-notification/messages.service'
import { InfoValue } from '../../../../types/product'
import { booleanPrefix, infoPrefix, maxNumFieldPrefix, minNumFieldPrefix } from '../../../../consts'

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
          ordering: query.ordering,
          infoValues: this.getInfoValues(query)
        }, { fetchPolicy: 'network-only' })),
        tap(() => this._isLoading$.next(false)),
        catchError(err => {
          messagesService.showErrorMessage(err.message)
          return EMPTY
        }),
        map(res => res.data.getCategory)
      )
  }

  private getInfoValues(query: Params) {
    const numValues = Object.entries(query)
      .filter(([key, _]) => key.startsWith(minNumFieldPrefix) || key.startsWith(maxNumFieldPrefix))
      .reduce((acc, [key, value]) => {
        const isMin = key.startsWith(minNumFieldPrefix)
        const name = key.replace(minNumFieldPrefix, '').replace(maxNumFieldPrefix, '')

        const existingFilter = acc.find(infoFilter => infoFilter.name === name)

        if (existingFilter) {
          if (isMin) {
            existingFilter.minValue = value
          } else {
            existingFilter.maxValue = value
          }

          return acc
        }

        acc.push({
          name,
          minValue: isMin ? value : '',
          maxValue: !isMin ? value : ''
        })

        return acc
      }, [] as InfoNumFilter[])

    const boolValues = Object.entries(query)
      .filter(([key, _]) => key.startsWith(booleanPrefix))
      .map(([key, value]) => ({
        name: key.replace(booleanPrefix, ''),
        value: value === 'true'
      }) as any)

    const otherValues = Object.entries(query)
      .filter(([key, _]) => key.startsWith(infoPrefix))
      .map(([key, value]) => ({
        name: key.replace(infoPrefix, ''),
        value
      } as InfoValue))

    return [
      ...numValues,
      ...boolValues,
      ...otherValues
    ]
  }
}
