import { IcoService } from '@accurate/providers';
import { IctTransactionServiceInterface } from '@accurate/toolbar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IisodetailDto } from '../_dto/iisodetail.dto';
import { IisoheaderDto } from '../_dto/iisoheader.dto';
import { apiUrl } from '../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService implements IctTransactionServiceInterface {
  header: IisoheaderDto;
  deletedDetailRows: IisodetailDto[] = [];
  selectedDetailRow: IisodetailDto;
  rateDecPts: number;
  amtDecPts: number;

  constructor(
    private http: HttpClient,
    private _icoService: IcoService,
  ) {
    this.rateDecPts = this._icoService.currentCompanyDetails.rateDecPts ? this._icoService.currentCompanyDetails.rateDecPts : 0;
    this.amtDecPts = this._icoService.currentCompanyDetails.amtDecPts ? this._icoService.currentCompanyDetails.amtDecPts : 0;
  }

  search(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<IisoheaderDto> {
    return this.http.get<IisoheaderDto>(`${environment.apiUrl}/${apiUrl.salesOrderSearch}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

  searchList(coCode: string, dvCode: string, brCode: string, intCode: string): Promise<IisoheaderDto[]> {
    return this.http.get<IisoheaderDto[]>(`${environment.apiUrl}/${apiUrl.salesOrderSearchList}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

  async save(body: IisoheaderDto): Promise<IisoheaderDto> {
    return await this.http.post<IisoheaderDto>(`${environment.apiUrl}/${apiUrl.salesOrder}`, body).toPromise();
  }

  delete(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrl.salesOrder}/${vrNo}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

}
