import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IgissueDetailDto } from '../_dto/igissue-detail.dto';
import { IgissueSummaryDto } from '../_dto/igissue-summary.dto';
import { apiUrl } from '../_resources/api-url.properties';

/*
Created by Sruthin
date: 25-10-2021
 */

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private http:HttpClient, 
    ) { }
  
  async getMasterData(apiEndUrl:string,filter?:string): Promise<IgissueSummaryDto[]> {
    return await this.http.get<IgissueSummaryDto[]>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
  }

  async save(body:any): Promise<IgissueSummaryDto> {
    return await this.http.post<IgissueSummaryDto>(`${environment.apiUrl}/${apiUrl.issueTracker}`,body).toPromise();
  }

  async getDetailMasterData(apiEndUrl:string,filter?:string): Promise<IgissueDetailDto[]>{
    return await this.http.get<IgissueDetailDto[]>(`${environment.apiUrl}/${apiEndUrl}/${filter}`).toPromise();
  }

  async updateMasterData(apiEndurl:string,body:any): Promise<IgissueSummaryDto> {
    return await this.http.post<IgissueSummaryDto>(`${environment.apiUrl}/${apiEndurl}`,body).toPromise();
  }

  async updateDetailData(apiEndUrl:string,body): Promise<IgissueDetailDto> {
    return await this.http.post<IgissueDetailDto>(`${environment.apiUrl}/${apiEndUrl}`,body).toPromise();
  }

  async getImg(apiUrlEnd:string,imagePath:string){
    return await this.http.get(`${environment.apiUrl}/${apiUrlEnd}/${imagePath}`,{responseType:'blob'}).toPromise();
  }


}
