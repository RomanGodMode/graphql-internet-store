import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from '../products/entities/product.entity'
import { User } from '../auth/modules/users/entities/user.entity'
import { Order, OrderStatus } from './entities/order.entity'
import { CartService } from '../cart/cart.service'
import { SearchOrdersArgs } from './input/search-orders.args'

const withoutEmptyKeys = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => !!value)
  )


@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private cartService: CartService
  ) {
  }

  async searchOrders({ status, id }: SearchOrdersArgs) {
    return this.orderRepo.find({
      where: withoutEmptyKeys({
        id,
        status
      }),
      order: { orderingDate: 'DESC' },
      take: 10
    })
  }

  async getOrders(userId: number) {
    return this.orderRepo.find({
      where: {
        userId
      }
    })
  }

  async patchOrder(id: number, status: OrderStatus) {
    const order = await this.orderRepo.findOne({ id })
    if (!order) {
      throw new NotFoundException('Нет такого заказа')
    }
    return this.orderRepo.save({
      id,
      status
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
