import { Injectable } from '@angular/core';
// import { IctTransactionServiceInterface } from '../../_modules/dashboard/framework/interface/ict-transaction-service.interface';
import { IipoheaderDto } from '../../_dto/iipoheader.dto';
import { IipodetailDto } from '../../_dto/iipodetail.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';
import { IctTransactionServiceInterface } from '@accurate/toolbar';

/*
    Created By  : Aswathy Prasad T P
    Created On  : 28-02-2020
    Created For : For handling the Company CRUD opertaion using API.
*/

@Injectable({
  providedIn: 'root'
})
export class OldPurchaseOrderService implements IctTransactionServiceInterface {

  header: IipoheaderDto;
  deletedDetailRows: IipodetailDto[] = [];
  selectedDetailRow: IipodetailDto;

  constructor(
    private http: HttpClient
  ) { }
  search(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<IipoheaderDto> {
    return this.http.get<IipoheaderDto>(`${environment.apiUrl}/${apiUrl.purchaseOrderSearch}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

  searchList(coCode: string, dvCode: string, brCode: string, intCode: string): Promise<IipoheaderDto[]> {
    return this.http.get<IipoheaderDto[]>(`${environment.apiUrl}/${apiUrl.purchaseOrderSearchList}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

  save(body: IipoheaderDto): Promise<IipoheaderDto> {
    return this.http.post<IipoheaderDto>(`${environment.apiUrl}/${apiUrl.purchaseOrder}`, body).toPromise();
  }

  delete(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrl.purchaseOrder}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

}
