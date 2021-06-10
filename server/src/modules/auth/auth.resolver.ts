import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { RegisterInput } from './input/register.input'
import { LoginInput } from './input/login.input'
import { Session } from './pipes/session.pipe'
import { UseGuards } from '@nestjs/common'
import { BuyerAuthGuard } from './guards/buyer-auth.guard'
import { AdminAuthGuard } from './guards/admin-auth.guard'
import { Response } from '../../pipes/response.pipe'
import { ErrorResponse } from '../../types/error-response'


@Resolver()
export class AuthResolver {

  constructor(private authService: AuthService) {
  }

  @Query(() => String)
  @UseGuards(BuyerAuthGuard)
  test() {
    return 'Ты авторизован'
  }

  @Query(() => String)
  @UseGuards(AdminAuthGuard)
  testAdmin() {
    return 'Ты авторизован'
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async register(@Args('user') newUser: RegisterInput) {
    await this.authService.register(newUser, 'buyer')
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async login(
    @Args('user') loginDto: LoginInput,
    @Session() session: Record<string, any>
  ) {
    return this.authService.login(loginDto, session, 'buyer')
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async registerAdmin(@Args('user') newUser: RegisterInput) {
    await this.authService.register(newUser, 'admin')
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async loginAdmin(
    @Args('user') loginDto: LoginInput,
    @Session() session: Record<string, any>
  ) {
    return this.authService.login(loginDto, session, 'admin')
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async logout(@Session() session, @Response() res: any) {
    return this.authService.logout(session, res)
  }

}
