import { IsEmail, IsString, Length } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @Length(7, 18)
  password: string
}
