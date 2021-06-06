import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductsComponent } from './products.component'
import { RouterModule } from '@angular/router'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'
import { CategoryTreeModule } from '../../../shared/category/category-tree/category-tree.module'
import { CategoryServiceModule } from '../../../shared/category/category-service/category-service.module'


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ProductsComponent
    }]),
    SharedComponentsModule,
    CategoryTreeModule,
    CategoryServiceModule
  ]
})
export class ProductsModule {
}
