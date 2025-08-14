import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { routePath } from 'src/app/_providers/_resources/route-path.properties';
import { CryptoService } from '../_security/crypto.service';

/*
    Created By  : Arun Joy
    Created On  : 04-01-2020
    Created For : For handling the route path of the application.
                  For provding security i.e it blocks unautherized acess of rote paths.
*/

@Injectable({
  providedIn: 'root'
})
export class AuthStudentGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    // private lan: LangaugeTranslateService,
    private crypto: CryptoService
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>
  // | Observable<boolean> | boolean
  {
    const currentUser = localStorage.getItem("authtoken");
    const secuLevel = localStorage.getItem("seculevel");
    console.log("==sec level===", secuLevel);

    if (currentUser && secuLevel.toString() == "2") {
      // await this.lan.init();
      return true;
    }

    let authKey = localStorage.getItem("authKey");
    //Ayth key null check Added
    if (authKey)
      authKey = this.crypto.decrypt(authKey);
    let url = '';
    if (authKey)
      url = `${authKey}${routePath.login}`;
    else
      url = routePath.login;
    console.log("=====url===", url);
    await this.router.navigate([url], { queryParams: { returnUrl: state.url } });


    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if (state.url != "/404" && (this.service.menus && this.service.menus.length > 0 && !this.service.menus.some(menu => menu.routerLink === state.url.split(";")[0])))
    //   this.router.navigate([routePath.dashboard]);

    return true;
  }

}
