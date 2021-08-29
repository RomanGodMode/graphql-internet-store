import { Field, InputType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class CartItemInput {
  @Field()
  @IsNumber()
  productId: number

  @Field()
  @IsNumber()
  count: number
}
