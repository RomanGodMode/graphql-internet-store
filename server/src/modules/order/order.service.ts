import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from '../products/entities/product.entity'
import { User } from '../auth/modules/users/entities/user.entity'
import { Order } from './entities/order.entity'
import { CartService } from '../cart/cart.service'


@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private cartService: CartService
  ) {
  }

  async myOrders(userId: number) {

    return this.orderRepo.find({
      where: {
        userId
      }
    })
  }

  async pushOrder(userId: number) {
    const cart = await this.cartService.getCart(userId)
    const partialOrder = this.orderRepo.create({ userId, cart })
    const result = await this.orderRepo.save(partialOrder)
    await this.cartService.clearCart(userId)

    return result
  }

}
