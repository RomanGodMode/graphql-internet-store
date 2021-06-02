import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditableListComponent } from './editable-list.component'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    EditableListComponent
  ],
  exports: [
    EditableListComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    ReactiveFormsModule
  ]
})
export class EditableListModule {
}
