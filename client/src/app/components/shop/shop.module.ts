import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ShopLayoutComponent } from './layout/shop-layout/shop-layout.component'
import { RouterModule } from '@angular/router'
import { ShopHeaderComponent } from './layout/components/header/shop-header.component'
import { ShopFooterComponent } from './layout/components/footer/shop-footer.component'
import { PostHeaderComponent } from './layout/components/post-header/post-header.component'
import { SharedComponentsModule } from '../shared/shared-components.module'
import { BuyerLoginComponent } from './pages/buyer-login/buyer-login.component'
import { BuyerRegisterComponent } from './pages/buyer-register/buyer-register.component'


@NgModule({
  declarations: [
    ShopLayoutComponent,
    ShopHeaderComponent,
    ShopFooterComponent,
    PostHeaderComponent,
    BuyerLoginComponent,
    BuyerRegisterComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    RouterModule.forChild([{
      path: '', component: ShopLayoutComponent, children: [
        { path: '', redirectTo: 'home' },
        { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
        { path: 'catalog', loadChildren: () => import('./pages/catalog/catalog.module').then(m => m.CatalogModule) },
        { path: '**', redirectTo: 'home', pathMatch: 'full' }
      ]
    }])
  ]
})
export class ShopModule {
}
