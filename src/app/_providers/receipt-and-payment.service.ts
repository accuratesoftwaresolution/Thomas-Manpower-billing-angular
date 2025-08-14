import { Injectable } from '@angular/core';
import { TblTransHeadDto } from '../_dto/tbltranshead.dto';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../_resources/api-url.properties';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceiptAndPaymentService {

    receiptPaymentData: TblTransHeadDto = new TblTransHeadDto();
  
    selectedDetailRows: any[] = [];
  
    selectedPopUp : any
  
    detailsData:any

  constructor(    private http: HttpClient,
  ) { }


  async getMasterData(apiEndUrl: string): Promise<any> {
      return await this.http.get<any>(`${environment.ApiUrl}/${apiEndUrl}`).toPromise();
    }
  
    async getMasterDatabyId(apiEndUrl: any, id: any): Promise<any> {
      return await this.http.get<any>(`${environment.ApiUrl}/${apiEndUrl}/${id}`).toPromise();
    }
  
  
    async Save(body: TblTransHeadDto): Promise<TblTransHeadDto> {
      return await this.http.post<TblTransHeadDto>(`${environment.ApiUrl}/${apiUrl.finance}`, body).toPromise();
    }
  
    async updateMasterData(apiEndUrl: any, body: any, id: any): Promise<any> {
      return await this.http.put<any>(`${environment.ApiUrl}/${apiEndUrl}/${id}`, body).toPromise();
    }
    async deleteMasterData(apiEndUrl: any, id: any): Promise<any[]> {
      return await this.http.delete<any>(`${environment.ApiUrl}/${apiEndUrl}/${id}`).toPromise();
    }
    async deleteMasterDataById(apiEndUrl: any, body: any, id: any): Promise<any> {
      return await this.http.delete<any>(`${environment.ApiUrl}/${apiEndUrl}/${id}`, body).toPromise();
    }
    async deleteDataById(apiEndUrl: string, id: any, headers?: HttpHeaders): Promise<any> {
      const options = headers ? { headers } : {};
      return await this.http.delete<any>(`${environment.ApiUrl}/${apiEndUrl}/${id}`, options).toPromise();
    }
}
