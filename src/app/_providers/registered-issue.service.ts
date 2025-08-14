import { SelectItem } from '@accurate/dto';
import { LangaugeTranslateService, MasterService } from '@accurate/providers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IgissueDetailDto } from '../_dto/igissue-detail.dto';
import { IgissueSummaryDto } from '../_dto/igissue-summary.dto';

@Injectable({
  providedIn: 'root'
})
export class RegisteredIssueService {

  orderKey: string = 'ASC';
  selecetedColumnForSearch: string = "name";
  selecetedKeyForSearch: string = "status";
  searchByStatus: string = 'O';
  searchValue: string = null;
  sortKey: string = '!code';

  header: IgissueSummaryDto;
  notSuperUser:boolean=false;
  private _url: string = `${environment.apiUrl}`;

  constructor(
    public _lang: LangaugeTranslateService,
    private _service: MasterService,
    private http: HttpClient
  ) { }

  async getMasterData(apiUrl: string, filter?:string): Promise<IgissueSummaryDto[]> {
    return await this.http.get<IgissueSummaryDto[]>(`${this._url}/${apiUrl}`).toPromise();
  }
  async updateMasterData(apiUrl: string,body: any | null): Promise<IgissueSummaryDto[]>{
    return await this.http.post<IgissueSummaryDto[]>(`${this._url}/${apiUrl}`,body).toPromise();
  }

  async getSummaryMasterData(apiUrl: string,code: number | string): Promise<IgissueSummaryDto>{
    return await this.http.get<IgissueSummaryDto>(`${this._url}/${apiUrl}/${code}`).toPromise();
  }

  async getDetailData(apiUrl: string,code: number | string,developer: string): Promise<any[]>{
    return await this.http.patch<any[]>(`${this._url}/${apiUrl}/${code}/${developer}`,{}).toPromise();
  }

  async getDetailMasterData(apiUrl: string,filter?:string): Promise<IgissueDetailDto[]>{
    return await this.http.get<IgissueDetailDto[]>(`${this._url}/${apiUrl}`).toPromise();
  }

  async updateDetailData(apiUrl: string,body: any | null): Promise<IgissueDetailDto>{
    return await this.http.post<IgissueDetailDto>(`${this._url}/${apiUrl}`,body).toPromise();
  }

  async getDataInLovFormat(apiUrl: string, format: number = 1, variableToassign?: any, args?: { labelFeild?: string, secondryFeild?: string, codeFeilds?: string, dataFetchExpression?: { getMethodExpression?: string } }, type?: "REG" | "APP" ) {
    if(!type)
      type = "APP";
      let localList: SelectItem[] = [];
      let filter: string;
      if (args && args.dataFetchExpression && args.dataFetchExpression.getMethodExpression)
        filter = args.dataFetchExpression.getMethodExpression;
     
      let method = type=="REG" ? this.getMasterData(apiUrl, filter) :  this._service.getMasterData(apiUrl, filter);
      
      return method.then((dataList: any[]) => {
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
        localList.push({ label: this._lang.first("Please Select From List"), value: "", labelPl: this._lang.first("Please Select From List"), labelSl: this._lang.second("Please Select From List"), data: [] });
        if (format && format == 2)
          dataList.forEach((dbData) => { localList.push({ label: dbData[primaryColumnName] + (this._lang.secondryLangauge ? (" " + dbData[secondryColumnName]) : ""), labelPl: dbData[primaryColumnName], labelSl: this._lang.secondryLangauge ? dbData[secondryColumnName] : "", value: dbData[codeColumnName], data: dbData }) });
        else
          // dataList.forEach((dbData) => { localList.push({ label: dbData[primaryColumnName] + (this._lang.secondryLangauge ? (" " + dbData[secondryColumnName]) : ""), value: dbData[codeColumnName], data: dbData }) });
          dataList.forEach((dbData) => { localList.push({ label: dbData[primaryColumnName], value: dbData[codeColumnName], data: dbData }) });
        return localList;
      })
    }

    async getImg(apiUrlEnd:string,imagePath:string){
      return await this.http.get(`${environment.apiUrl}/${apiUrlEnd}/${imagePath}`,{responseType:'blob'}).toPromise();
    }

}
