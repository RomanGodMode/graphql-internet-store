import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BuyerNotificationComponent } from './buyer-notification.component'
import { SharedComponentsModule } from '../../../../shared/shared-components.module'
import { MessagesService } from './messages.service'


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
  ],
  providers: [MessagesService]
})
export class BuyerNotificationModule {
}
