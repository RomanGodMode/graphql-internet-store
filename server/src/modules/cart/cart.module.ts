import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartResolver } from './cart.resolver'
import { CartService } from './cart.service'
import { Product } from '../products/entities/product.entity'
import { Category } from '../category/entities/category.entity'
import { User } from '../auth/modules/users/entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, User])],
  providers: [CartService, CartResolver]
})
export class CartModule {
}
