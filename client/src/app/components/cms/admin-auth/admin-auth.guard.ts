import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AdminAuthService } from './admin-auth.service'

@Injectable()
export class AdminAuthGuard implements CanActivate, CanLoad {
  constructor(private buyerAuthService: AdminAuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.buyerAuthService.isAuth$.subscribe(
      isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/admin/login').then()
        }
      }
    )
    return this.buyerAuthService.isAuth$
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.buyerAuthService.isAuth$.subscribe(
      isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/admin/login').then()
        }
      }
    )
    return this.buyerAuthService.isAuth$
  }
}
