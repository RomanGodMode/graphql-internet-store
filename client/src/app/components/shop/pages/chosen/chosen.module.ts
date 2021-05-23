import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChosenComponent } from './chosen.component'
import { RouterModule } from '@angular/router'


@NgModule({
  declarations: [
    ChosenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ChosenComponent
    }])
  ]
})
export class ChosenModule {
}
