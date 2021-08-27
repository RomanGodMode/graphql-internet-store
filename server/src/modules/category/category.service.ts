import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Between, DeepPartial, LessThanOrEqual, Like, MoreThanOrEqual, Not, Repository } from 'typeorm'
import { Product } from '../products/entities/product.entity'


@Injectable()
export class CategoryService {

  async getMinMax(id: number) {
    const query = this.productRepo.createQueryBuilder('product')
    query.select('MAX(product.price), MIN(product.price)')
    query.where('product.category = :id', { id })
    const { max, min } = await query.getRawOne()
    return { max: +max, min: +min }
  }

  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {
  }

  async getEntireTree() {

    const addChildren = async (root: DeepPartial<Category>) => {
      root.children = await this.categoryRepo.find({ where: { parentId: root.id } })
      delete root.parentId
      delete root.productInfoFields
      for (const r of root.children) {
        await addChildren(r)
      }
    }

    const result: DeepPartial<Category>[] = await this.categoryRepo.find({ where: { parentId: null } })

    for (const root of result) {
      await addChildren(root)
    }

    return result
  }

  async getModestCategory(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } })

    if (!category) {
      throw new NotFoundException('Скорее всего эта категория удалена')
    }

    return category
  }

  async getCategory(
    id: number, withProducts = false, showOutOfStock = false,
    pageNumber: number = null, ordering: string = null, name: string = null, minPrice: number = null, maxPrice: number = null
  ) {

    const category = withProducts
      ? await this.categoryRepo.findOne({ where: { id }, relations: ['products'] })
      : await this.categoryRepo.findOne({ where: { id } })

    if (!category) {
      throw new NotFoundException('Скорее всего эта категория удалена')
    }

    const { max, min } = await this.getMinMax(id)

    pageNumber = pageNumber || 1
    const take = 6
    const skip = take * (pageNumber - 1)

    const filterMutant = {} as any

    if (!showOutOfStock) {
      filterMutant.amount = Not(0)
    }

    if (name) {
      filterMutant.name = Like('%' + name + '%')
    }

    const hasMinPrice = minPrice || minPrice === 0

    if (hasMinPrice && maxPrice) {
      filterMutant.price = Between(minPrice, maxPrice)
    } else {
      if (hasMinPrice) {
        filterMutant.price = MoreThanOrEqual(minPrice)
      }

      if (maxPrice) {
        filterMutant.price = LessThanOrEqual(maxPrice)
      }
    }


    const order = {} as any
    const gigaSwitch = {
      'name': () => order.name = 'ASC',
      '-name': () => order.name = 'DESC',
      'price': () => order.price = 'ASC',
      '-price': () => order.price = 'DESC'
    }
    if (ordering) {
      gigaSwitch[ordering]()
    }

    const [result, productsCount] = await this.productRepo.findAndCount(
      {
        where: {
          category: category.id,
          ...filterMutant
        },
        order,
        take,
        skip
      }
    )

    category.products = result
    return { category, productsCount, maxPrice: max, minPrice: min }
  }

  async editCategory(id: number, payload: DeepPartial<Category>) {
    const category = await this.getModestCategory(id)
    const merged = this.categoryRepo.merge(category, payload)
    return this.categoryRepo.save(merged)
  }

  async addRootCategory(title: string) {
    if (await this.categoryRepo.findOne({ where: { title } })) {
      throw new ConflictException('Уже есть категория с таким именем')
    }
    const category = this.categoryRepo.create({ title })
    return this.categoryRepo.save(category)
  }

  async addSubCategory(title: string, parentId: number) {
    if (await this.categoryRepo.findOne({ where: { title } })) {
      throw new ConflictException('Уже есть категория с таким именем')
    }
    const parent = await this.categoryRepo.findOne({ where: { id: parentId } })
    if (!parent) {
      throw new BadRequestException('Родительской категории нет')
    }
    const category = this.categoryRepo.create({ title, parent })
    return this.categoryRepo.save(category)
  }

  async deleteCategory(id: number) {
    const result = await this.categoryRepo.delete({ id })
    return !!result.affected
  }

}
