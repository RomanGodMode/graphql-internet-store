import { Field, InputType, Int } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'
import { InfoValue } from '../entities/product.entity'

@InputType()
export class ReplaceProductInput {

  @Field()
  name: string

  @Field()
  price: number

  @Field(() => Int)
  amount: number

  @Field(() => GraphQLJSON)
  infoValues: InfoValue[]
}
