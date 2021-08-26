import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesComponent } from './categories.component'
import { RouterModule } from '@angular/router'
import { SharedComponentsModule } from '../../../shared/shared-components.module'
import { CategoryTreeComponent } from './category-tree/category-tree.component'
import { CategoryNodeComponent } from './category-tree/category-node/category-node.component'


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryTreeComponent,
    CategoryNodeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CategoriesComponent
    }]),
    SharedComponentsModule
  ]
})
export class CategoriesModule {
}
