import { Injectable } from '@angular/core';
import { IctTransactionServiceInterface } from '../../_modules/dashboard/framework/interface/ict-transaction-service.interface';
import { IapoheaderDto } from '../../_dto/iapoheader.dto';
import { IapodetailDto } from '../../_dto/iapodetail.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';


@Injectable({
  providedIn: 'root'
})
export class OldNonInvPurchaseOrderService implements IctTransactionServiceInterface {

  header:IapoheaderDto;
  deletedDetailRows:IapodetailDto[]=[];
  selectedDetailRow:IapodetailDto;

  constructor(private http:HttpClient) { }

  search(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<IapoheaderDto>
  {
    return this.http.get<IapoheaderDto>(`${environment.apiUrl}/${apiUrl.noninvPurchaseorderSearch}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }
  searchList(coCode: string, dvCode: string, brCode: string, intCode: string):Promise<IapoheaderDto[]>
  {
    return this.http.get<IapoheaderDto[]>(`${environment.apiUrl}/${apiUrl.noninvPurchaseorderSearchList}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();

  }
  save(body: IapoheaderDto): Promise<IapoheaderDto> {
    return this.http.post<IapoheaderDto>(`${environment.apiUrl}/${apiUrl.noninvPurchaseorder}`, body).toPromise();
  }

  delete(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrl.noninvPurchaseorder}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

}
