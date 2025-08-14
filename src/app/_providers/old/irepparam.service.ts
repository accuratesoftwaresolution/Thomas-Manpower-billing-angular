import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IrepparamDto } from '../../_dto/irepparam.dto';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class OldIrepparamService {

  constructor(
    private http: HttpClient
  ) { }

  getReportParamters(menuId:string): Promise<IrepparamDto[]> {
    return this.http.get<IrepparamDto[]>(`${environment.apiUrl}/${apiUrl.irepparam}?where[menuId]=${menuId}`).toPromise();
  }
  
}
