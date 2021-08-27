import { Component, OnInit } from '@angular/core'
import { GetCategoryWithFilteredProductsGQL } from '../../../shared/quyery/get-category-with-filtered-products.query'
import { CatalogService } from './catalog.service'

@Component({
  selector: 'shop-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [GetCategoryWithFilteredProductsGQL, CatalogService]
})
export class CatalogComponent implements OnInit {


  constructor(
    private catalogService: CatalogService
  ) {
  }

  ngOnInit(): void {
    this.catalogService.catalogData$.subscribe(console.log)
  }

}
