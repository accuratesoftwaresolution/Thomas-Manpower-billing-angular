import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OldCommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class OldIsetupService extends OldCommonService {

  constructor(
    private http1: HttpClient
  ) {
    super(http1);
  }

  getData(apiUrlEnd: string): Promise<any[]> {
    return this.http1.get<any[]>(`${environment.apiUrl}/${apiUrlEnd}?where[purpose]=CASH/BANK`).toPromise();
  }

}
