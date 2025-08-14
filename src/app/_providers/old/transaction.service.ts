import { Injectable } from '@angular/core';
// import { IctTransactionServiceInterface } from '../../_modules/dashboard/framework/interface/ict-transaction-service.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OldTransactionService {
// implements IctTransactionServiceInterface

  header: any;
  deletedDetailRows:any[]=[];
  selectedDetailRow: any;

  constructor(
    private http: HttpClient
  ) { }

  search(coCode:string,dvCode: string,brCode: string,intCode: string,vrNo:number,apiUrlEnd:string): Promise<any>{
    return this.http.get<any>(`${environment.apiUrl}/${apiUrlEnd}/search?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }

  searchList(coCode:string,dvCode: string,brCode: string,intCode: string,apiUrlEnd:string): Promise<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/${apiUrlEnd}/search-list?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}`).toPromise();
  }

  save(body:any,apiUrlEnd:string):Promise<any>{
    return this.http.post<any>(`${environment.apiUrl}/${apiUrlEnd}`,body).toPromise();
  }

  delete(coCode: string,dvCode: string,brCode: string,intCode: string,vrNo: number,apiUrlEnd:string):Promise<any>{
    return this.http.delete<any>(`${environment.apiUrl}/${apiUrlEnd}?where[coCode]=${coCode}&where[dvCode]=${dvCode}&where[brCode]=${brCode}&where[intCode]=${intCode}&where[vrNo]=${vrNo}`).toPromise();
  }
}
