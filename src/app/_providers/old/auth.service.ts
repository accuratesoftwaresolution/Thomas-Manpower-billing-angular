import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationDto } from '../../_dto/authentication.dto';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';
import { TokenDto } from '../../_dto/token.dto';
import { routePath } from '../../_resources/route-path.properties';

/*
    Created By  : Arun Joy
    Created On  : 14-01-2020
    Created For : Created for getting authentication data from authentication API.
*/

@Injectable({
  providedIn: 'root'
})
export class OldAuthService {

  headers: HttpHeaders = new HttpHeaders();
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signIn(param: AuthenticationDto): Promise<TokenDto> {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<TokenDto>(`${environment.apiUrl}/${apiUrl.login}`, param).toPromise();
  }

  getUserInfo(){
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.userInfo}`).toPromise();
  }

  googleSignIn() {
    var myWindow = window.open(`${environment.apiUrl}/${apiUrl.googleSignIn}`, "_system", "width=400,height=400,toolbar=yes,scrollbars=yes,resizable=yes");

    let timer = setInterval(() => {
      if (myWindow.closed) {
        clearInterval(timer);
        let token = localStorage.getItem("authtoken");
        if (token) {
          this.router.navigate([routePath.dashboard]);
        }
      }
    }, 1000);

  }

  async logOut() {
    localStorage.setItem('authtoken', '');
    localStorage.setItem('refreshtoken', '');
    localStorage.setItem('media','');
    await localStorage.removeItem('authtoken');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('media');
    await this.router.navigate([routePath.login]);
    // this.navCntrl.navigateBack('/Login');
  }
  

}
