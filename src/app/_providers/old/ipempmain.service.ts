import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';
import { IpempmainLovDto } from '../../_dto/lov/ipempmain-lov.dto';

/*
    Created By  : Arun Joy
    Created On  : 10-01-2020
    Created For : For handling the employee CRUD opertaion using API.
*/

@Injectable({
  providedIn: 'root'
})
export class OldIpempmainService {

   constructor(private http: HttpClient) { }

   async  getEmpLovDetails():Promise<IpempmainLovDto[]>{
    return await this.http.get<IpempmainLovDto[]>(`${environment.apiUrl}/${apiUrl.employeeLov}`).toPromise();
  }
}

