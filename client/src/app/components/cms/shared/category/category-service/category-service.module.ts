import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoryService } from './category.service'
import { EntireCategoryTreeGQL } from './quyery/entire-tree.query'
import { AddSubCategoryGQL } from './mutations/add-sub-category.mutation'
import { DeleteCategoryGQL } from './mutations/delete-category.mutation'
import { AddRootCategoryGQL } from './mutations/add-root-category.mutation'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [CategoryService, EntireCategoryTreeGQL, AddSubCategoryGQL, AddRootCategoryGQL, DeleteCategoryGQL]
})
export class CategoryServiceModule {
}
