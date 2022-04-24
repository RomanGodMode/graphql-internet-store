import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Between, DeepPartial, In, LessThanOrEqual, Like, MoreThanOrEqual, Not, Repository } from 'typeorm'
import { InfoValue, Product } from '../products/entities/product.entity'

@Injectable()
export class CategoryService {

  async getMinMax(ids: number[]) {
    const query = this.productRepo.createQueryBuilder('product')
    query.select('MAX(product.price), MIN(product.price)')
    query.where('product.category IN (:...ids)', { ids })

    const { max, min } = await query.getRawOne()
    return { max: +max, min: +min }
  }

  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {
  }

  async addChildren(root: DeepPartial<Category>) {
    root.children = await this.categoryRepo.find({ where: { parentId: root.id } })
    delete root.parentId
    delete root.productInfoFields
    for (const r of root.children) {
      await this.addChildren(r)
    }
  }

  async getEntireTree() {
    const result: DeepPartial<Category>[] = await this.categoryRepo.find({ where: { parentId: null } })

    for (const root of result) {
      await this.addChildren(root)
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

  async getIdsFromSubcategory(category: Category) {
    await this.addChildren(category)
    const ids = [] as number[]
    const stack = [] as Category[]
    stack.push(category)
    while (stack.length) {
      const node = stack.pop()
      ids.push(node.id)
      node.children.forEach(child => stack.push(child))
    }

    return ids
  }

  async getCategory(
    id: number, withProducts = false, showOutOfStock = false,
    pageNumber: number = null, ordering: string = null, name: string = null,
    minPrice: number = null, maxPrice: number = null,
    infoValues: InfoValue[] = []
  ) {
    const category = withProducts
      ? await this.categoryRepo.findOne({ where: { id }, relations: ['products'] })
      : await this.categoryRepo.findOne({ where: { id } })

    if (!category) {
      throw new NotFoundException('Скорее всего эта категория удалена')
    }

    const categoryIds = await this.getIdsFromSubcategory({ ...category })

    const { max, min } = await this.getMinMax(categoryIds)

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

    const products = await this.productRepo.find(
      {
        where: {
          category: In(categoryIds),
          ...filterMutant
        },
        relations: ['category'],
        order
      }
    )

    const isMatchedFilter = (product: Product) => {
      const fieldsWithType = product.category.productInfoFields
        .map(field => ({
          ...field,
          productField: product.infoValues.find(productField => productField.name === field.name)
        }))
        .filter(({ productField }) => !!productField)
        .map(({ productField, ...field }) => {
          return {
            ...field,
            value: (productField as any).value
          }
        })

      return infoValues.every(filterInfo => {
        const currentField = fieldsWithType.find(productInfo => productInfo.name === filterInfo.name)

        if (!currentField) {
          throw new BadRequestException(`Нет такого доп поля ${product.name}`)
        }


        const typeMatch = {
          'num': () => currentField.value >= (filterInfo as any).minValue && currentField.value <= (filterInfo as any).maxValue,
          'string': () => currentField.value.toUpperCase().includes((filterInfo as any).value.toUpperCase()),
          'bool': () => currentField.value === (filterInfo as any).value,
          'enum': () => currentField.value === (filterInfo as any).value
        }

        return typeMatch[currentField.type]()
      })
    }

    category.products = products
      .filter(isMatchedFilter)
      .map(product => ({ ...product, category: product.category.id as any }))
      .slice(skip)
      .slice(0, take)


    return { category, productsCount: category.products.length, maxPrice: max, minPrice: min }
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
