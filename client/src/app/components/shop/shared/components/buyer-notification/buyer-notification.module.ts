import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BuyerNotificationComponent } from './buyer-notification.component'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'


@NgModule({
  declarations: [
    BuyerNotificationComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ],
  exports: [
    BuyerNotificationComponent
  ]
})
export class BuyerNotificationModule {
}
