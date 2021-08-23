import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminAuthService } from './admin-auth.service'
import { IsAuthGQL } from './query/is-auth.query'
import { LoginGQL } from './mutations/login.mutation'
import { RegisterGQL } from './mutations/register.mutation'
import { AdminAuthGuard } from './admin-auth.guard'
import { LogoutGQL } from './mutations/logout.mutation'


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AdminAuthService,
    IsAuthGQL,
    LoginGQL,
    RegisterGQL,
    LogoutGQL,
    AdminAuthGuard
  ]
})
export class AdminAuthModule {
}
