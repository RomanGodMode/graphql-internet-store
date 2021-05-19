import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'abstract-auth-page',
  templateUrl: './abstract-auth-page.component.html',
  styleUrls: ['./abstract-auth-page.component.scss']
})
export class AbstractAuthPageComponent implements OnInit {

  @Input()
  isRegister: boolean

  error: string

  authForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    const authFormConfig: { [key: string]: any } = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(18)]]
    }
    if (this.isRegister) {
      authFormConfig.repeatPassword = ['', [Validators.required, Validators.minLength(7), Validators.maxLength(18)]]
    }

    this.authForm = this.formBuilder.group(authFormConfig)
  }

  onSubmit() {
    this.error = ''
    if (this.isRegister) {
      if (this.authForm.value.password === this.authForm.value.repeatPassword) {
        return console.log(this.authForm.value)
      }
      return this.error = 'Пароли не совпадают!'
    }

  }

}
