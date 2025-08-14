import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../_resources/api-url.properties';
import { IccurrencyDto } from '../_dto/iccurrency.dto';

/*
    Created By  : Arun Joy
    Created On  : 15-01-2020
    Created For : For handling the currency CRUD opertaion using API.
*/

@Injectable({
  providedIn: 'root'
})
export class IccurrencyService {

  constructor(
    private http: HttpClient
  ) { }

  async getCurrencyDetails(code: string): Promise<IccurrencyDto> {
    return await this.http.get<IccurrencyDto>(`${environment.apiUrl}/${apiUrl.currency}/${code}`).toPromise();
  }
  getCurrency(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.currency}`).toPromise();
  }
}
