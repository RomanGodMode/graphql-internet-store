import { Component, Input, OnInit } from '@angular/core'
import { OrderService } from '../../shop/shared/components/order/order.service'
import { ActivatedRoute } from '@angular/router'
import { combineLatest, Observable } from 'rxjs'
import { Cart } from '../quyery/get-cart.query'
import { CategorizedProduct } from '../quyery/get-category-with-filtered-products.query'
import { filter, map } from 'rxjs/operators'
import { staticUrl } from 'src/app/functions/static-url'
import { Order } from '../../shop/shared/query/types'

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['../../../components/shop/pages/cart/cart.component.scss', './orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  staticUrl = staticUrl

  constructor(
    public orderService: OrderService,
    private route: ActivatedRoute
  ) {
  }

  @Input()
  isAdmin: boolean

  selectedCart$: Observable<Cart>
  selectedOrder$: Observable<Order>
  cartItems$: Observable<{ product: CategorizedProduct, count: number }[]>

  ngOnInit(): void {
    this.selectedOrder$ = combineLatest([
      this.route.queryParams.pipe(map(query => +query.orderId)),
      this.orderService.orders$
    ]).pipe(
      filter(([orderId]) => !!orderId),
      map(([orderId, orders]) => orders.find(order => order.id === orderId)),
      filter(order => !!order)
    )

    this.selectedOrder$.subscribe(
      order => {
        this.orderService._isSelectedOrderedOrder$.next(order.status === 'Заказан')
      }
    )

    this.selectedCart$ = this.selectedOrder$.pipe(
      map(order => order.cart)
    )

    this.cartItems$ = this.selectedCart$.pipe(
      map(cart => Object.values(cart.items))
    )
  }

  confirmOrderComplete() {
    this.orderService.confirmOrderComplete(+this.route.snapshot.queryParams.orderId)
  }

}
