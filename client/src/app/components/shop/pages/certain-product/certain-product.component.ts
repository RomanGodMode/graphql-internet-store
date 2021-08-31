import { Component, OnInit } from '@angular/core'
import { map, switchMap, tap } from 'rxjs/operators'
import { BehaviorSubject, Observable, zip } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { GetProductGQL } from '../../../shared/quyery/get-full-product'
import { GetFullCategoryGQL } from '../../../shared/quyery/get-category.query'
import { FullProduct } from '../../../../types/product'
import { FullCategory } from '../../../../types/category'
import { staticUrl } from '../../../../functions/static-url'
import { MatedInfos, mateInfosWithValues } from '../../../../functions/mate-infos-with-values'

@Component({
  selector: 'app-certain-product',
  templateUrl: './certain-product.component.html',
  styleUrls: ['./certain-product.component.scss'],
  providers: [GetFullCategoryGQL, GetProductGQL]
})
export class CertainProductComponent implements OnInit {
  staticUrl = staticUrl

  productData$: Observable<{ product: FullProduct, category: FullCategory }>
  specifications$: Observable<MatedInfos>

  isLoading$ = new BehaviorSubject(false)

  constructor(
    private route: ActivatedRoute,
    private getFullCategoryGQL: GetFullCategoryGQL,
    private getProductGQL: GetProductGQL
  ) {
  }

  ngOnInit(): void {
    this.isLoading$.next(true)

    this.productData$ = this.route.params.pipe(
      map(params => ({ categoryId: +params.categoryId, productId: +params.productId })),
      switchMap(({ categoryId, productId }) => zip(
        this.getProductGQL.fetch({ id: productId }).pipe(map(res => res.data.getProduct)),
        this.getFullCategoryGQL.fetch({ id: categoryId }).pipe(map(res => res.data.getCategory.category)))
      ),
      tap(() => this.isLoading$.next(false)),
      map(([product, category]) => ({ product, category }))
    )
    this.productData$.subscribe()

    this.specifications$ = this.productData$.pipe(
      map(data => mateInfosWithValues(data.category.productInfoFields, data.product.infoValues))
    )
  }

}
