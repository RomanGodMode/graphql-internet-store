import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap, takeUntil, tap } from 'rxjs/operators'
import { GetCategoryWithProductsGQL } from '../../../../shared/quyery/get-category-with-products.query'
import { Observable, ReplaySubject } from 'rxjs'
import { CategoryWithProducts } from '../../../../../types/category'
import { environment } from '../../../../../../environments/environment'

@Component({
  selector: 'app-edit-product-list',
  templateUrl: './edit-product-list.component.html',
  styleUrls: ['./edit-product-list.component.scss'],
  providers: [GetCategoryWithProductsGQL]
})
export class EditProductListComponent implements OnInit, OnDestroy {

  staticServerUrl = environment.staticServerUrl

  _destroyed$ = new ReplaySubject()

  category$: Observable<CategoryWithProducts>

  constructor(private activatedRoute: ActivatedRoute, private getCategoryWithProductsGQL: GetCategoryWithProductsGQL) {
  }

  ngOnInit(): void {
    this.category$ = this.activatedRoute.params.pipe(
      map(params => +params.categoryId),
      tap(console.log),
      switchMap(id => this.getCategoryWithProductsGQL.fetch({ id }, { fetchPolicy: 'no-cache' })),
      map(res => res.data.getCategory),
      tap(console.log),
      takeUntil(this._destroyed$)
    )
  }

  ngOnDestroy(): void {
    this._destroyed$.next()
    this._destroyed$.complete()
  }

}
