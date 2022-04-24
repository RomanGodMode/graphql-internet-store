import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OrdersListComponent } from './orders-list.component'
import { SharedComponentsModule } from '../shared-components.module'
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [
    OrdersListComponent
  ],
  exports: [
    OrdersListComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule
  ]
})
export class OrdersListModule {
}
