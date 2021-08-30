import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CartService } from './cart.service'
import { GetCartGQL } from '../../../../shared/quyery/get-cart.query'
import { SetCartItemsGQL } from '../../mutation/setCartItems.mutation'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [CartService, GetCartGQL, SetCartItemsGQL]
})
export class CartModule {
}
