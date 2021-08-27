import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CatalogComponent } from './catalog.component'
import { RouterModule } from '@angular/router'
import { CatalogFiltersComponent } from './catalog-filters/catalog-filters.component'
import { ProductsListComponent } from './products-list/products-list.component'
import { CatalogSorterComponent } from './catalog-sorter/catalog-sorter.component'
import { PaginatorModule } from '../../shared/components/paginator/paginator.module'
import { PriceFilterFormModule } from '../../shared/components/price-filter-form/price-filter-form.module'
import { SelectModule } from '../../../cms/shared/components/select/select.module'
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  declarations: [CatalogComponent, CatalogFiltersComponent, ProductsListComponent, CatalogSorterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CatalogComponent
    }]),
    PaginatorModule,
    PriceFilterFormModule,
    SelectModule,
    ReactiveFormsModule
  ]
})
export class CatalogModule {
}
