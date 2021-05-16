import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/shop/shop.module').then(m => m.ShopModule)
  }
  //Здесь ещё будет Админ модуль, а внутри него роутинг по админке
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
