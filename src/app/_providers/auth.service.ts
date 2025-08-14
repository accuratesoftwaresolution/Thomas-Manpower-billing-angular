import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationDto } from '../_dto/authentication.dto';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../_resources/api-url.properties';
import { TokenDto } from '../_dto/token.dto';
import { routePath } from '../_resources/route-path.properties';
import { IuserDto } from '../_dto/iuser.dto';
import { ProvidersService } from '@accurate/providers'; 

/*
    Created By  : Arun Joy
    Created On  : 14-01-2020
    Created For : Created for getting authentication data from authentication API.
*/

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers: HttpHeaders = new HttpHeaders();

  environment: any;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private conn: ProvidersService

  ) {
    this.environment = this.conn.environment;
   }

  signIn(param: AuthenticationDto): Promise<TokenDto> {
    this.headers.append('Content-Type', 'application/json');
    // return this.http.get<any>(`${environment.ApiUrl}/${apiUrl.tempLogin}`).toPromise();

    return this.http.post<TokenDto>(`${environment.apiUrl}/${apiUrl.login}`, param).toPromise();
  }

  getUserInfo(){
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.userInfo}`).toPromise(); 
    // Uncomment this when using API LOGIN
    // let user = {userName : "Dummy User", userId: 1 }
    // return user
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


  async changePassword(passwords: { currentPwd: string, pass: string }): Promise<IuserDto> {
    return this.http.patch<IuserDto>(`${this.environment.apiUrl}/user/change-password`, passwords).toPromise();
  }
  
}
