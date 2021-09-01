import { Component, OnInit } from '@angular/core'
import { CartService } from '../../shared/components/cart/cart.service'
import { map } from 'rxjs/operators'
import { staticUrl } from '../../../../functions/static-url'
import { OrderService } from '../../shared/components/ordering/order.service'
import { Router } from '@angular/router'

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

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe()
  }

  pushOrder() {
    this.orderService.pushOrder(() => this.router.navigateByUrl('/cabinet'))
  }

}
