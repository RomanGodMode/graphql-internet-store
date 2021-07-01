import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NumericComponent } from './numeric.component'
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    NumericComponent
  ],
  exports: [
    NumericComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class NumericModule {
}
