import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Product } from './entities/product.entity'
import { ProductService } from './product.service'
import { GetProductArgs } from './input/get-product.args'
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
    // @Args({ name: 'image', type: () => GraphQLUpload }) image: FileUpload
    @Args({ name: 'image', type: () => GraphQLUpload })
      image: FileUpload
  ) {// : Promise<FileUpload>
    console.log(42)
    // const { createReadStream, filename } = await image
    //
    // return new Promise((resolve, reject) => {
    //   createReadStream()
    //     .pipe(createWriteStream(__dirname, `/images/${filename}`))
    //     .on('finish', () => resolve(true))
    //     .on('error', () => reject(false))
    // })
  }

  //  TODO: загрузить кортинку
  //  TODO: и сохранять её с помощью гига сервиса

  // return new Promise((resolve, reject) => {
  //   image.createReadStream()
  //     .pipe(createWriteStream(__dirname, `/images/${image.filename}`))
  //     .on('finish', () => resolve(true))
  //     .on('error', () => reject(false))
  // })

  @Mutation((() => Product))
  patchProduct() {

  }

  @Mutation(() => Boolean)
  deleteProduct() {
  }

}
