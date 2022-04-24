import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { CartComponent } from './cart.component'
import { SharedComponentsModule } from '../../../shared/shared-components.module'
import { ToCartButtonModule } from '../../shared/components/cart/to-cart-button/to-cart-button.module'
import { OrderingModule } from '../../shared/components/order/ordering.module'


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    OrderingModule,
    RouterModule.forChild([{ path: '', component: CartComponent }]),
    SharedComponentsModule,
    ToCartButtonModule
  ]
})
export class CartPageModule {
}
