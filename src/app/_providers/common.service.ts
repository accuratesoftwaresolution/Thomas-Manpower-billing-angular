import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IctGridServiceInterface } from '@accurate/toolbar';
import { IccountryDto } from '../_dto/iccountry.dto';
// import { IccountryDto } from '../../_dto/iccountry.dto';
// import { IctGridServiceInterface } from '../../_modules/dashboard/framework/interface/ict-grid-service.interface';

/*
    Created By  : Arun Joy
    Created On  : 14-01-2020
    Created For : Created for getting common module data from common API like country, area, curreny etc.
*/

@Injectable({
  providedIn: 'root'
})
export class OldCommonService implements IctGridServiceInterface {

  constructor(
    private http: HttpClient
  ) { }

  getData(apiUrlEnd:string):Promise<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/${apiUrlEnd}`).toPromise();
  }

  createData(body:IccountryDto,apiUrlEnd:string):Promise<any[]>{
    return this.http.post<any[]>(`${environment.apiUrl}/${apiUrlEnd}`,body).toPromise();
  }

  updateData(code:string,body:IccountryDto,apiUrlEnd:string):Promise<any[]>{
    return this.http.put<any[]>(`${environment.apiUrl}/${apiUrlEnd}/${code}`,body).toPromise();
  }

  deleteData(code:string,apiUrlEnd:string):Promise<any>{
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrlEnd}/${code}`).toPromise();
  }

}
