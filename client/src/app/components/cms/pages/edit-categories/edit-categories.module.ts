import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditCategoriesComponent } from './edit-categories.component'
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [
    EditCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: EditCategoriesComponent }])
  ]
})
export class EditCategoriesModule {
}
