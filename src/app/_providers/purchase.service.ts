import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../_resources/api-url.properties';
import { IctTransactionServiceInterface } from '@accurate/toolbar';
import { IcoService } from '@accurate/providers';
import { AiheaderDto } from '../_dto/aiheader.dto';
import { AidetailDto } from '../_dto/aidetail.dto';
import { TblTransHeadDto } from '../_dto/tbltranshead.dto';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService implements IctTransactionServiceInterface {
  header: AiheaderDto;
  deletedDetailRows: AidetailDto[] = [];
  selectedDetailRow: AidetailDto;
  rateDecPts: number;
  amtDecPts: number;


  // NEWWWWWWWWWWWWWWWWWWWWWWWWWWW //



  purchaseData: TblTransHeadDto = new TblTransHeadDto();

  selectedDetailRows: any[] = [];

  selectedPopUp: any

  detailsData: any

  constructor(
    private http: HttpClient,
    private _icoService: IcoService,
  ) {
    this.rateDecPts = this._icoService.currentCompanyDetails.rateDecPts ? this._icoService.currentCompanyDetails.rateDecPts : 0;
    this.amtDecPts = this._icoService.currentCompanyDetails.amtDecPts ? this._icoService.currentCompanyDetails.amtDecPts : 0;
    // console.log("-coinDec--", this.coinDec)
  }



  search(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<AiheaderDto> {
    return this.http.get<AiheaderDto>(`${environment.apiUrl}/${apiUrl.directPurchase}/${vrNo}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

  searchList(coCode: string, dvCode: string, brCode: string, intCode: string): Promise<AiheaderDto[]> {
    return this.http.get<AiheaderDto[]>(`${environment.apiUrl}/${apiUrl.directPurchase}/search-list?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

  async save(body: AiheaderDto): Promise<AiheaderDto> {
    return await this.http.post<AiheaderDto>(`${environment.apiUrl}/${apiUrl.directPurchase}`, body).toPromise();
  }

  delete(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrl.directPurchase}/${vrNo}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }


  searchLov(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo?: number): Promise<AiheaderDto[]> {
    return this.http.get<AiheaderDto[]>(`${environment.apiUrl}/${apiUrl.directPurchase}/search-list?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }













  async getMasterData(apiEndUrl: string): Promise<any> {
    return await this.http.get<any>(`${environment.ApiUrl}/${apiEndUrl}`).toPromise();
  }

  async getMasterDatabyId(apiEndUrl: any, id: any): Promise<any> {
    return await this.http.get<any>(`${environment.ApiUrl}/${apiEndUrl}/${id}`).toPromise();
  }


  async Save(body: TblTransHeadDto): Promise<TblTransHeadDto> {
    return await this.http.post<TblTransHeadDto>(`${environment.ApiUrl}/${apiUrl.finance}`, body).toPromise();
  }

  async updateMasterData(apiEndUrl: any, body: any, id: any): Promise<any> {
    return await this.http.put<any>(`${environment.ApiUrl}/${apiEndUrl}/${id}`, body).toPromise();
  }
  async deleteMasterData(apiEndUrl: any, id: any): Promise<any[]> {
    return await this.http.delete<any>(`${environment.ApiUrl}/${apiEndUrl}/${id}`).toPromise();
  }
  async deleteMasterDataById(apiEndUrl: any, body: any, id: any): Promise<any> {
    return await this.http.delete<any>(`${environment.ApiUrl}/${apiEndUrl}/${id}`, body).toPromise();
  }
  async deleteDataById(apiEndUrl: string, id: any, headers?: HttpHeaders): Promise<any> {
    const options = headers ? { headers } : {};
    return await this.http.delete<any>(`${environment.ApiUrl}/${apiEndUrl}/${id}`, options).toPromise();
  }












}
