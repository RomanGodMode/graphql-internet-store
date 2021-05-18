import { Component, Input, OnInit } from '@angular/core'
import { ShowPasswordService } from './show-password.service'

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {

  @Input()
  placeholder: string
  @Input()
  name: string


  constructor(public showPasswordService: ShowPasswordService) {
  }

  ngOnInit(): void {
  }

}
