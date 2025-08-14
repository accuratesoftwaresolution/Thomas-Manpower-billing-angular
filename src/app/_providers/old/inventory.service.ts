import { Injectable } from '@angular/core';
import { IctTransactionServiceInterface } from '../../_modules/dashboard/framework/interface/ict-transaction-service.interface';
import { IheaderDto } from '../../_dto/iheader.dto';
import { IidetailDto } from '../../_dto/iidetail.dto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class OldInventoryService implements IctTransactionServiceInterface {

  /*
    Created By  : Arun Joy
    Created On  : 10-01-2020
    Created For : For handling the inventory CRUD opertaion using API.
*/

  header: IheaderDto;
  deletedDetailRows:IidetailDto[]=[];
  selectedDetailRow: IidetailDto;

  constructor(
    private http: HttpClient
  ) { }

  search(coCode:string,dvCode: string,brCode: string,intCode: string,vrNo:number): Promise<IheaderDto>{
    return this.http.get<IheaderDto>(`${environment.apiUrl}/${apiUrl.inventorySearch}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

  searchList(coCode:string,dvCode: string,brCode: string,intCode: string): Promise<IheaderDto[]>{
    return this.http.get<IheaderDto[]>(`${environment.apiUrl}/${apiUrl.inventorySearchList}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

  save(body:IheaderDto):Promise<IheaderDto>{
    return this.http.post<IheaderDto>(`${environment.apiUrl}/${apiUrl.inventory}`,body).toPromise();
  }

  delete(coCode: string,dvCode: string,brCode: string,intCode: string,vrNo: number):Promise<any>{
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrl.inventory}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }
  
}
