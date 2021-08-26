import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, UserRole } from './entities/user.entity'
import { RegisterInput } from '../../input/register.input'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {
  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findUserByEmailAndRole(email: string, role: UserRole): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email, role } })
  }

  getUserById(id: number): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async createUser(newUser: RegisterInput, role: UserRole): Promise<User> {
    if (
      await this.usersRepository.findOne({ where: { email: newUser.email } })
    ) {
      throw new ConflictException('Пользователь с таким email уже существует')
    }

    return this.usersRepository.save(
      this.usersRepository.create({ ...newUser, role })
    )
  }
}
