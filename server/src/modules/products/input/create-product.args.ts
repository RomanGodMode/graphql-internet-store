import { ArgsType, Field } from '@nestjs/graphql'
import { GraphQLUpload } from 'apollo-server-express'
import { Upload } from '../../../types/upload-file'

@ArgsType()
export class CreateProductArgs {

  @Field(() => GraphQLUpload)
  image: Upload

  // @Field()
  // name: string
  //
  // @Field()
  // price: number
  //
  // @Field(() => GraphQLJSON)
  // infoValues: {}
}
