import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IaexpgroupDto } from '../_dto/iaexpgroup.dto';
import { IaexpsubgroupDto } from '../_dto/iaexpsubgroup.dto';
import { apiUrl } from '../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class ExpenseGroupService {

  constructor(
    private http: HttpClient
  ) { }

  // getAccountsLevel1():Promise<Iac1Dto[]>{
  //   return this.http.get<Iac1Dto[]>(`${environment.apiUrl}/${apiUrl.accountMaster}/${apiUrl.iac1}`).toPromise();
  // }

  getLevel1(): Promise<IaexpgroupDto[]> {
    return this.http.get<IaexpgroupDto[]>(`${environment.apiUrl}/${apiUrl.iaexpgroup}`).toPromise();
  }

  getLevel2(groupCode: string): Promise<IaexpsubgroupDto[]> {
    return this.http.get<IaexpsubgroupDto[]>(`${environment.apiUrl}/${apiUrl.iaexpsubgroup}?where[groupCode]=${groupCode}`).toPromise();
  }
}
