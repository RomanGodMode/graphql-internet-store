import { Component, OnInit } from '@angular/core'
import { OrderService } from '../../shared/components/order/order.service'

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.fetchMyOrders()
  }

}


