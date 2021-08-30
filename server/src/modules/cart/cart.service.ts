import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from '../products/entities/product.entity'
import { CartItem, User } from '../auth/modules/users/entities/user.entity'


@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {
  }

  async getCart(userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } })
    const items = await Promise.all(user.cart.items.map(async item => {
      const product = await this.productRepo.findOne({ where: { id: item.productId } })
      if (product) {
        return {
          count: item.count,
          product
        }
      }

      const idx = user.cart.items.indexOf(item)
      user.cart.items.splice(idx, 1)
      return null
    }))

    const filteredItems = items.filter(item => item)
    const resultItems = {}
    filteredItems.forEach(({ product, count }) => resultItems[product.id] = { product, count })

    return {
      items: resultItems,
      totalPrice: filteredItems.reduce((total, item) => {
        return total + item.product.price * item.count
      }, 0)
    }
  }

  async setCart(userId: number, newItems: CartItem[]) {
    const user = await this.userRepo.findOne({ where: { id: userId } })

    for (const { productId, count } of newItems) {
      const product = await this.productRepo.findOne({ where: { id: productId } })
      if (!product) {
        throw new NotFoundException('Товара с таким артикулом нет')
      }
      if (product.amount < count) {
        throw new BadRequestException('Такого кол-ва товара нет на складе')
      }
      if (count === 0) {
        const idx = user.cart.items.findIndex(item => item.productId === productId)
        if (idx !== -1) {
          user.cart.items.splice(idx, 1)
        }
        continue
      }

      const item = user.cart.items.find(item => item.productId === productId)
      if (item) {
        item.count = count
        continue
      }

      user.cart.items.push({ productId, count })
    }

    const updatedUser = await this.userRepo.save(user)
    return updatedUser.cart
  }

}
