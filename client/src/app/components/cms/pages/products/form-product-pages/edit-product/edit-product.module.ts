import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditProductComponent } from './edit-product.component'
import { RouterModule } from '@angular/router'
import { SharedComponentsModule } from '../../../../../shared/shared-components.module'
import { FormErrorDisplayModule } from '../../../../shared/components/form-error-display/form-error-display.module'
import { SelectModule } from '../../../../shared/components/select/select.module'
import { CheckboxModule } from '../../../../shared/components/checkbox/checkbox.module'
import { NumericModule } from '../../../../shared/components/numeric/numeric.module'
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: EditProductComponent
    }]),
    SharedComponentsModule,
    FormErrorDisplayModule,
    SelectModule,
    CheckboxModule,
    NumericModule,
    ReactiveFormsModule
  ]
})
export class EditProductModule {
}
