import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PasswordInputComponent } from './password-input.component'
import { ShowPasswordService } from './show-password.service'
import { SharedComponentsModule } from '../../../../../shared/shared-components.module'
import { FormsModule } from '@angular/forms'


@NgModule({
  declarations: [PasswordInputComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,
    FormsModule
  ],
  providers: [ShowPasswordService],
  exports: [PasswordInputComponent]
})
export class PasswordInputModule {
}
