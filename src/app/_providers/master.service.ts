import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { apiUrl } from '../_resources/api-url.properties';


@Injectable({
  providedIn: 'root'
})
export class MasterService {

  loading: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }



  getFileFromApi(gridNo: number, fileName: string): Promise<Blob> {
    const encodedFileName = encodeURIComponent(fileName);
    const url = `${apiUrl.apiUrl}/${apiUrl.mastersDocumentUpload}/${gridNo}/${encodedFileName}`;

    return this.http
      .get(url, { responseType: 'blob' })
      .toPromise();
  }


    getTransFileFromApi(gridNo: number, fileName: string): Promise<Blob> {
    const encodedFileName = encodeURIComponent(fileName);
    const url = `${environment.apiUrl}/${apiUrl.transactionDocumentUpload}/${gridNo}/${encodedFileName}`;

    return this.http
      .get(url, { responseType: 'blob' })
      .toPromise();
  }

  async getMasterData(apiUrl, filter?: string): Promise<any> {
    if (!filter)
      filter = ''
    return await this.http.get<any>(`${environment.apiUrl}/${apiUrl}${filter}`).toPromise();
  }

  async getMasterDatabyId(apiUrl, id): Promise<any> {
    return await this.http.get<any>(`${environment.apiUrl}/${apiUrl}/${id}`).toPromise();
  }

  async saveMasterData(apiUrl, body): Promise<any> {
    return await this.http.post<any>(`${environment.apiUrl}/${apiUrl}`, body).toPromise();
  }

  async saveAllMasterData(apiUrl, body): Promise<any[]> {
    return await this.http.post<any[]>(`${environment.apiUrl}/${apiUrl}`, body).toPromise();
  }

  async updateMasterData(apiUrl, body, id): Promise<any> {
    return await this.http.put<any>(`${environment.apiUrl}/${apiUrl}/${id}`, body).toPromise();
  }

  async deleteMasterData(apiUrl, id): Promise<any[]> {
    return await this.http.delete<any>(`${environment.apiUrl}/${apiUrl}/${id}`).toPromise();
  }

  async deleteData(apiUrl, id): Promise<any> {
    return await this.http.delete<any>(`${environment.apiUrl}/${apiUrl}/${id}`).toPromise();
  }

    async deleteFile(apiUrl): Promise<any> {
    return await this.http.delete<any>(`${environment.apiUrl}/${apiUrl}`).toPromise();
  }

  async saveImage(apiUrl, body): Promise<any> {
    return await this.http.post<any>(`${environment.apiUrl}/${apiUrl}`, body).toPromise();
  }

  async saveImagelogo(apiUrl: string, body: FormData): Promise<any> {
  return await this.http.post<any>(`${environment.apiUrl}/${apiUrl}`, body).toPromise();
}


 

  async getImg(apiUrlEnd: string, imagePath: string) {
    return await this.http.get(`${environment.apiUrl}/${apiUrlEnd}/${imagePath}`, { responseType: 'blob' }).toPromise();
  }

  async getJsonData(name: string): Promise<any> {
    if (!name || name.trim() == "") return {};
    return await this.http.get(`assets/i18n/json/${name}.json`).toPromise();
  }


}
