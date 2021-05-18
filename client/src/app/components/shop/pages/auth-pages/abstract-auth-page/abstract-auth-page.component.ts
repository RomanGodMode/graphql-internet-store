import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'abstract-auth-page',
  templateUrl: './abstract-auth-page.component.html',
  styleUrls: ['./abstract-auth-page.component.scss']
})
export class AbstractAuthPageComponent implements OnInit {

  @Input()
  isRegister: boolean

  error: string


  constructor() {
  }

  ngOnInit(): void {
  }

}
