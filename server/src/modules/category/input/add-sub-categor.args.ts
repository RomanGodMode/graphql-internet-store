import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsNumber, IsString, Length } from 'class-validator'

@ArgsType()
export class AddSubCategoryArgs {
  @Field()
  @IsString()
  @Length(2, 20)
  title: string

  @Field(() => Int)
  @IsNumber()
  parentId: number
}
