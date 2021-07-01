import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormErrorDisplayComponent } from './form-error-display.component'


@NgModule({
  declarations: [
    FormErrorDisplayComponent
  ],
  exports: [
    FormErrorDisplayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormErrorDisplayModule {
}
