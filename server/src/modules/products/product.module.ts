import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductResolver } from './product.resolver'
import { ProductService } from './product.service'
import { Product } from './entities/product.entity'
import { Upload } from './trash/upload.scalar'

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, ProductResolver, Upload]
})
export class ProductModule {
}
