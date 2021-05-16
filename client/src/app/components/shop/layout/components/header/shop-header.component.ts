import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'shop-header',
  templateUrl: './shop-header.component.html',
  styleUrls: ['./shop-header.component.scss']
})
export class ShopHeaderComponent implements OnInit {

  isAuthorized: boolean = true

  constructor() {
  }

  ngOnInit(): void {
  }

}
