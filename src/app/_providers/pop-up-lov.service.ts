import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl, apiFilterProperties } from '../_resources/api-url.properties';
import { IiitemDto } from '../_dto/iiitem.dto';
import { IistoreDto } from '../_dto/iistore.dto';
import { IjjobLovDto } from '../_dto/lov/ijjob-lov.dto';
import { IcsalesmanDto } from '../_dto/icsalesman.dto';
import { IacatLovDto } from '../_dto/lov/iacat-lov.dto';
import { IaccatgroupLovDto } from '../_dto/lov/iaccatgroup-lov.dto';
import { IcareaLovDto } from '../_dto/lov/icarea-lov.dto';
import { IccountryDto } from '../_dto/iccountry.dto';
import { IcterritoryLovDto } from '../_dto/lov/icterritory-lov.dto';
import { IccityLovDto } from '../_dto/lov/iccity-lov.dto';
import { IcdebtcollectorLovDto } from '../_dto/lov/icdebtcollector-lov.dto';
import { IdeptLovDto } from '../_dto/lov/idept-lov.dto';
import { IuserDto } from '../_dto/iuser.dto';
import { Iigrp1LovDto } from '../_dto/lov/iigrp1-lov.dto';
import { IiunitLovDto } from '../_dto/lov/iiunit-lov.dto';
import { ImoduleLovDto } from '../_dto/lov/imodule-lov.dto';
import { IintDto } from '../_dto/iint.dto';
import { IintobjectLovDto } from '../_dto/lov/iintobject-lov.dto';
import { IintlogicLovDto } from '../_dto/lov/iintlogic-lov.dto';
import { IsetupDto } from '../_dto/isetup.dto';
import { Iac4Dto } from '../_dto/iac4.dto';
import { IcvatcatDto } from '../_dto/icvatcat.dto';

/*
    Created By  : Arun Joy
    Created On  : 14-01-2020
    Created For : For handling the popup lov using API.
*/

@Injectable({
  providedIn: 'root'
})
export class PopUpLovService {

  constructor(
    private http: HttpClient
  ) { }

  getItemsLov(): Promise<IiitemDto[]> {
    return this.http.get<IiitemDto[]>(`${environment.apiUrl}/${apiUrl.item}`).toPromise();
  }

  getStoreLov(brCode?: string): Promise<IistoreDto[]> {
    let filter: any = "";
    if (brCode)
      filter = `?where[storeBr]=${brCode}`;
    return this.http.get<IistoreDto[]>(`${environment.apiUrl}/${apiUrl.store}${filter}`).toPromise();
  }

  getJobLov(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.job}?${apiFilterProperties.ijjobLovFilter}`).toPromise();
  }

  getSalesmanLov(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.salesman}`).toPromise();
  }

  getSalesmanLovActive(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.salesman}?where[status]=A`).toPromise();
  }

  getSalesmanLovWithFilter(filter: string): Promise<IcsalesmanDto[]> {
    return this.http.get<IcsalesmanDto[]>(`${environment.apiUrl}/${apiUrl.salesman}?${filter}`).toPromise();
  }

  getAccountsCategory(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.iacat}`).toPromise();
  }

  getAccountsCategoryGroup(): Promise<IaccatgroupLovDto[]> {
    return this.http.get<IaccatgroupLovDto[]>(`${environment.apiUrl}/${apiUrl.iacatgroup}`).toPromise();
  }

  getAreaLov(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.area}`).toPromise();
  }

  getTerritoryLov(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.territory}`).toPromise();
  }

  getCountryLov(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.country}`).toPromise();
  }

  getCompanyTypeLov(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.companytype}`).toPromise();
  }

  getDebtColllectorLov(): Promise<any> {
    return this.http.get<any>(`${environment.apiUrl}/${apiUrl.debtCollector}`).toPromise();
  }

  getDepartmentLov(): Promise<any> {
    return this.http.get<IdeptLovDto[]>(`${environment.apiUrl}/${apiUrl.dept}`).toPromise();
  }

  getModuleLov():Promise<ImoduleLovDto[]>{
    return this.http.get<ImoduleLovDto[]>(`${environment.apiUrl}/${apiUrl.imodule}?where[status]=A`).toPromise();
  }

  async getUserIdLov(): Promise<any> {
    return await this.http.get<any>(`${environment.apiUrl}/${apiUrl.userMaster}?${apiFilterProperties.iuserLovFilter}`).toPromise();
  }

  async getUserGroupLov(): Promise<IuserDto[]> {
    return await this.http.get<IuserDto[]>(`${environment.apiUrl}/${apiUrl.userMaster}?where[groupOrUser]=G`).toPromise();
  }

  async getUnitLov(): Promise<IiunitLovDto[]> { 
    return await this.http.get<IiunitLovDto[]>(`${environment.apiUrl}/${apiUrl.unit}`).toPromise();
  }
  
  async getGrp1Lov(): Promise<Iigrp1LovDto[]> {
    return await this.http.get<Iigrp1LovDto[]>(`${environment.apiUrl}/${apiUrl.grp1}`).toPromise();
  }

  async getGrp2Lov(): Promise<Iigrp1LovDto[]> {
    return await this.http.get<Iigrp1LovDto[]>(`${environment.apiUrl}/${apiUrl.grp2}`).toPromise();
  }

  async getGrp3Lov(): Promise<Iigrp1LovDto[]> {
    return await this.http.get<Iigrp1LovDto[]>(`${environment.apiUrl}/${apiUrl.grp3}`).toPromise();
  }

  async getGrp4Lov(): Promise<Iigrp1LovDto[]> {
    return await this.http.get<Iigrp1LovDto[]>(`${environment.apiUrl}/${apiUrl.grp4}`).toPromise();
  }

  async getGrp5Lov(): Promise<Iigrp1LovDto[]> {
    return await this.http.get<Iigrp1LovDto[]>(`${environment.apiUrl}/${apiUrl.grp5}`).toPromise();
  }

  async getGrp6Lov(): Promise<Iigrp1LovDto[]> {
    return await this.http.get<Iigrp1LovDto[]>(`${environment.apiUrl}/${apiUrl.grp6}`).toPromise();
  }

  async getGrp7Lov(): Promise<Iigrp1LovDto[]> {
    return await this.http.get<Iigrp1LovDto[]>(`${environment.apiUrl}/${apiUrl.grp7}`).toPromise();
  }

  async getGrp8Lov(): Promise<Iigrp1LovDto[]> {
    return await this.http.get<Iigrp1LovDto[]>(`${environment.apiUrl}/${apiUrl.grp8}`).toPromise();
  }
  
  async getIintDetails(): Promise<IintDto[]> {
    return await this.http.get<IintDto[]>(`${environment.apiUrl}/${apiUrl.iint}`).toPromise();
  }

  async getInterfaceObjectLov(): Promise<IintobjectLovDto[]> {
    return await this.http.get<IintobjectLovDto[]>(`${environment.apiUrl}/${apiUrl.iintobject}?where[typ]='E'`).toPromise();
  }

  async getIintlogicLov(): Promise<IintlogicLovDto[]> {
    return await this.http.get<IintlogicLovDto[]>(`${environment.apiUrl}/${apiUrl.iintlogic}`).toPromise();
  }

  async getInterfaceObjectRptLov(): Promise<IintobjectLovDto[]> {
    return await this.http.get<IintobjectLovDto[]>(`${environment.apiUrl}/${apiUrl.iintobject}?where[typ]='R'`).toPromise();
  }

  async getIsetupLov(coCode: string): Promise<IsetupDto[]> {
    return await this.http.get<IsetupDto[]>(`${environment.apiUrl}/${apiUrl.isetup}?${apiFilterProperties.isetupLovFilter}?where[coCode]=${coCode}`).toPromise();
  }

  getAccountsLov(): Promise<Iac4Dto[]> {
    return this.http.get<Iac4Dto[]>(`${environment.apiUrl}/${apiUrl.iac4}`).toPromise();
  }

  getVatCatLov(): Promise<IcvatcatDto[]>{
    return this.http.get<IcvatcatDto[]>(`${environment.apiUrl}/${apiUrl.vatCat}`).toPromise();
  }
}
