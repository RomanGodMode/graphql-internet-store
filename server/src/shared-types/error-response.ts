import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ErrorExtensions {
  @Field(() => Int)
  code: number
}

@ObjectType()
export class ErrorResponse {
  @Field()
  message: string

  @Field(() => ErrorExtensions)
  extensions: ErrorExtensions
}
