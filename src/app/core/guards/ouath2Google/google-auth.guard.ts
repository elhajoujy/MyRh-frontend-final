import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class GoogleAuthGuard implements CanActivate {
  token!: string | null;


  constructor(
    private _router: Router,
  ) {
    this.token = localStorage.getItem('token');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.token) {
      return true;
    } else {
      this._router.navigateByUrl('/applicant/auth/login');
      return false;
    }
  }

}
