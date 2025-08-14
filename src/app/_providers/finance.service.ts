import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IheaderDto } from '../_dto/iheader.dto';
import { environment } from 'src/environments/environment';
import { IadetailDto } from '../_dto/iadetail.dto';
import { PendingBillDto } from '../_dto/other/pendingBill.dto';
import { apiUrl } from '../_resources/api-url.properties';
import { IctTransactionServiceInterface } from '@accurate/toolbar';
import { IcoService } from '@accurate/providers';

/*
    Created By  : Arun Joy
    Created On  : 14-01-2020
    Created For : For handling the finnace CRUD opertaion using API.
*/

@Injectable({
  providedIn: 'root'
})
export class FinanceService implements IctTransactionServiceInterface {

  header: IheaderDto;
  deletedDetailRows: IadetailDto[] = [];
  selectedDetailRow: IadetailDto;

  rateDecPts: number;
  amtDecPts: number;
  constructor(
    private http: HttpClient,
    private _icoService: IcoService,
  ) {
    this.rateDecPts = this._icoService.currentCompanyDetails.rateDecPts ? this._icoService.currentCompanyDetails.rateDecPts : 0;
    this.amtDecPts = this._icoService.currentCompanyDetails.amtDecPts ? this._icoService.currentCompanyDetails.amtDecPts : 0;

  }

  search(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<IheaderDto> {
    return this.http.get<IheaderDto>(`${environment.apiUrl}/${apiUrl.financeSearch}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

  searchList(coCode: string, dvCode: string, brCode: string, intCode: string, isFromVerify?: boolean): Promise<IheaderDto[]> {
    let verifyFilter = isFromVerify? "&where[verified]=N" : "";
      
    return this.http.get<IheaderDto[]>(`${environment.apiUrl}/${apiUrl.financeSearchList}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}${verifyFilter}`).toPromise();
  }

  async save(body: IheaderDto): Promise<IheaderDto> {
    return await this.http.post<IheaderDto>(`${environment.apiUrl}/${apiUrl.finance}`, body).toPromise();
  }

  delete(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrl.finance}/${vrNo}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

  getPendingBills(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number, acCode: string): Promise<PendingBillDto[]> {
    return this.http.get<PendingBillDto[]>(`${environment.apiUrl}/${apiUrl.pendingBills}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}&where[acCode]=${acCode}`).toPromise();
  }

}
