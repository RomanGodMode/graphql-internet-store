import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AbstractShopLayoutComponent } from './layout/shop-layout/abstract-shop-layout/abstract-shop-layout.component'
import { RouterModule } from '@angular/router'
import { ShopHeaderComponent } from './layout/components/root/header/shop-header.component'
import { ShopFooterComponent } from './layout/components/root/footer/shop-footer.component'
import { PostHeaderComponent } from './layout/components/root/post-header/post-header.component'
import { SharedComponentsModule } from '../shared/shared-components.module'
import { PartialShopLayoutComponent } from './layout/shop-layout/partial-shop-layout/partial-shop-layout.component'
import { FullShopLayoutComponent } from './layout/shop-layout/full-shop-layout/full-shop-layout.component'
import { CellphoneNumberLinkComponent } from './layout/components/cellphone-number-link/cellphone-number-link.component'
import { BuyerAuthModule } from './buyer-auth/buyer-auth.module'
import { BuyerAuthGuard } from './buyer-auth/buyer-auth.guard'
import { ProductItemModule } from './shared/components/product-item/product-item.module'
import { BuyerNotificationModule } from './shared/components/buyer-notification/buyer-notification.module'
import { CartModule } from './shared/components/cart/cart.module'


@NgModule({
  declarations: [
    AbstractShopLayoutComponent,
    ShopHeaderComponent,
    ShopFooterComponent,
    PostHeaderComponent,
    PartialShopLayoutComponent,
    FullShopLayoutComponent,
    CellphoneNumberLinkComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    BuyerNotificationModule,
    BuyerAuthModule,
    CartModule,
    ProductItemModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: '',
        component: PartialShopLayoutComponent,
        children: [
          { path: 'login', loadChildren: () => import('./pages/auth-pages/buyer-login/buyer-login.module').then(m => m.BuyerLoginModule) },
          {
            path: 'register',
            loadChildren: () => import('./pages/auth-pages/buyer-register/buyer-register.module').then(m => m.BuyerRegisterModule)
          },
          {
            path: 'cart',
            loadChildren: () => import('./pages/cart/cart-page.module').then(m => m.CartPageModule),
            canLoad: [BuyerAuthGuard],
            canActivate: [BuyerAuthGuard]
          },
          {
            path: 'chosen',
            loadChildren: () => import('./pages/chosen/chosen.module').then(m => m.ChosenModule),
            canLoad: [BuyerAuthGuard],
            canActivate: [BuyerAuthGuard]
          }
        ]
      },
      {
        path: '', component: FullShopLayoutComponent, children: [
          { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
          {
            path: 'categories/:categoryId',
            loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
          },
          { path: 'catalog/:categoryId', loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule) },
          { path: 'catalog', redirectTo: 'categories/0' },
          {
            path: 'products/:categoryId/:productId',
            loadChildren: () => import('./pages/certain-product/certain-product.module').then(m => m.CertainProductModule)
          }
        ]
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ]
})
export class ShopModule {
}
