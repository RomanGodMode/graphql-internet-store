import { Component, Input, OnInit } from '@angular/core'
import { MessagesService } from '../../../shared/components/buyer-notification/messages.service'

@Component({
  selector: 'abstract-shop-layout',
  templateUrl: './abstract-shop-layout.component.html',
  styleUrls: ['./abstract-shop-layout.component.scss'],
  providers: [MessagesService]
})
export class AbstractShopLayoutComponent implements OnInit {

  constructor() {
  }

  @Input() full: boolean

  ngOnInit(): void {
  }

}
