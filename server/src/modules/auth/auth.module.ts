import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from './modules/users/users.module'
import { AuthController } from './auth.controller'

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
