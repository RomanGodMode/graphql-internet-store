import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SetChosenProducts } from './mutation/set-chosen-products.mutation'
import { GetChosenProducts } from './query/get-chosen-products.query'
import { ChosenService } from './chosen.service'
import { ToChosenComponent } from './to-chosen/to-chosen.component'


@NgModule({
  declarations: [
    ToChosenComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToChosenComponent
  ],
  providers: [ChosenService, SetChosenProducts, GetChosenProducts]
})
export class ChosenModule {
}
