import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayerDeactivateGuard implements CanDeactivate<any> {
  canDeactivate(component: any,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if(component.isSaved) {
      return component.isSaved
      }
      else  {
        let confirm = window.confirm("All The Unsaved Changes Will be Lost");
        return confirm;
      }



}
  }

