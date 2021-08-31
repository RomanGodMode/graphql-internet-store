import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from '../products/entities/product.entity'
import { User } from '../auth/modules/users/entities/user.entity'


@Injectable()
export class ChosenService {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {
  }

  async getChosenProducts(userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } })
    const items = await Promise.all(user.chosenProducts.map(async id => {
      const product = await this.productRepo.findOne({ where: { id }, loadRelationIds: true })
      if (product) {
        return product
      }

      const idx = user.chosenProducts.indexOf(id)
      user.cart.items.splice(idx, 1)
      return null
    }))

    const filteredItems = items.filter(item => item)
    const resultItems = {}
    filteredItems.forEach(product => resultItems[product.id] = product)

    return resultItems
  }

  async setChosenProducts(userId: number, ids: number[], isDelete: boolean) {
    const user = await this.userRepo.findOne({ where: { id: userId } })

    for (const id of ids) {
      const product = await this.productRepo.findOne({ where: { id } })
      if (!product) {
        throw new NotFoundException('Товара с таким артикулом нет')
      }
      if (product.amount <= 0) {
        throw new BadRequestException('Такого кол-ва товара нет на складе')
      }

      const idx = user.chosenProducts.indexOf(id)
      if (isDelete) {
        if (idx !== -1) {
          user.chosenProducts.splice(idx, 1)
        }
      } else if (idx === -1) {
        user.chosenProducts.push(id)
      }
    }

    const updatedUser = await this.userRepo.save(user)
    return updatedUser.chosenProducts
  }

}
