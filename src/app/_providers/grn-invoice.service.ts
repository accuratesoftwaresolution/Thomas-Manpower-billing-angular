import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../_resources/api-url.properties';
import { IctTransactionServiceInterface } from '@accurate/toolbar';
import { IcoService } from '@accurate/providers';
import { AiheaderDto } from '../_dto/aiheader.dto';
import { AiInvoicedetailDto } from '../_dto/aiinvoice-detail.dto';
import { AiInvoiceHeaderDto } from '../_dto/aiinvoice-header.dto';

@Injectable({
  providedIn: 'root'
})
export class GrnInvoiceService implements IctTransactionServiceInterface {
  header: AiInvoiceHeaderDto;
  deletedDetailRows: AiInvoicedetailDto[] = [];
  selectedDetailRow: AiInvoicedetailDto;
  rateDecPts: number;
  amtDecPts: number;
  loading:boolean = false;
  intCode:string;
  allSelect:boolean = false;

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

  async save(body: AiInvoiceHeaderDto): Promise<AiInvoiceHeaderDto> {
    return await this.http.post<AiheaderDto>(`${environment.apiUrl}/${apiUrl.grnReport}`, body).toPromise();
  }

  delete(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrl.directPurchase}/${vrNo}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

  
  searchLov(coCode: string, dvCode: string, brCode: string, intCode: string,vrNo?: number): Promise<AiheaderDto[]> {
    return this.http.get<AiheaderDto[]>(`${environment.apiUrl}/${apiUrl.directPurchase}/search-list?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

}
