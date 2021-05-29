import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesComponent } from './categories.component'
import { RouterModule } from '@angular/router'
import { SharedComponentsModule } from '../../../shared/shared-components.module'
import { CategoryTreeModule } from '../../shared/category/category-tree/category-tree.module'
import { CategoryServiceModule } from '../../shared/category/category-service/category-service.module'
import { EditCategoryTreePanelComponent } from './components/edit-category-tree-panel/edit-category-tree-panel.component'
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [
    CategoriesComponent,
    EditCategoryTreePanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CategoriesComponent }]),
    SharedComponentsModule,
    CategoryTreeModule,
    CategoryServiceModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule {
}
