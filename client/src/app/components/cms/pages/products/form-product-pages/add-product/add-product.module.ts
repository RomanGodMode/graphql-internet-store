import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddProductComponent } from './add-product.component'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedComponentsModule } from '../../../../../shared/shared-components.module'
import { CheckboxModule } from '../../../../shared/components/checkbox/checkbox.module'
import { SelectModule } from '../../../../shared/components/select/select.module'
import { NumericModule } from '../../../../shared/components/numeric/numeric.module'
import { FormErrorDisplayModule } from '../../../../shared/components/form-error-display/form-error-display.module'


@NgModule({
  declarations: [
    AddProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: AddProductComponent
    }]),
    ReactiveFormsModule,
    SharedComponentsModule,
    CheckboxModule,
    SelectModule,
    NumericModule,
    FormErrorDisplayModule
  ]
})
export class AddProductModule {
}
