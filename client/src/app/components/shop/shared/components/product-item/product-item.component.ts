import { Component, Input, OnInit } from '@angular/core'
import { Product } from '../../../../../types/product'
import { staticUrl } from '../../../../../functions/static-url'

@Component({
  selector: 'shop-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  staticUrl = staticUrl

  @Input()
  product: Product

  constructor() {
  }

  ngOnInit(): void {
  }

}
