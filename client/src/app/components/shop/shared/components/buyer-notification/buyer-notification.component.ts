import { Component, OnInit } from '@angular/core'
import { MessagesService } from './messages.service'

import { animate, query, stagger, style, transition, trigger } from '@angular/animations'

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true }
    )
  ])
])

@Component({
  selector: 'app-buyer-notification',
  templateUrl: './buyer-notification.component.html',
  styleUrls: ['./buyer-notification.component.scss'],
  animations: [listAnimation]
})
export class BuyerNotificationComponent implements OnInit {


  constructor(
    public buyerNotificationService: MessagesService
  ) {
  }

  ngOnInit(): void {
  }
}
