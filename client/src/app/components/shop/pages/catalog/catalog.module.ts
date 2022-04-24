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
import { ProductItemModule } from '../../shared/components/product-item/product-item.module'
import { SharedComponentsModule } from '../../../shared/shared-components.module'
import { AdditionalFieldFilterComponent } from './catalog-filters/additional-field-filter/additional-field-filter.component'
import { CheckboxModule } from '../../../cms/shared/components/checkbox/checkbox.module'
import { NumericModule } from '../../../cms/shared/components/numeric/numeric.module'


@NgModule({
  declarations: [CatalogComponent, CatalogFiltersComponent, ProductsListComponent, CatalogSorterComponent, AdditionalFieldFilterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CatalogComponent
    }]),
    PaginatorModule,
    PriceFilterFormModule,
    SelectModule,
    ReactiveFormsModule,
    ProductItemModule,
    SharedComponentsModule,
    CheckboxModule,
    NumericModule
  ]
})
export class CatalogModule {
}
