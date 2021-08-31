import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChosenComponent } from './chosen.component'
import { RouterModule } from '@angular/router'
import { SharedComponentsModule } from '../../../shared/shared-components.module'
import { ToCartButtonModule } from '../../shared/components/cart/to-cart-button/to-cart-button.module'


@NgModule({
  declarations: [
    ChosenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ChosenComponent
    }]),
    SharedComponentsModule,
    ToCartButtonModule
  ]
})
export class ChosenPageModule {
}
