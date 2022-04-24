import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router'
import { AdminAuthService } from './admin-auth.service'
import { tap } from 'rxjs/operators'

@Injectable()
export class AdminAuthGuard implements CanActivate, CanLoad {
  constructor(private adminAuthService: AdminAuthService, private router: Router) {
  }

  noUntilAuth = this.adminAuthService.isAuth$.pipe(
    tap(isAuth => !isAuth && this.router.navigateByUrl('/admin/login'))
  )

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.noUntilAuth
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ) {
    return this.noUntilAuth
  }
}
