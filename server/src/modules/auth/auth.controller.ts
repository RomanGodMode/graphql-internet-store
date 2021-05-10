import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { BuyerAuthGuard } from './guards/buyer-auth.guard'
import { Response } from 'express'
import { AdminAuthGuard } from './guards/admin-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(BuyerAuthGuard)
  test() {
    return 'Ты авторизован'
  }

  @Get('admin')
  @UseGuards(AdminAuthGuard)
  testAdmin() {
    return 'Ты авторизован'
  }

  @Post('register')
  async register(@Body() newUser: RegisterDto) {
    await this.authService.register(newUser, 'buyer')
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    return this.authService.login(loginDto, session, 'buyer')
  }

  @Post('register-admin')
  async registerAdmin(@Body() newUser: RegisterDto) {
    await this.authService.register(newUser, 'admin')
  }

  @Post('login-admin')
  async loginAdmin(
    @Body() loginDto: LoginDto,
    @Session() session: Record<string, any>,
  ) {
    return this.authService.login(loginDto, session, 'admin')
  }

  @Delete('logout')
  async logout(@Session() session, @Res() res: Response) {
    await this.authService.logout(session, res)
    res.send()
  }
}
