import { IsString, Length } from 'class-validator'
import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class AddRootCategoryArgs {
  @Field()
  @IsString()
  @Length(2, 20)
  title: string
}
