import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditProductListComponent } from './edit-product-list.component'
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [
    EditProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EditProductListComponent }])
  ]
})
export class EditProductListModule {
}
