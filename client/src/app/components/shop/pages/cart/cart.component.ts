import { Component, OnInit } from '@angular/core'
import { CartService } from '../../shared/components/cart/cart.service'
import { map } from 'rxjs/operators'
import { staticUrl } from '../../../../functions/static-url'
import { OrderService } from '../../shared/components/order/order.service'
import { BehaviorSubject } from 'rxjs'

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
  isSuccessfulOrder$ = new BehaviorSubject(false)

  constructor(
    public cartService: CartService,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe()
  }

  pushOrder() {
    this.orderService.pushOrder(() => {
      // this.router.navigateByUrl('/cabinet').then()
      this.isSuccessfulOrder$.next(true)
    })
  }

}
