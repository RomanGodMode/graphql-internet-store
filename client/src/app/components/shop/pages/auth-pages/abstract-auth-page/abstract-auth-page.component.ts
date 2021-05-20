import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Apollo, gql } from 'apollo-angular'
import { LoginGQL } from './mutations/login.mutation.mutation'
import { RegisterGQL } from './mutations/register.mutation'


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

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private loginGQL: LoginGQL,
    private registerGQL: RegisterGQL
  ) {
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

    this.apollo.watchQuery({
      query: gql`{
        test
      }`
    })
    .valueChanges.subscribe(
      data => console.log(data),
      err => console.log(JSON.parse(JSON.stringify(err)))
    )
  }

  onSubmit() {
    this.error = ''

    const email = this.authForm.value.email
    const password = this.authForm.value.password

    if (this.isRegister) {
      if (password !== this.authForm.value.repeatPassword) {
        return this.error = 'Пароли не совпадают!'
      }

      return this.registerGQL.mutate({ registerInput: { email, password } }).subscribe(
        data => console.log(data),
        err => this.error = err.message
      )

    }

    return this.loginGQL.mutate({ loginInput: { email, password } }).subscribe(
      data => console.log(data),
      err => this.error = err.message
    )

  }

}
