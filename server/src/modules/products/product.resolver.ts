import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Product } from './entities/product.entity'
import { ProductService } from './product.service'
import { GetProductArgs } from './input/get-product.args'
import { createWriteStream } from 'fs'
import { CreateProductArgs } from './input/create-product.args'
import { Upload } from '../../types/upload-file'
import * as path from 'path'


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
    @Args() { image }: CreateProductArgs
  ) {
    const { createReadStream, filename }: Upload = await (image as any)
    // TODO: Моск напряч
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(path.resolve(__dirname, '..', '..', '..', 'uploads', filename)))
        .on('finish', () => resolve(true))
        .on('error', err => {
          console.log(err)
          reject(false)
        })
    )
  }


  @Mutation((() => Product))
  patchProduct() {

  }

  @Mutation(() => Boolean)
  deleteProduct() {
  }

}
