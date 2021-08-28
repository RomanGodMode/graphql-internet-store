import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CertainProductComponent } from './certain-product.component'
import { RouterModule } from '@angular/router'
import { ToCartButtonModule } from '../../shared/components/to-cart-button/to-cart-button.module'
import { SharedComponentsModule } from '../../../shared/shared-components.module'


@NgModule({
  declarations: [
    CertainProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: CertainProductComponent
    }]),
    ToCartButtonModule,
    SharedComponentsModule
  ]
})
export class CertainProductModule {
}
