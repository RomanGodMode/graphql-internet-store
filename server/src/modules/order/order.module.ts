import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderResolver } from './order.resolver'
import { OrderService } from './order.service'
import { Product } from '../products/entities/product.entity'
import { Category } from '../category/entities/category.entity'
import { User } from '../auth/modules/users/entities/user.entity'
import { CartService } from '../cart/cart.service'
import { Order } from './entities/order.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, User, Order])],
  providers: [OrderService, OrderResolver, CartService]
})
export class OrderModule {
}
