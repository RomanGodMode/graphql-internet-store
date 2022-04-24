import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ModestAdminLayoutComponent } from './layout/modest-admin-layout/modest-admin-layout.component'
import { CmsHeaderComponent } from './layout/components/cms-header/cms-header.component'
import { SharedComponentsModule } from '../shared/shared-components.module'
import { AdminAuthModule } from './admin-auth/admin-auth.module'
import { AdminAuthGuard } from './admin-auth/admin-auth.guard'
import { BuyerNotificationModule } from '../shop/shared/components/buyer-notification/buyer-notification.module'


@NgModule({
  declarations: [
    CmsHeaderComponent,
    ModestAdminLayoutComponent
  ],
  imports: [
    CommonModule,
    AdminAuthModule,
    RouterModule.forChild([
        {
          path: '',
          component: ModestAdminLayoutComponent,
          children: [
            {
              path: 'categories/:id',
              loadChildren: () => import('./pages/edit-categories/edit-categories.module').then(m => m.EditCategoriesModule),
              canLoad: [AdminAuthGuard],
              canActivate: [AdminAuthGuard]
            },
            {
              path: 'categories',
              loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule),
              canLoad: [AdminAuthGuard],
              canActivate: [AdminAuthGuard]
            },
            {
              path: 'products/:categoryId/add-product',
              loadChildren: () => import('./pages/products/form-product-pages/add-product/add-product.module').then(m => m.AddProductModule),
              canLoad: [AdminAuthGuard],
              canActivate: [AdminAuthGuard]
            },
            {
              path: 'products/:categoryId/:productId',
              loadChildren: () => import('./pages/products/form-product-pages/edit-product/edit-product.module').then(m => m.EditProductModule),
              canLoad: [AdminAuthGuard],
              canActivate: [AdminAuthGuard]
            },
            {
              path: 'products/:categoryId',
              loadChildren: () => import('./pages/products/edit-product-list/edit-product-list.module').then(m => m.EditProductListModule),
              canLoad: [AdminAuthGuard],
              canActivate: [AdminAuthGuard]
            },
            {
              path: 'products',
              loadChildren: () => import('./pages/products/index/products.module').then(m => m.ProductsModule),
              canLoad: [AdminAuthGuard],
              canActivate: [AdminAuthGuard]
            },
            {
              path: 'orders',
              loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule),
              canLoad: [AdminAuthGuard],
              canActivate: [AdminAuthGuard]
            },
            {
              path: 'login',
              loadChildren: () => import('./pages/auth-pages/admin-login/admin-login.module').then(m => m.AdminLoginModule)
            },
            {
              path: 'register',
              loadChildren: () => import('./pages/auth-pages/admin-register/admin-register.module').then(m => m.AdminRegisterModule),
              canLoad: [AdminAuthGuard],
              canActivate: [AdminAuthGuard]
            },
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
          ]
        }
      ]
    ),
    SharedComponentsModule,
    BuyerNotificationModule
  ]
})
export class CmsModule {
}
