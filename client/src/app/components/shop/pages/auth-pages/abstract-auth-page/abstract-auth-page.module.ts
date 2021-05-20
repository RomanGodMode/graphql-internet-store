import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AbstractAuthPageComponent } from './abstract-auth-page.component'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'
import { RouterModule } from '@angular/router'
import { PasswordInputComponent } from './password-input/password-input.component'
import { ShowPasswordService } from './password-input/show-password.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginGQL } from './mutations/login.mutation.mutation'
import { RegisterGQL } from './mutations/register.mutation'


@NgModule({
  declarations: [AbstractAuthPageComponent, PasswordInputComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ShowPasswordService,
    LoginGQL,
    RegisterGQL
  ],
  exports: [AbstractAuthPageComponent]
})
export class AbstractAuthPageModule {
}
