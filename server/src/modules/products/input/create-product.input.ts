import { Field, InputType, Int } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'

@InputType()
export class CreateProductInput {

  @Field(() => Int)
  categoryId: number

  @Field()
  name: string

  @Field()
  price: number

  @Field(() => GraphQLJSON)
  infoValues: {}
}
