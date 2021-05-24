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
              path: 'categories',
              loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
            },
            {
              path: 'products',
              loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
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
