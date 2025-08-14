import { IsetupDto } from './../_dto/isetup.dto';
import { IdvDto } from './../_dto/idv.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../_resources/api-url.properties';
import { IcoLovDto } from '../_dto/lov/ico-lov.dto';
import { SelectItem } from '@accurate/dto';
import { MasterService } from '@accurate/providers';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  header: IdvDto;

  constructor(
    private http: HttpClient,
    private _masterService: MasterService
  ) { }

  async getDivisions(apiEndUrl:string,filter?:string): Promise<any>{
    return await this.http.get<any>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
  }

  async getOneDivision(apiEndUrl:string, Id: string): Promise<IdvDto> {
    return this.http.get<IdvDto>(`${environment.apiUrl}/${apiEndUrl}/${Id}`).toPromise();
  }

  async saveDivision(apiEndUrl:string, body: any): Promise<IdvDto> {
    return this.http.post<IdvDto>(`${environment.apiUrl}/${apiEndUrl}`,body).toPromise();
  }

  async updateDivision(apiEndUrl:string, id: string,body: any): Promise<IdvDto> {
    return this.http.put<IdvDto>(`${environment.apiUrl}/${apiEndUrl}/${id}`,body).toPromise();
  }

  async deletedivision(apiEndUrl: string, id: string): Promise<any[]> {
    return this.http.delete<any[]>(`${environment.apiUrl}/${apiEndUrl}/${id}`).toPromise();
  }

  async getCompanyDetails(): Promise<any>{
    return await this.http.get<any>(`${environment.apiUrl}/${'ico/current'}`).toPromise();
 }





 getDataInLovFormat(apiUrl: string, format: number = 1, variableToassign?: any, args?: { labelFeild?: string, secondryFeild?: string, codeFeilds?: string, dataFetchExpression?: { getMethodExpression?: string } }) {
  let localList: SelectItem[] = [];
  let filter: string;
  if (args && args.dataFetchExpression && args.dataFetchExpression.getMethodExpression)
    filter = args.dataFetchExpression.getMethodExpression
  return this._masterService.getMasterData(apiUrl, filter).then((dataList: any[]) => {
    if (variableToassign) {
      variableToassign(dataList);
    }
    let primaryColumnName = "name";
    let secondryColumnName = "nameSl";
    let codeColumnName = "code"
    if (args) {
      if (args.labelFeild) primaryColumnName = args.labelFeild;
      if (args.secondryFeild) secondryColumnName = args.secondryFeild;
      if (args.codeFeilds) codeColumnName = args.codeFeilds;
    }
    localList.push({ label: "Please Select", value: "", data: [] });
    if (format && format == 2)
      dataList.forEach((dbData) => { localList.push({ label: dbData[primaryColumnName], value: dbData[codeColumnName], data: dbData }) });
    else
      // dataList.forEach((dbData) => { localList.push({ label: dbData[primaryColumnName] + (this._lang.secondryLangauge ? (" " + dbData[secondryColumnName]) : ""), value: dbData[codeColumnName], data: dbData }) });
      dataList.forEach((dbData) => { localList.push({ label: dbData[primaryColumnName], value: dbData[codeColumnName], data: dbData }) });
    return localList;
  })
}

}
