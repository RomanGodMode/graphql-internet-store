import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { FileUpload } from 'graphql-upload'
import { FilesService } from '../files/files.service'
import { CreateProductInput } from './input/create-product.input'


@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private filesService: FilesService
  ) {
  }

  async getProduct(id: number) {
    const product = await this.productRepo.findOne({ where: { id } })
    if (!product) {
      throw new NotFoundException('Скорее всего этот продукт удален')
    }
    return product
  }


  async createProduct(imageUpload: FileUpload, dto: CreateProductInput) {
    const image = await this.filesService.createFile(imageUpload)

    const { categoryId, ...meat } = dto
    const product = this.productRepo.create({ ...meat, image })
    product.category = <any> { id: categoryId }

    return this.productRepo.save(product)
  }
}
