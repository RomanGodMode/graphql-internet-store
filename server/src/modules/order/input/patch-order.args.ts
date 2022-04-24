import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'
import { OrderStatus } from '../entities/order.entity'

@ArgsType()
export class PatchOrderArgs {
  @Field(() => Int)
  @IsNumber()
  id: number

  @Field(() => String)
  @IsString()
  status: OrderStatus
}
