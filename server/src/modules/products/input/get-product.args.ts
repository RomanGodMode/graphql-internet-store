import { IsInt, IsNumber, IsPositive } from 'class-validator'
import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export class GetProductArgs {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number
}
