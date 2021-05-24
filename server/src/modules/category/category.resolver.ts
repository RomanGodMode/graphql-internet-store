import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AddRootCategoryArgs } from './input/add-root-category.args'
import { CategoryService } from './category.service'
import { Category } from './entities/category.entity'
import { AddSubCategoryArgs } from './input/add-sub-categor.args'
import { DeleteCategoryArgs } from './input/delete-category.args'
import { GraphQLJSON } from 'graphql-type-json'


@Resolver(() => Category)
export class CategoryResolver {

  constructor(private categoryService: CategoryService) {
  }

  @Query(() => GraphQLJSON)
  async getEntireTree() {
    return await this.categoryService.getEntireTree()
  }

  @Mutation(() => Category)
  addRootCategory(@Args() args: AddRootCategoryArgs) {
    const { title } = args
    return this.categoryService.addRootCategory(title)
  }

  @Mutation(() => Category)
  addSubCategory(@Args() { title, parentId }: AddSubCategoryArgs) {
    return this.categoryService.addSubCategory(title, parentId)
  }

  @Mutation(() => Boolean)
  deleteCategory(@Args() { id }: DeleteCategoryArgs) {
    return this.categoryService.deleteCategory(id)
  }

}
