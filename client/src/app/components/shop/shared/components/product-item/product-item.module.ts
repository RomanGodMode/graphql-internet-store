import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductItemComponent } from './product-item.component'


@NgModule({
  declarations: [
    ProductItemComponent
  ],
  exports: [
    ProductItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductItemModule {
}
