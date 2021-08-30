import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CartNumericComponent } from './cart-numeric.component'
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    CartNumericComponent
  ],
  exports: [
    CartNumericComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CartNumericModule {
}
