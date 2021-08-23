import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AdminRegisterComponent } from './admin-register.component'
import { AbstractAuthPageModule } from '../abstract-auth-page/abstract-auth-page.module'


@NgModule({
  declarations: [AdminRegisterComponent],
  imports: [
    CommonModule,
    AbstractAuthPageModule,
    RouterModule.forChild([{
      path: '',
      component: AdminRegisterComponent
    }])
  ]
})
export class AdminRegisterModule {
}
