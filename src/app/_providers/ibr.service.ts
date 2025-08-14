import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl, apiFilterProperties } from '../_resources/api-url.properties';
import { IbrDto } from '../_dto/ibr.dto';


@Injectable({
  providedIn: 'root'
})
export class IbrService {
  header: IbrDto;

  constructor(
    private http: HttpClient
  ) { }

  getIbrLov(): Promise<IbrDto[]> {
    return this.http.get<IbrDto[]>(`${environment.apiUrl}/${apiUrl.branch}?${apiFilterProperties.ibrLovFilter}`).toPromise();
  }

  getBrWithRights(): Promise<IbrDto[]> {
    return this.http.get<IbrDto[]>(`${environment.apiUrl}/${apiUrl.branch}`).toPromise();
  }

  getBrDetails(brCode: string): Promise<IbrDto> {
    return this.http.get<IbrDto>(`${environment.apiUrl}/${apiUrl.branch}/${brCode}`).toPromise();
  }

  postData(body: IbrDto): Promise<IbrDto> {
     return this.http.post<IbrDto>(`${environment.apiUrl}/${apiUrl.branch}`, body).toPromise();
  }

  delete(coCode: string, dvCode: string, brCode: string): Promise<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrl.branch}/${brCode}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}`).toPromise();
  }

  updateBrStartandEndDates(selectedRow:IbrDto): Promise<IbrDto[]>{
    return this.http.put<IbrDto[]>(`${environment.apiUrl}/${apiUrl.branch}/copyToAll`,selectedRow).toPromise();
  }

}
