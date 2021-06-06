import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditProductComponent } from './edit-product.component'
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: EditProductComponent
    }])
  ]
})
export class EditProductModule {
}
