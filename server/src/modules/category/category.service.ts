import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { DeepPartial, Repository } from 'typeorm'


@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>) {
  }

  async getEntireTree() {

    const addChildren = async (root: DeepPartial<Category>) => {
      root.children = await this.categoryRepo.find({ where: { parentId: root.id } })
      delete root.parentId
      delete root.additionalInfo
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
