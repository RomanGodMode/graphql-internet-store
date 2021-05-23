import { Injectable } from '@angular/core'
import { IsAuthGQL } from './query/is-auth.query'
import { Observable } from 'rxjs'
import { Apollo } from 'apollo-angular'
import { LoginGQL } from './mutations/login.mutation.mutation'
import { RegisterGQL } from './mutations/register.mutation'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class BuyerAuthService {

  isAuth$: Observable<boolean>

  constructor(
    private apollo: Apollo,
    private loginGQL: LoginGQL,
    private registerGQL: RegisterGQL,
    private isAuthGQL: IsAuthGQL
  ) {
    this.isAuth$ = isAuthGQL.watch().valueChanges
      .pipe(
        catchError(() => isAuthGQL.watch().valueChanges),
        map(s => !!s)
      )
  }

  login(email: string, password: string) {

    return this.loginGQL.mutate({
      loginInput: {
        email,
        password
      }
    }, {
      update: cache => cache.writeQuery({ query: this.isAuthGQL.document, data: { test: 'Бяк бяк!' } })
    })
  }

  register(email: string, password: string) {
    return this.registerGQL.mutate({
      registerInput: {
        email,
        password
      }
    })
  }

}
