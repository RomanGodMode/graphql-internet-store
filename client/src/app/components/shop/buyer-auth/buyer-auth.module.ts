import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BuyerAuthService } from './buyer-auth.service'
import { IsAuthGQL } from './query/is-auth.query'
import { LoginGQL } from './mutations/login.mutation.mutation'
import { RegisterGQL } from './mutations/register.mutation'
import { BuyerAuthGuard } from './buyer-auth.guard'


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BuyerAuthService,
    IsAuthGQL,
    LoginGQL,
    RegisterGQL,
    BuyerAuthGuard
  ]
})
export class BuyerAuthModule {
}
