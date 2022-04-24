import { Injectable } from '@angular/core'
import { IsAuthGQL } from './query/is-auth.query'
import { ReplaySubject } from 'rxjs'
import { LoginGQL } from './mutations/login.mutation'
import { RegisterGQL } from './mutations/register.mutation'
import { map } from 'rxjs/operators'
import { LogoutGQL } from './mutations/logout.mutation'
import { Router } from '@angular/router'

@Injectable()
export class BuyerAuthService {

  isAuthSubject = new ReplaySubject<boolean>(1)
  isAuth$ = this.isAuthSubject.asObservable()

  constructor(
    private loginGQL: LoginGQL,
    private registerGQL: RegisterGQL,
    private isAuthGQL: IsAuthGQL,
    private logoutGQL: LogoutGQL,
    private router: Router
  ) {
    this.isAuth$.subscribe(console.log)
    isAuthGQL.watch({}, { errorPolicy: 'ignore' }).valueChanges
      .pipe(
        map(res => res.data ? !!res.data.test : false)
      )
      .subscribe(
        v => this.isAuthSubject.next(v),
        () => this.isAuthSubject.next(false)
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

  logout() {
    this.logoutGQL.mutate({}, {
      update: cache => {
        document.cookie.split(';').forEach(c => {
          document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
        })
        cache.writeQuery({ query: this.isAuthGQL.document, data: { test: '' } })
      }
    }).subscribe(() => this.router.navigateByUrl('/home'))
  }

}

