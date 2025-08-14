import { IbrDto } from './../_dto/ibr.dto';
import { SelectItem } from '@accurate/dto';
import { MasterService } from '@accurate/providers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  header: IbrDto;

  constructor(
    private http: HttpClient,
    private _masterService: MasterService
  ) { }

  async getBranch(apiEndUrl: string, filter?: string): Promise<any> {
    return await this.http.get<any>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
  }

  async getOneBranch(apiEndUrl: string, Id: string): Promise<IbrDto> {
    return this.http.get<IbrDto>(`${environment.apiUrl}/${apiEndUrl}/${Id}`).toPromise();
  }

  async saveBranch(apiEndUrl: string, body: any): Promise<IbrDto> {
    return this.http.post<IbrDto>(`${environment.apiUrl}/${apiEndUrl}`, body).toPromise();
  }

  async updateBranch(apiEndUrl: string, id: string, body: any): Promise<IbrDto> {
    return this.http.put<IbrDto>(`${environment.apiUrl}/${apiEndUrl}/${id}`, body).toPromise();
  }

  async deleteBranch(apiEndUrl: string): Promise<any[]> {
    return this.http.delete<any[]>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
  }

  async getCompanyDetails(): Promise<any> {
    return await this.http.get<any>(`${environment.apiUrl}/${'ico/current'}`).toPromise();
  }


  async getMasterData(apiEndUrl: string): Promise<any> {
    return await this.http.get<any>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
  }
   

  getDataInLovFormat(apiUrl: string, format: number = 1, variableToassign?: any, args?: { labelFeild?: string, secondryFeild?: string, codeFeilds?: string, dataFetchExpression?: { getMethodExpression?: string } }) {
    let localList: SelectItem[] = [];
    let filter: string;
    if (args && args.dataFetchExpression && args.dataFetchExpression.getMethodExpression)
      filter = args.dataFetchExpression.getMethodExpression
    return this._masterService.getMasterData(apiUrl, filter).then((dataList: any) => {
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
        dataList.data.forEach((dbData) => { localList.push({ label: dbData[primaryColumnName], value: dbData[codeColumnName], data: dbData }) });
      else
        // dataList.forEach((dbData) => { localList.push({ label: dbData[primaryColumnName] + (this._lang.secondryLangauge ? (" " + dbData[secondryColumnName]) : ""), value: dbData[codeColumnName], data: dbData }) });
        dataList.forEach((dbData) => { localList.push({ label: dbData[primaryColumnName], value: dbData[codeColumnName], data: dbData }) });
      return localList;
    })
  }

  async getOneMasterData(apEndUrl: string,id: string): Promise<any> {
    return await this.http.get<any>(`${environment.apiUrl}/${apEndUrl}/${id}`).toPromise();
  }

}
