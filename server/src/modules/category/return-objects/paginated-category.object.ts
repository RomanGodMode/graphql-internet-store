import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Category } from '../entities/category.entity'

@ObjectType()
export class PaginatedCategoryObject {
  @Field(() => Category)
  category: Category

  @Field(() => Int)
  productsCount: number
}
