import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CatalogComponent } from './catalog.component'
import { RouterModule } from '@angular/router'
import { ProductItemModule } from '../../shared/components/product-item/product-item.module'
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component'


@NgModule({
  declarations: [CatalogComponent, CatalogFiltersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CatalogComponent
    }]),
    ProductItemModule
  ]
})
export class CatalogModule {
}
