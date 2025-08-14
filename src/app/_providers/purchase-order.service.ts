import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IipoheaderDto } from '../_dto/iipoheader.dto';
import { IipodetailDto } from '../_dto/iipodetail.dto';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../_resources/api-url.properties';
import { IctTransactionServiceInterface } from '@accurate/toolbar';
import { IcoService } from '@accurate/providers';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService implements IctTransactionServiceInterface {
  header: IipoheaderDto;
  deletedDetailRows: IipodetailDto[] = [];
  selectedDetailRow: IipodetailDto;
  rateDecPts: number;
  amtDecPts: number;

  constructor(
    private http: HttpClient,
    private _icoService: IcoService,
  ) {
    this.rateDecPts = this._icoService.currentCompanyDetails.rateDecPts ? this._icoService.currentCompanyDetails.rateDecPts : 0;
    this.amtDecPts = this._icoService.currentCompanyDetails.amtDecPts ? this._icoService.currentCompanyDetails.amtDecPts : 0;
  }



  search(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<IipoheaderDto> {
    return this.http.get<IipoheaderDto>(`${environment.apiUrl}/${apiUrl.purchaseOrderSearch}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

  searchList(coCode: string, dvCode: string, brCode: string, intCode: string): Promise<IipoheaderDto[]> {
    return this.http.get<IipoheaderDto[]>(`${environment.apiUrl}/${apiUrl.purchaseOrderSearchList}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

  async save(body: IipoheaderDto): Promise<IipoheaderDto> {
    return await this.http.post<IipoheaderDto>(`${environment.apiUrl}/${apiUrl.purchaseOrder}`, body).toPromise();
  }

  delete(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrl.purchaseOrder}/${vrNo}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

}
