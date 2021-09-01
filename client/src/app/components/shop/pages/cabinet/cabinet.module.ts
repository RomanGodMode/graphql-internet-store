import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CabinetComponent } from './cabinet.component'
import { RouterModule } from '@angular/router'
import { SharedComponentsModule } from '../../../shared/shared-components.module'
import { OrderingModule } from '../../shared/components/ordering/ordering.module'


@NgModule({
  declarations: [
    CabinetComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CabinetComponent }]),
    OrderingModule,
    SharedComponentsModule
  ]
})
export class CabinetModule {
}
