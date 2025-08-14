import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IdvLovDto } from '../_dto/lov/idv-lov.dto';
import { apiUrl } from '../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class IdvService {

  lovHeader: IdvLovDto;
  constructor(
    private http: HttpClient
  ) { }

  async getDivisionLovDetails(coCode:string):Promise<IdvLovDto[]>{
   return await this.http.get<IdvLovDto[]>(`${environment.apiUrl}/${apiUrl.divisionAll}?where[coCode]=${coCode}`).toPromise();
  }
}
