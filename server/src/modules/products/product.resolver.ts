import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Product } from './entities/product.entity'
import { ProductService } from './product.service'
import { GetProductArgs } from './input/get-product.args'
import { createWriteStream } from 'fs'
import * as path from 'path'
import { FileUpload, GraphQLUpload } from 'graphql-upload'


@Resolver(() => Product)
export class ProductResolver {

  constructor(private productService: ProductService) {
  }

  @Query(() => Product)
  getProduct(@Args() { id }: GetProductArgs) {
    return this.productService.getProduct(id)
  }

  @Mutation(() => Boolean)
  async createProduct(
    @Args({ name: 'image', type: () => GraphQLUpload }) { createReadStream, filename }: FileUpload
  ) {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(path.resolve(__dirname, '..', '..', '..', 'uploads', filename), { autoClose: true }))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false))
    )
  }


  @Mutation((() => Product))
  patchProduct() {

  }

  @Mutation(() => Boolean)
  deleteProduct() {
  }

}
