import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";
import { Router } from '@angular/router';
import { CryptoService } from '../_security/crypto.service';
import { routePath } from "src/app/_providers/_resources/route-path.properties";

/*
    Created By  : Arun Joy
    Created On  : 03-01-2020
    Created For : For handling the http api request before it calling.
*/

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    constructor(
        private crypto: CryptoService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        if (request.url.includes('auth'))
            return next.handle(this.addAuthKey(request))

        if (request.url.startsWith('assets/') && request.url.endsWith('.json'))
            return next.handle(request)

        return next.handle(this.addAuthenticationToken(request))
            .pipe(catchError(error => {
                if (error.status === 401) {
                    return next.handle(this.addAuthenticationToken(request, true))
                        .pipe(
                            tap(event => {
                                if (event instanceof HttpResponse) {
                                    localStorage.setItem("authtoken", event.headers.get('Authorization'));
                                }
                            }),
                            catchError(err => {
                                if (error.status === 401) {
                                    this.presentAlert();
                                }
                                return throwError(error);
                            }));
                }
                return throwError(error);
            }));
    }

    private addAuthKey(request: HttpRequest<any>): HttpRequest<any>{
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        let authKey = localStorage.getItem("authKey");
        // authKey = this.crypto.decrypt(authKey);
        if (!authKey) {
            return request;
        }
        return request.clone({
            setHeaders: {
                'authkey': `${authKey}`,
            },
        });
    }

    private addAuthenticationToken(request: HttpRequest<any>, hasRefreshToken?: boolean): HttpRequest<any> {
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        const authtoken = localStorage.getItem('authtoken');
        const emailId = localStorage.getItem('emailId') ? localStorage.getItem('emailId') : "";
        const module = localStorage.getItem('module') ? localStorage.getItem('module') : "";
        const refreshtoken = localStorage.getItem('refreshtoken');
        const authKey = localStorage.getItem('authKey');

        if (!authtoken) {
            return request;
        }
        // If you are calling an outside domain then do not add the token.
        // if (!request.url.match(/www.mydomain.com\//)) {
        //   return request;
        // }
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.crypto.get("accessToken@#123", (!authtoken ? "" : authtoken))}`,
                'refreshtoken': !hasRefreshToken ? '' : `${this.crypto.get("accessToken@#123", (!refreshtoken ? "" : refreshtoken))}`,
                'emailid': `${emailId}`,
                'module': `${module}`,
                'authkey': `${authKey}`,
            },
        });
    }
    async presentAlert() {
        localStorage.setItem("authtoken", "");
        localStorage.setItem("refreshtoken", "");
        localStorage.removeItem("authtoken");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("media");
        this.router.navigate([routePath.login]);
    }

}