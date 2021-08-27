import { Injectable } from '@angular/core'
import { combineLatest, Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { CatalogData, GetCategoryWithFilteredProductsGQL } from '../../../shared/quyery/get-category-with-filtered-products.query'
import { ActivatedRoute } from '@angular/router'

@Injectable()
export class CatalogService {

  catalogData$ = new Observable<CatalogData>()

  constructor(
    private getCategoryWithFilteredProductsGQL: GetCategoryWithFilteredProductsGQL,
    private route: ActivatedRoute
  ) {
    this.catalogData$ = combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        switchMap(([params, query]) => this.getCategoryWithFilteredProductsGQL.fetch({
          id: +params.categoryId,
          name: query.name,
          minPrice: query.minPrice && +query.minPrice,
          maxPrice: query.maxPrice && +query.maxPrice,
          pageNumber: query.pageNumber && +query.pageNumber,
          ordering: query.ordering
        })),
        map(res => res.data.getCategory)
      )
  }
}
