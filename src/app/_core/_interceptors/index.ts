import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthHeaderInterceptor } from './auth-header.interceptor';

/*
    Created By  : Arun Joy
    Created On  : 03-01-2020
    Created For : For handling the http api interceptor.
*/

export const HttpInterceptProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true}
];