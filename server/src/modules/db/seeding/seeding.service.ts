import { Injectable } from '@nestjs/common'
import { UsersService } from '../../auth/modules/users/users.service'

@Injectable()
export class SeedingService {
  constructor(private usersService: UsersService) {
  }

  async seed() {
    const email = process.env.DEFAULT_ADMIN_EMAIL
    const password = process.env.DEFAULT_ADMIN_PASSWORD

    if (await this.usersService.findUserByEmailAndRole(email, 'admin')) {
      console.log('БД УЖЕ была инициализирована!!!')
      return
    }

    await this.usersService.createUser({
      email,
      password
    }, 'admin')
  }
}
