import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';
import { IdvLovDto } from '../../_dto/lov/idv-lov.dto';

@Injectable({
  providedIn: 'root'
})
export class OldIdvService {

  lovHeader: IdvLovDto;
  constructor(
    private http: HttpClient
  ) { }

  async getDivisionLovDetails(coCode:string):Promise<IdvLovDto[]>{
   return await this.http.get<IdvLovDto[]>(`${environment.apiUrl}/${apiUrl.divisionLov}?where[coCode]=${coCode}`).toPromise();
  }
}
