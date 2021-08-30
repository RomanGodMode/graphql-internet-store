import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ToCartButtonComponent } from './to-cart-button.component'
import { CartNumericModule } from '../cart-numeric/cart-numeric.module'
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    ToCartButtonComponent
  ],
  exports: [
    ToCartButtonComponent
  ],
  imports: [
    CommonModule,
    CartNumericModule,
    ReactiveFormsModule
  ]
})
export class ToCartButtonModule {
}
