import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'


@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {
  }

  async getProduct(id: number) {
    const product = await this.productRepo.findOne({ where: { id } })
    if (!product) {
      throw new NotFoundException('Скорее всего этот продукт удален')
    }
    return product
  }


  async createProduct() {

  }
}
