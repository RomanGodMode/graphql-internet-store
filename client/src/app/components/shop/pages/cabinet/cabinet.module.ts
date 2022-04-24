import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CabinetComponent } from './cabinet.component'
import { RouterModule } from '@angular/router'
import { SharedComponentsModule } from '../../../shared/shared-components.module'
import { OrderingModule } from '../../shared/components/order/ordering.module'
import { OrdersListModule } from '../../../shared/orders-list/orders-list.module'


@NgModule({
  declarations: [
    CabinetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CabinetComponent }]),
    OrderingModule,
    SharedComponentsModule,
    OrdersListModule
  ]
})
export class CabinetModule {
}
