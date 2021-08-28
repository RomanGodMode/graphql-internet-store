import { Component, OnInit } from '@angular/core'
import { CatalogService } from '../catalog.service'

@Component({
  selector: 'shop-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  constructor(public catalogService: CatalogService) {
  }

  ngOnInit(): void {
  }

}
