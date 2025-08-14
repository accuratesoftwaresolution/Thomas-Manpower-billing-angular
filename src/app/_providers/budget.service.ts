import { IcoService } from '@accurate/providers';
import { IctTransactionServiceInterface } from '@accurate/toolbar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { anyKeysRemoved } from '@fullcalendar/core/util/object-similarity';
import { environment } from 'src/environments/environment';
import { IabudgetDto } from '../_dto/budgect.dto';
import { apiUrl } from '../_resources/api-url.properties';

@Injectable({
  providedIn: 'root'
})
export class BudgetService implements IctTransactionServiceInterface {
  // 
  // constructor() { }

  header: IabudgetDto;
  deletedDetailRows: IabudgetDto[] = [];
  selectedDetailRow: IabudgetDto;

  rateDecPts: number;
  amtDecPts: number;
  constructor(
    private http: HttpClient,
    private _icoService: IcoService,
  ) {
    this.rateDecPts = this._icoService.currentCompanyDetails.rateDecPts ? this._icoService.currentCompanyDetails.rateDecPts : 0;
    this.amtDecPts = this._icoService.currentCompanyDetails.amtDecPts ? this._icoService.currentCompanyDetails.amtDecPts : 0;

  }

  search(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<any> {
    return;
  }

  searchList(coCode: string, dvCode: string, brCode: string, intCode: string, isFromVerify?: boolean): Promise<any[]> {
    return;
  }

  async save(body: IabudgetDto[]): Promise<any> {
    return await this.http.post<IabudgetDto[]>(`${environment.apiUrl}/${apiUrl.budgetallocation}`, body).toPromise();
  }

  delete(coCode: string, dvCode: string, brCode: string, intCode: string, vrNo: number): Promise<any> {
    return;
  }


}
