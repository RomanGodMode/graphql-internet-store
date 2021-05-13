import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from './modules/users/users.service'
import { RegisterInput } from './input/register.input'
import { LoginInput } from './input/login.input'
import { Response } from 'express'
import { Session } from 'express-session'
import { UserRole } from './modules/users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
  }

  async register(newUser: RegisterInput, role: UserRole) {
    await this.usersService.createUser(newUser, role)
  }

  async login(
    loginDto: LoginInput,
    session: Record<string, any>,
    role: UserRole
  ) {
    const user = await this.usersService.findUserByEmailAndRole(
      loginDto.email,
      role,
    )

    if (!user) {
      throw new UnauthorizedException('no such email')
    }

    const passwordsMatch = await user.comparePassword(loginDto.password)

    if (!passwordsMatch) {
      throw new UnauthorizedException('wrong combination of email and password')
    }

    session.userId = user.id
    session.role = role
  }

  async logout(session: Session, res: Response) {
    session.destroy((err) => err && console.log(err))
    await res.clearCookie(process.env.SESSION_NAME)
  }
}
