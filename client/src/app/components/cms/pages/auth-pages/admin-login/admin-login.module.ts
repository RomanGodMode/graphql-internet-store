import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminLoginComponent } from './admin-login.component'
import { RouterModule } from '@angular/router'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'
import { AbstractAuthPageModule } from '../abstract-auth-page/abstract-auth-page.module'


@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: AdminLoginComponent
    }]),
    AbstractAuthPageModule,
    SharedComponentsModule
  ]
})
export class AdminLoginModule {
}
