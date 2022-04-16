import { Module } from '@nestjs/common'
import { UsersModule } from '../auth/modules/users/users.module'
import { SeedingService } from './seeding/seeding.service'

@Module({
  imports: [
    UsersModule
  ],
  providers: [SeedingService]
})
export class SeedingModule {
}
