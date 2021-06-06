import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ModestAdminLayoutComponent } from './layout/modest-admin-layout/modest-admin-layout.component'
import { CmsHeaderComponent } from './layout/components/cms-header/cms-header.component'
import { SharedComponentsModule } from '../shared/shared-components.module'


@NgModule({
  declarations: [
    CmsHeaderComponent,
    ModestAdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
          path: '',
          component: ModestAdminLayoutComponent,
          children: [
            { path: '', redirectTo: 'login' },
            {
              path: 'categories/:id',
              loadChildren: () => import('./pages/edit-categories/edit-categories.module').then(m => m.EditCategoriesModule)
            },
            {
              path: 'categories',
              loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
            },
            {
              path: 'products/:categoryId/add-product',
              loadChildren: () => import('./pages/products/form-product-pages/add-product/add-product.module').then(m => m.AddProductModule)
            },
            {
              path: 'products/:categoryId/:productId',
              loadChildren: () => import('./pages/products/form-product-pages/edit-product/edit-product.module').then(m => m.EditProductModule)
            },
            {
              path: 'products/:categoryId',
              loadChildren: () => import('./pages/products/edit-product-list/edit-product-list.module').then(m => m.EditProductListModule)
            },
            {
              path: 'products',
              loadChildren: () => import('./pages/products/index/products.module').then(m => m.ProductsModule)
            },
            {
              path: 'login',
              loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
            },
            {
              path: 'register',
              loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
            }
          ]
        }
      ]
    ),
    SharedComponentsModule
  ]
})
export class CmsModule {
}
