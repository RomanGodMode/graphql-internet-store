import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChosenResolver } from './chosenResolver'
import { ChosenService } from './chosen.service'
import { Product } from '../products/entities/product.entity'
import { User } from '../auth/modules/users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  providers: [ChosenService, ChosenResolver]
})
export class ChosenModule {
}
