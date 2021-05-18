import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'shop-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {

  categories = ['Питса', 'Кринж в пакетике', 'Спино-соскабливалки', 'Пена для бритья']

  constructor() {
  }

  ngOnInit(): void {
  }

}
