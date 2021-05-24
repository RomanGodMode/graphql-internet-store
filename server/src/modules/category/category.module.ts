import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryResolver } from './category.resolver'
import { Category } from './entities/category.entity'
import { CategoryService } from './category.service'

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryResolver]
})
export class CategoryModule {
}
