import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ToCartButtonComponent } from './to-cart-button.component'


@NgModule({
  declarations: [
    ToCartButtonComponent
  ],
  exports: [
    ToCartButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ToCartButtonModule {
}
