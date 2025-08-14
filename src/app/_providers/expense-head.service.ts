import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IaexpgroupDto } from '../_dto/iaexpgroup.dto';
import { IaexpheadDto } from '../_dto/iaexphead.dto';
import { apiUrl } from '../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class ExpenseHeadService {

  constructor(
    private http: HttpClient
  ) { }

  getLevel1(): Promise<IaexpgroupDto[]> {
    return this.http.get<IaexpgroupDto[]>(`${environment.apiUrl}/${apiUrl.iaexpgroup}`).toPromise();
  }

  getLevel2(groupCode: string): Promise<IaexpheadDto[]> {
    return this.http.get<IaexpheadDto[]>(`${environment.apiUrl}/${apiUrl.iaexphead}?where[groupCode]=${groupCode}`).toPromise();
  }
}
