import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/*
    Created By  : Arun Joy
    Created On  : 14-03-2020
    Created For : For handling the virtual scroll popup.
*/

@Injectable({
  providedIn: 'root'
})
export class OldPopUpScrollService {

  constructor(
    private http: HttpClient
  ) { }

  getPopUpData(apiEndUrl:string,filter:any,limit:number, offset:number): Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${apiEndUrl}?${filter}&where[limit]=${limit}&where[offset]=${offset}`).toPromise();
  }
}
