import { IsInt, IsNumber, IsPositive, IsString, Length } from 'class-validator'
import { Field, InputType, Int } from '@nestjs/graphql'


@InputType()
export class EditCategoryInput {
  @Field(() => Int)
  @IsNumber()
  @IsInt()
  @IsPositive()
  id: number

  @Field()
  @IsString()
  @Length(2, 20)
  title: string

}

