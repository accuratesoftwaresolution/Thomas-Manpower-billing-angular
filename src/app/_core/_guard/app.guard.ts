import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

/*
    Created By  : Arun Joy
    Created On  : 04-01-2020
    Created For : For handling the route path of the application.
                  For provding security i.e it blocks unautherized acess of rote paths.
*/

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate {

  constructor( 
    private router: Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const currentUser = localStorage.getItem("authtoken");
      console.log("===currentUser====",currentUser);
      if (!currentUser) {
          return true;
      }
      this.router.navigate(['/dashboard']);
      return false;

  }
}
