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


@Resolver(() => Category)
export class CategoryResolver {

  constructor(private categoryService: CategoryService) {
  }

  @Query(() => GraphQLJSON)
  async getEntireTree() {
    return await this.categoryService.getEntireTree()
  }

  @Query(() => Category)
  async getCategory(@Args() { id }: GetCategoryArgs) {
    return this.categoryService.getCategory(id, true)
  }

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

  @Mutation(() => Category)
  addRootCategory(@Args() { title }: AddRootCategoryArgs) {
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
