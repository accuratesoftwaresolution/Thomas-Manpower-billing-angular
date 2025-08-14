import { IcoService } from '@accurate/providers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IapodetailDto } from '../_dto/iapodetail.dto';
import { IapoheaderDto } from '../_dto/iapoheader.dto';
import { apiUrl } from '../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class NonInventoryPurchaseService {
  header: IapoheaderDto;
  deletedDetailRows: IapodetailDto[] = [];
  selectedDetailRow: IapodetailDto;
  rateDecPts: number;
  amtDecPts: number;


  constructor(
    private http: HttpClient,
    private _icoService: IcoService,
  ) {
    this.rateDecPts = this._icoService.currentCompanyDetails.rateDecPts ? this._icoService.currentCompanyDetails.rateDecPts : 0;
    this.amtDecPts = this._icoService.currentCompanyDetails.amtDecPts ? this._icoService.currentCompanyDetails.amtDecPts : 0;
   }

  search(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<IapoheaderDto> {
    return this.http.get<IapoheaderDto>(`${environment.apiUrl}/${apiUrl.nonInventoryPurchaseSearch}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

  searchList(coCode: string, dvCode: string, brCode: string, intCode: string): Promise<IapoheaderDto[]> {
    return this.http.get<IapoheaderDto[]>(`${environment.apiUrl}/${apiUrl.nonInventoryPurchaseList}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

  async save(body: IapoheaderDto): Promise<IapoheaderDto> {
    return await this.http.post<IapoheaderDto>(`${environment.apiUrl}/${apiUrl.nonInventoryPurchase}`, body).toPromise();
  }

  delete(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrl.nonInventoryPurchase}/${vrNo}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

}
