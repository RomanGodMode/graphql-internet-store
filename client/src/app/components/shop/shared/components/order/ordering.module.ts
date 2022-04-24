import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OrderService } from './order.service'
import { GetMyOrdersGQL } from '../../query/get-my-orders.query'
import { PushOrderGQL } from '../../mutation/push-order.mutation'
import { GetCartGQL } from '../../../../shared/quyery/get-cart.query'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [OrderService, GetMyOrdersGQL, PushOrderGQL, GetCartGQL]
})
export class OrderingModule {
}
