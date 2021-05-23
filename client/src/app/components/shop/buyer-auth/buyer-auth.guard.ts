import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { BuyerAuthService } from './buyer-auth.service'

@Injectable()
export class BuyerAuthGuard implements CanActivate, CanLoad {
  constructor(private buyerAuthService: BuyerAuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.buyerAuthService.isAuth$.subscribe(
      isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/login').then()
        }

      },
      () => this.router.navigateByUrl('/login')
    )
    return this.buyerAuthService.isAuth$
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.buyerAuthService.isAuth$.subscribe(
      isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/login').then()
        }
      },
      () => this.router.navigateByUrl('/login')
    )
    return this.buyerAuthService.isAuth$
  }
}
