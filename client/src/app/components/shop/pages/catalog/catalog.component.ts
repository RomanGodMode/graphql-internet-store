import { Component, OnInit } from '@angular/core'
import { combineLatest, Observable } from 'rxjs'
import { CategoryWithProducts } from '../../../../types/category'
import { GetCategoryWithFilteredProductsGQL } from '../../../shared/quyery/get-category-with-filtered-products.query'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'shop-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [GetCategoryWithFilteredProductsGQL]
})
export class CatalogComponent implements OnInit {

  category$ = new Observable<CategoryWithProducts>()

  constructor(
    private getCategoryWithFilteredProductsGQL: GetCategoryWithFilteredProductsGQL,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(console.log)
    combineLatest([this.route.params, this.route.queryParams])
      .subscribe(([params, query]) => {
        console.log('ПАРАМЫ')
        console.log(params)
        console.log('КВЕРИ')
        console.log(query)
      })

  }

}
