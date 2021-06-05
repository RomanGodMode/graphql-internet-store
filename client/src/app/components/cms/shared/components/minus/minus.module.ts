import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MinusComponent } from './minus.component'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'


@NgModule({
  declarations: [MinusComponent],
  imports: [
    CommonModule,
    SharedComponentsModule
  ],
  exports: [
    MinusComponent
  ]
})
export class MinusModule {
}
