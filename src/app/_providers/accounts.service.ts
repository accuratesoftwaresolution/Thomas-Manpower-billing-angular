import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Iac3Dto } from '../_dto/iac3.dto';
import { apiUrl, apiFilterProperties } from '../_resources/api-url.properties';
import { Iac4Dto } from '../_dto/iac4.dto';
import { Iac1Dto } from '../_dto/iac1.dto';
import { Iac2Dto } from '../_dto/iac2.dto';

/*
    Created By  : Arun Joy
    Created On  : 14-01-2020
    Created For : Created for getting accounts data from Accounts API.
*/

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(
    private http: HttpClient
  ) { }

  getIac1():Promise<Iac1Dto[]>{
    return this.http.get<Iac1Dto[]>(`${environment.apiUrl}/${apiUrl.iac1All}`).toPromise();
  }

  getAccountsLevel1():Promise<Iac1Dto[]>{
    return this.http.get<Iac1Dto[]>(`${environment.apiUrl}/${apiUrl.accountMaster}/${apiUrl.iac1}`).toPromise();
  }

  getAccountsLevel2(ac1Code:string):Promise<Iac2Dto[]>{
    return this.http.get<Iac2Dto[]>(`${environment.apiUrl}/${apiUrl.accountMaster}/${apiUrl.iac1}/${ac1Code}`).toPromise();

  }

  getAccountsLevel3(ac2Code:string):Promise<Iac3Dto[]>{
    return this.http.get<Iac3Dto[]>(`${environment.apiUrl}/${apiUrl.accountMaster}/${apiUrl.iac2}/${ac2Code}`).toPromise();

  }

  getAccountsLevel4(ac3Code:string):Promise<Iac4Dto[]>{
    return this.http.get<Iac4Dto[]>(`${environment.apiUrl}/${apiUrl.accountMaster}/${apiUrl.iac3}/${ac3Code}`).toPromise();

  }

  checkIsBillAccount(ac3Code:string):Promise<Iac3Dto>{
    return this.http.get<Iac3Dto>(`${environment.apiUrl}/${apiUrl.iac3}/${ac3Code}`).toPromise();
  }

  getHeaderAccountLovWithRights(intCode:string):Promise<Iac4Dto[]>{
    return this.http.get<Iac4Dto[]>(`${environment.apiUrl}/${apiUrl.iintfilter}/${apiUrl.userAccounts}?where[intCode]=${intCode}&where[filterSet]=H`).toPromise();
  }

  getDetailAccountLovWithRights(intCode:string):Promise<Iac4Dto[]>{
    return this.http.get<Iac4Dto[]>(`${environment.apiUrl}/${apiUrl.iintfilter}/${apiUrl.userAccounts}?where[intCode]=${intCode}&where[filterSet]=D`).toPromise();
  }

  getBillAccountOnlyLov():Promise<Iac4Dto[]>{
    return this.http.get<Iac4Dto[]>(`${environment.apiUrl}/${apiUrl.billAccountsLov}`).toPromise();
  }

  getAccountLov(companyCode: string):Promise<Iac4Dto[]>{
    return this.http.get<Iac4Dto[]>(`${environment.apiUrl}/${apiUrl.fullAccounts}?${apiFilterProperties.iac4LovFilter}&where[coCode]=${companyCode}`).toPromise();
  }

  getAccountDetails(acCode: string):Promise<Iac4Dto[]>{
    return this.http.get<Iac4Dto[]>(`${environment.apiUrl}/${apiUrl.fullAccounts}?${apiFilterProperties.iac4LovFilter}&where[acCode]=${acCode}`).toPromise();
  }

  getIac2(coCode:string):Promise<Iac2Dto[]>{
    return this.http.get<Iac2Dto[]>(`${environment.apiUrl}/${apiUrl.iac2}/all?where[coCode]=${coCode}`).toPromise();
  }

  getIac3(coCode:string):Promise<Iac3Dto[]>{
    return this.http.get<Iac3Dto[]>(`${environment.apiUrl}/${apiUrl.iac3}/all?where[coCode]=${coCode}`).toPromise();
  }

  async getAccoutName(accountCode : string):Promise<string>{
    const result = await this.http.get<any>(`${environment.apiUrl}/${apiUrl.accountName}?where[acCode]=${accountCode}`).toPromise();
    if (result) return result.acName; else "";
  }

  async getCompanyDetails(): Promise<any>{
    return await this.http.get<any>(`${environment.apiUrl}/${'ico/current'}`).toPromise();
 }
}
