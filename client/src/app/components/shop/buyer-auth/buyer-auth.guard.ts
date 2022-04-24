import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { BuyerAuthService } from './buyer-auth.service'
import { tap } from 'rxjs/operators'

@Injectable()
export class BuyerAuthGuard implements CanActivate, CanLoad {
  constructor(private buyerAuthService: BuyerAuthService, private router: Router) {
  }

  noUntilAuth = this.buyerAuthService.isAuth$.pipe(
    tap(isAuth => !isAuth && this.router.navigateByUrl('/login'))
  )

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.noUntilAuth
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.noUntilAuth
  }
}
