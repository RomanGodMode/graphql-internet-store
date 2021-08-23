import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditProductListComponent } from './edit-product-list.component'
import { RouterModule } from '@angular/router'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'


@NgModule({
  declarations: [
    EditProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EditProductListComponent }]),
    SharedComponentsModule
  ]
})
export class EditProductListModule {
}
