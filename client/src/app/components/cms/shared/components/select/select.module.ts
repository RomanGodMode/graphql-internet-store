import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SelectComponent } from './select.component'
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    SelectComponent
  ],
  exports: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SelectModule {
}
