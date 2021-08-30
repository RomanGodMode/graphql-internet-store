import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { BuyerAuthService } from './buyer-auth.service'
import { skipWhile } from 'rxjs/operators'

@Injectable()
export class BuyerAuthGuard implements CanActivate, CanLoad {
  constructor(private buyerAuthService: BuyerAuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.buyerAuthService.isAuth$.pipe(
      skipWhile(isAuth => isAuth === false)
    )
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.buyerAuthService.isAuth$.pipe(
      skipWhile(isAuth => isAuth === false)
    )
  }
}
