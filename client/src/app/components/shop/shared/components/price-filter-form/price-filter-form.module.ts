import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PriceFilterFormComponent } from './price-filter-form.component'
import { ReactiveFormsModule } from '@angular/forms'
import { NumericModule } from '../../../../cms/shared/components/numeric/numeric.module'


@NgModule({
  declarations: [
    PriceFilterFormComponent
  ],
  exports: [
    PriceFilterFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NumericModule
  ]
})
export class PriceFilterFormModule {
}
