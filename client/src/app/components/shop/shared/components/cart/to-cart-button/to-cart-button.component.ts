import { Component, Input, OnInit } from '@angular/core'
import { CartService } from '../cart.service'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'shop-to-cart-button',
  templateUrl: './to-cart-button.component.html',
  styleUrls: ['./to-cart-button.component.scss']
})
export class ToCartButtonComponent implements OnInit {

  @Input()
  productId: number

  inCartCount: Observable<number>

  itemCountControl = new FormControl('')
  productAmount: Observable<number>

  constructor(
    public cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.inCartCount = this.cartService.cart$.pipe(
      map(cart => cart.items[this.productId]?.count || 0)
    )

    this.productAmount = this.cartService.cart$.pipe(
      map(cart => cart.items[this.productId]?.product.amount)
    )

    this.inCartCount.pipe(
      map(count => this.itemCountControl = new FormControl(count)),
      switchMap(itemCountControl => itemCountControl.valueChanges),
      debounceTime(1000),
      distinctUntilChanged(),
      tap(count => this.cartService.setItem(this.productId, count))
    ).subscribe(
      console.log
    )
  }

}
