import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditCategoriesComponent } from './edit-categories.component'
import { RouterModule } from '@angular/router'
import { EditableListModule } from '../../shared/components/editable-list/editable-list.module'
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    EditCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EditCategoriesComponent }]),
    EditableListModule,
    ReactiveFormsModule
  ]
})
export class EditCategoriesModule {
}
