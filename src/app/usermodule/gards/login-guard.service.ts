import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate  {

  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if  (window.sessionStorage.getItem('jwt'))  {
      return true;
      } else  {
        return false;
      }
  }
}
