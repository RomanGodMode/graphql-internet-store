import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaginatorComponent } from './paginator.component'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [
    PaginatorComponent
  ],
  exports: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule
  ]
})
export class PaginatorModule {
}
