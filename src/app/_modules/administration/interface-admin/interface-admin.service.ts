import { LangaugeTranslateService, MasterService } from '@accurate/providers';
import { Injectable } from '@angular/core';
import { IintacconfigDto } from 'src/app/_dto/iintacconfig.dto';

@Injectable({
  providedIn: 'root'
})
export class InterfaceAdminService {

  isUpdate: boolean = true;
  accDetails: IintacconfigDto[];
  rptDetails: IintacconfigDto[];
  deletedDetailRows: any[] = [];
  rptDeletedDetailRows: any[] = [];
  selectedDetailRow: any;
  constructor(
  ) { }
}
