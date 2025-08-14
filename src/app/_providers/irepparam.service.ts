import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IrepparamDto } from '../_dto/irepparam.dto';
import { apiUrl } from '../_resources/api-url.properties';
import { ReportJsonFormatDto } from '../_dto/other/report-json-format.dto';

@Injectable({
  providedIn: 'root'
})
export class IrepparamService {

  assetReportPath :string = 'assets/acccurate/json/reports'

  constructor(
    private http: HttpClient
  ) { }

  getReportParamters(menuId:string): Promise<IrepparamDto[]> {
    return this.http.get<IrepparamDto[]>(`${environment.apiUrl}/${apiUrl.irepparam}?where[menuId]=${menuId}`).toPromise();
  }

  getReportDataFormat(menuId:string): Promise<ReportJsonFormatDto>{
    return this.http.get<ReportJsonFormatDto>(`${this.assetReportPath}/${menuId.toLowerCase()}.json`).toPromise();
  }
  
}
