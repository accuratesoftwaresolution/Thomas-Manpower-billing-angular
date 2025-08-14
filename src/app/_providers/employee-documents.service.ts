import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { MasterService } from '@accurate/providers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { empdocumentsDto } from '../_dto/empdocuments.dto';
import { apiUrl } from '../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDocumentsService {

  constructor( private _masterService:MasterService,
               private http:HttpClient) { }

    
  async getCompanyDetails(): Promise<any>{
    return await this.http.get<any>(`${environment.apiUrl}/${'ico/current'}`).toPromise();
 }

 getDataInLovFormat(apiUrl: string, format: number = 1, variableToassign?: any, args?: { labelFeild?: string, secondryFeild?: string, codeFeilds?: string, dataFetchExpression?: { getMethodExpression?: string } }) {
  let localList: SelectItem[]=[];
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


async getMasterData(apiEndUrl: string): Promise<any> {
  return await this.http.get<any>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
}
 
 async getOneMasterData(apEndUrl: string,id: string): Promise<any> {
   return await this.http.get<any>(`${environment.apiUrl}/${apEndUrl}/${id}`).toPromise();
 }
 
 async getAllData(apiEndUrl:string): Promise<any> {
  return await this.http.get<any>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
}

async updateData(body:any,id:string): Promise<empdocumentsDto[]> {
  return await this.http.put<empdocumentsDto[]>(`${environment.apiUrl}/${apiUrl.apempdocument}/${id}`,body).toPromise();
}

async save(body: any): Promise<empdocumentsDto> {
  return this.http.post<empdocumentsDto>(`${environment.apiUrl}/${apiUrl.apempdocument}`,body).toPromise();
}

async delete(apiEndUrl:string):Promise<any>{
  return this.http.delete<any>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
}
}

