import { Component, OnInit } from '@angular/core'
import { OrderService } from '../../shared/components/ordering/order.service'
import { combineLatest, Observable } from 'rxjs'
import { Cart } from '../../../shared/quyery/get-cart.query'
import { ActivatedRoute } from '@angular/router'
import { filter, map, tap } from 'rxjs/operators'
import { staticUrl } from 'src/app/functions/static-url'
import { CategorizedProduct } from '../../../shared/quyery/get-category-with-filtered-products.query'

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['../cart/cart.component.scss', './cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  staticUrl = staticUrl

  constructor(
    public orderService: OrderService,
    private route: ActivatedRoute
  ) {
  }

  selectedCart$: Observable<Cart>
  cartItems$: Observable<{ product: CategorizedProduct, count: number }[]>

  ngOnInit(): void {

    this.selectedCart$ = combineLatest([
      this.route.queryParams.pipe(map(query => +query.orderId)),
      this.orderService.orders$
    ]).pipe(
      tap(console.log),
      filter(([orderId]) => !!orderId),
      map(([orderId, orders]) => orders.find(order => order.id === orderId)?.cart),
      filter(cart => !!cart)
    )

    this.cartItems$ = this.selectedCart$.pipe(
      map(cart => Object.values(cart.items))
    )
    this.selectedCart$.subscribe()
  }


}


