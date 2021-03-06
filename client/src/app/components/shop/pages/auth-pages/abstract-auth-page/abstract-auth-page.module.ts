import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AbstractAuthPageComponent } from './abstract-auth-page.component'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PasswordInputModule } from './password-input/password-input.module'


@NgModule({
  declarations: [AbstractAuthPageComponent],
  imports: [
    CommonModule,
    PasswordInputModule,
    SharedComponentsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [AbstractAuthPageComponent]
})
export class AbstractAuthPageModule {
}
