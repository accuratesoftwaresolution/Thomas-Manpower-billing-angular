import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IbrDto } from '../_dto/ibr.dto';
import { IcoDto } from '../_dto/ico.dto';
import { IdvLovDto } from '../_dto/lov/idv-lov.dto';
import { apiFilterProperties, apiUrl } from '../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }


  createData(body: IcoDto, apiUrlEnd: string): Promise<any[]> {
    return this.http.post<any[]>(`${environment.apiUrl}/${apiUrlEnd}`, body).toPromise();
  }

  updateData(code: string, body: IcoDto, apiUrlEnd: string): Promise<any[]> {
    return this.http.put<any[]>(`${environment.apiUrl}/${apiUrlEnd}/${code}`, body).toPromise();
  }

  async getDivisionLovDetails(coCode: string): Promise<IdvLovDto[]> {
    return await this.http.get<IdvLovDto[]>(`${environment.apiUrl}/${apiUrl.division}?where[coCode]=${coCode}`).toPromise();
  }

  getIbrLov(): Promise<IbrDto[]> {
    return this.http.get<IbrDto[]>(`${environment.apiUrl}/${apiUrl.branch}?${apiFilterProperties.ibrLovFilter}`).toPromise();
  }
}
