import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductItemComponent } from './product-item.component'
import { RouterModule } from '@angular/router'
import { ToCartButtonModule } from '../cart/to-cart-button/to-cart-button.module'
import { ChosenModule } from '../chosen/chosen.module'


@NgModule({
  declarations: [
    ProductItemComponent
  ],
  exports: [
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToCartButtonModule,
    ChosenModule
  ]
})
export class ProductItemModule {
}
