import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'shop-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {

  categories = ['Питса', 'Печи для ног', 'Спино-соскабливалки', 'Пена для бритья']

  constructor() {
  }

  ngOnInit(): void {
  }

}
