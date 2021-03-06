import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AddRootCategoryArgs } from './input/add-root-category.args'
import { CategoryService } from './category.service'
import { Category } from './entities/category.entity'
import { AddSubCategoryArgs } from './input/add-sub-categor.args'
import { DeleteCategoryArgs } from './input/delete-category.args'
import { GraphQLJSON } from 'graphql-type-json'
import { GetCategoryArgs } from './input/get-category.args'
import { EditCategoryInput } from './input/edit-category.input'
import { ProductInfoField } from './entities/additional-info-field'
import { DeepPartial } from 'typeorm'
import { UseGuards } from '@nestjs/common'
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard'
import { PaginatedCategoryObject } from './return-objects/paginated-category.object'


@Resolver(() => Category)
export class CategoryResolver {

  constructor(private categoryService: CategoryService) {
  }

  @Query(() => GraphQLJSON)
  async getEntireTree() {
    return await this.categoryService.getEntireTree()
  }

  @Query(() => PaginatedCategoryObject)
  async getCategory(@Args() { id, showOutOfStock, pageNumber, ordering, name, minPrice, maxPrice, infoValues }: GetCategoryArgs) {
    return this.categoryService.getCategory(id, true, showOutOfStock, pageNumber, ordering, name, minPrice, maxPrice, infoValues)
  }

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Category)
  async editCategory(
    @Args('input') input: EditCategoryInput,
    @Args('productInfoFields', { type: () => [ProductInfoField] }) productInfoFields: ProductInfoField[]
  ) {
    const payload: DeepPartial<Category> = {
      title: input.title,
      productInfoFields: productInfoFields
    }
    return this.categoryService.editCategory(input.id, payload)
  }

  // пощадите за нейминг....
  // ГОСПОДИ, я не нашёл как делать вложенные инпуты.. и теперь я буду делать так!
  // Поля просто не валидируются даже если добавить @NotEmpty() (как я понимаю из-за @Field({nullable: true}))

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Category)
  addRootCategory(@Args() { title }: AddRootCategoryArgs) {
    return this.categoryService.addRootCategory(title)
  }

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Category)
  addSubCategory(@Args() { title, parentId }: AddSubCategoryArgs) {
    return this.categoryService.addSubCategory(title, parentId)
  }

  @UseGuards(AdminAuthGuard)
  @Mutation(() => Boolean)
  deleteCategory(@Args() { id }: DeleteCategoryArgs) {
    return this.categoryService.deleteCategory(id)
  }

}
