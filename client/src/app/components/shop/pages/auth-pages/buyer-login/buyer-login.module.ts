import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BuyerLoginComponent } from './buyer-login.component'
import { RouterModule } from '@angular/router'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'
import { AbstractAuthPageModule } from '../abstract-auth-page/abstract-auth-page.module'


@NgModule({
  declarations: [BuyerLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: BuyerLoginComponent
    }]),
    AbstractAuthPageModule,
    SharedComponentsModule
  ]
})
export class BuyerLoginModule {
}
