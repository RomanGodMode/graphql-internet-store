import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Product } from './entities/product.entity'
import { ProductService } from './product.service'
import { GetProductArgs } from './input/get-product.args'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { CreateProductInput } from './input/create-product.input'


@Resolver(() => Product)
export class ProductResolver {

  constructor(private productService: ProductService) {
  }

  @Query(() => Product)
  getProduct(@Args() { id }: GetProductArgs) {
    return this.productService.getProduct(id)
  }

  @Mutation(() => Product)
  async createProduct(
    @Args({ name: 'image', type: () => GraphQLUpload }) image: FileUpload,
    @Args('product') dto: CreateProductInput
  ) {
    return this.productService.createProduct(image, dto)
  }


  @Mutation((() => Product))
  replaceProduct(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'image', type: () => GraphQLUpload }) image: FileUpload,
    @Args('product') dto: CreateProductInput
  ) {
    return this.productService.replaceProduct(id, image, dto)
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args() { id }: GetProductArgs) {
    return this.productService.deleteProduct(id)
  }

}
