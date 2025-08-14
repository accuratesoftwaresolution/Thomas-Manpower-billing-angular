import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';
import { IcoLovDto } from '../../_dto/lov/ico-lov.dto';
import { IcoDto } from '../../_dto/ico.dto';

@Injectable({
  providedIn: 'root'
})
export class OldIcoService {

  
  constructor(
    private http: HttpClient
    ){}
  
    async getCompanyLovDetails(): Promise<IcoLovDto[]>{
      return await this.http.get<IcoLovDto[]>(`${environment.apiUrl}/${apiUrl.companyLov}`).toPromise();
   }

   async getCurrentCompanyDetails(): Promise<IcoDto>{
    return await this.http.get<IcoDto>(`${environment.apiUrl}/${apiUrl.company}/current`).toPromise();
 }
}
