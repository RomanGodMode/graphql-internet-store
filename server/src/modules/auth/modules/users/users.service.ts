import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserRole, User } from './entities/user.entity'
import { RegisterDto } from '../../dto/register.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findUserByEmailAndRole(email: string, role: UserRole): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email, role } })
  }

  getUserById(id: number): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async createUser(newUser: RegisterDto, role: UserRole): Promise<User> {
    if (
      await this.usersRepository.findOne({ where: { email: newUser.email } })
    ) {
      throw new ConflictException('user with so email already exist')
    }
    console.log(role)

    return this.usersRepository.save(
      this.usersRepository.create({ ...newUser, role }),
    )
  }
}
