import { Component, Input, OnInit } from '@angular/core'
import { Product } from '../../../../../types/product'

@Component({
  selector: 'shop-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input()
  product: Product

  constructor() {
  }

  ngOnInit(): void {
  }

}
