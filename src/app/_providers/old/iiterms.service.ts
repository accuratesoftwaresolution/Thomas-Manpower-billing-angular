import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IitermsLovDto } from '../../_dto/lov/iiterms-lov.dto';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class OldIitermsService {

  constructor(private http:HttpClient) {

   }
   async getPaymentLovDetails(): Promise<IitermsLovDto[]> {
    return await this.http.get<IitermsLovDto[]>(`${environment.apiUrl}/${apiUrl.terms}?where[termType]=3`).toPromise();
  }
  async getParticularsLovDetails(): Promise<IitermsLovDto[]> {
    return await this.http.get<IitermsLovDto[]>(`${environment.apiUrl}/${apiUrl.terms}?where[termType]=6`).toPromise();
  }
  async getDeliveryLovDetails(): Promise<IitermsLovDto[]> {
    return await this.http.get<IitermsLovDto[]>(`${environment.apiUrl}/${apiUrl.terms}?where[termType]=2`).toPromise();
  }
}
