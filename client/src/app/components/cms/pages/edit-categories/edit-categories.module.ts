import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditCategoriesComponent } from './edit-categories.component'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { MinusModule } from '../../shared/components/minus/minus.module'
import { SharedComponentsModule } from '../../../shared/shared-components.module'


@NgModule({
  declarations: [
    EditCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EditCategoriesComponent }]),
    ReactiveFormsModule,
    MinusModule,
    SharedComponentsModule
  ]
})
export class EditCategoriesModule {
}
