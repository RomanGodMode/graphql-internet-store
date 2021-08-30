import { Component, OnInit } from '@angular/core'
import { CartService } from '../../shared/components/cart/cart.service'
import { map } from 'rxjs/operators'
import { staticUrl } from '../../../../functions/static-url'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  staticUrl = staticUrl

  $items = this.cartService.cart$.pipe(
    map(cart => Object.values(cart.items))
  )

  constructor(public cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe()
  }

}
