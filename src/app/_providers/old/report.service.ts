import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportParamDto } from '../../_dto/other/report-param.dto';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../../_resources/api-url.properties';
// import { saveAs as importedSaveAs } from "file-saver";

/*
    Created By  : Arun Joy
    Created On  : 10-03-2020
    Created For : For handling the Voucher Print reports of all transactions.
*/

@Injectable({
  providedIn: 'root'
})
export class OldReportService {

  constructor(
    private http: HttpClient
  ) { }

  async print(params: ReportParamDto): Promise<any> {
    return await this.http.post(`${environment.apiUrl}/${apiUrl.vrPrintReports}`, params , { responseType: 'blob' }).toPromise();
    // this.http.post(`${environment.apiUrl}/report`, params , { responseType: 'blob' })
    //   .subscribe(blob => {
    //     importedSaveAs(blob, "filename."+params.type);
    //   });
  }

  /* To Open in another URL */
  //   async print(): Promise<any> {
  //   // return await this.http.get(`${environment.apiUrl}/report`,{ observe: 'response' }).toPromise();
  //   this.http.post(`${environment.apiUrl}/report`, {}, { responseType: 'blob' })
  //     .subscribe(data => {
  //       const blob = new Blob([data], { type: 'application/csv' });
  //       window.open(window.URL.createObjectURL(blob));
  //     })
  // }

}
