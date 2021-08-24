import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryResolver } from './category.resolver'
import { Category } from './entities/category.entity'
import { CategoryService } from './category.service'
import { Product } from '../products/entities/product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category]), TypeOrmModule.forFeature([Product])],
  providers: [CategoryService, CategoryResolver]
})
export class CategoryModule {
}
