import { Injectable } from '@angular/core';
import { OldCommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OldCrLimitChangeService  extends OldCommonService {

  constructor(
    private http1: HttpClient
  ) {
    super(http1);

  }
  getData(apiUrlEnd: string): Promise<any[]> {
    return this.http1.get<any[]>(`${environment.apiUrl}/${apiUrlEnd}?where[slYn]=C`).toPromise();
  }
}
