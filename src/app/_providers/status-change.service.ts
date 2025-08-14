import { Iac4Dto } from 'src/app/_dto/iac4.dto';
import { SelectItem } from '@accurate/dto';
import { MasterService } from '@accurate/providers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusChangeService {

  constructor(
    private _masterService:MasterService,
    private http: HttpClient,
  ) { }


  async getMasterData(apiEndUrl: string): Promise<any> {
    return await this.http.get<any>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
  }


  async updateData(apiEndUrl: string,body:any,id?:string): Promise<Iac4Dto[]> {
    return await this.http.put<Iac4Dto[]>(`${environment.apiUrl}/${apiEndUrl}`,body).toPromise();
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


  getDataInLovFormat1(apiUrl: string, format: number = 1, variableToassign?: any, args?: { labelFeild?: string, secondryFeild?: string, codeFeilds?: string, dataFetchExpression?: { getMethodExpression?: string } }) {
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


}
