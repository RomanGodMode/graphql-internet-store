import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'
import { ProductInfoField } from '../entities/additional-info-field'

@ObjectType()
export class MarginalProduct {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  price: number

  @Field()
  image: string

  @Field(() => Int)
  amount: number

  @Field(() => GraphQLJSON)
  infoValues: {}

  @Field(() => Int)
  category: number
}

@ObjectType()
class MarginalCategory {
  @Field(() => Int)
  id: number

  @Field()
  title: string

  @Field(() => Int, { nullable: true })
  parentId: number

  @Field(() => [MarginalCategory])
  children: MarginalCategory[]

  @Field(() => GraphQLJSON)
  productInfoFields: ProductInfoField[]

  @Field(() => [MarginalProduct])
  products: MarginalProduct[]
}

@ObjectType()
export class PaginatedCategoryObject {
  @Field(() => MarginalCategory)
  category: MarginalCategory

  @Field(() => Int)
  productsCount: number

  @Field(() => Float)
  maxPrice: number

  @Field(() => Float)
  minPrice: number

}


