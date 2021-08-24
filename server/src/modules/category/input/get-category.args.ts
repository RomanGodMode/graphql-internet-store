import { IsInt, IsNumber, IsPositive } from 'class-validator'
import { ArgsType, Field, Float, Int } from '@nestjs/graphql'

@ArgsType()
export class GetCategoryArgs {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number

  @Field(() => Boolean, { nullable: true })
  showOutOfStock: boolean

  @Field(() => Int, { nullable: true })
  pageNumber: number

  @Field(() => String, { nullable: true })
  ordering: string

  @Field(() => String, { nullable: true })
  name: string

  @Field(() => Float, { nullable: true })
  minPrice: number

  @Field(() => Float, { nullable: true })
  maxPrice: number

}
