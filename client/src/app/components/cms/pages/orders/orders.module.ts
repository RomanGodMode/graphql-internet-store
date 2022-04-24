import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { OrdersComponent } from './orders.component'
import { SharedComponentsModule } from '../../../shared/shared-components.module'
import { OrdersListModule } from '../../../shared/orders-list/orders-list.module'
import { OrderingModule } from '../../../shop/shared/components/order/ordering.module'
import { ReactiveFormsModule } from '@angular/forms'
import { NumericModule } from '../../shared/components/numeric/numeric.module'
import { SelectModule } from '../../shared/components/select/select.module'


@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OrdersComponent }]),
    SharedComponentsModule,
    OrderingModule,
    OrdersListModule,
    ReactiveFormsModule,
    NumericModule,
    SelectModule
  ]
})
export class OrdersModule {
}
