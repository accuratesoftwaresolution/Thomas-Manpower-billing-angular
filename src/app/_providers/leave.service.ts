import { MasterService } from '@accurate/providers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { leaveEntryDto } from '../_dto/leaveentry.dto';
import { apiUrl } from '../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor( private _mastereService:MasterService,
               private http:HttpClient) { }

 async getAllData(apiEndUrl:string): Promise<any> {
  return await this.http.get<any>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
}


 async updateData(body:any,id:any): Promise<leaveEntryDto[]> {
  return await this.http.put<leaveEntryDto[]>(`${environment.apiUrl}/${apiUrl.apleaveentry}/${id}`,body).toPromise();
   }
              

async save(body: any): Promise<leaveEntryDto> {
  return this.http.post<leaveEntryDto>(`${environment.apiUrl}/${apiUrl.apleaveentry}`,body).toPromise();
}

async post(body: any): Promise<leaveEntryDto> {
  return this.http.post<leaveEntryDto>(`${environment.apiUrl}/${apiUrl.apleaveentryavailed}`,body).toPromise();
}

async postData(body: any): Promise<leaveEntryDto> {
  return this.http.post<leaveEntryDto>(`${environment.apiUrl}/${apiUrl.apleaveentryeligible}`,body).toPromise();
}

async delete(apiEndUrl:string):Promise<any>{
  return this.http.delete<any>(`${environment.apiUrl}/${apiEndUrl}`).toPromise();
}
}
