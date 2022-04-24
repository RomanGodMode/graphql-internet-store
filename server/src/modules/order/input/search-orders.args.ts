import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { OrderStatus } from '../entities/order.entity'

@ArgsType()
export class SearchOrdersArgs {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  id: number

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  status: OrderStatus
}
