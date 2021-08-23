import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { FileUpload } from 'graphql-upload'
import { FilesService } from '../files/files.service'
import { CreateProductInput } from './input/create-product.input'
import { ReplaceProductInput } from './input/replace-product.input'


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
    if (await this.productRepo.findOne({ where: { name: dto.name } })) {
      throw new ConflictException('Уже есть продукт с таким именем')
    }

    const image = await this.filesService.createFile(imageUpload)

    const { categoryId, ...meat } = dto
    const product = this.productRepo.create({ ...meat, image })
    product.category = <any> { id: categoryId }

    return this.productRepo.save(product)
  }

  async replaceProduct(id: number, imageUpload: FileUpload, dto: ReplaceProductInput) {
    const product = await this.getProduct(id)

    const image = await this.filesService.createFile(imageUpload)

    const merged = this.productRepo.merge(product, { ...dto, image })
    return this.productRepo.save(merged)
  }

  async deleteProduct(id: number) {
    const result = await this.productRepo.delete({ id })
    return !!result.affected
  }
}
