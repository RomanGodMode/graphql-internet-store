import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'abstract-shop-layout',
  templateUrl: './abstract-shop-layout.component.html',
  styleUrls: ['./abstract-shop-layout.component.scss']
})
export class AbstractShopLayoutComponent implements OnInit {

  constructor() {
  }

  @Input() full: boolean

  ngOnInit(): void {
  }

}
