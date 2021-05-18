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
          }
        ]
      },
      {
        path: '', component: FullShopLayoutComponent, children: [
          { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
          { path: 'catalog', loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule) }
        ]
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ])
  ]
})
export class ShopModule {
}
