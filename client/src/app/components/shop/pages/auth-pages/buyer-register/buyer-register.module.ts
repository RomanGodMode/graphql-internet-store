import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { BuyerRegisterComponent } from './buyer-register.component'
import { AbstractAuthPageModule } from '../abstract-auth-page/abstract-auth-page.module'


@NgModule({
  declarations: [BuyerRegisterComponent],
  imports: [
    CommonModule,
    AbstractAuthPageModule,
    RouterModule.forChild([{
      path: '',
      component: BuyerRegisterComponent
    }])
  ]
})
export class BuyerRegisterModule {
}
