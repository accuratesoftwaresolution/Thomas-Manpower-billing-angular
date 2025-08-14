import { SelectItem } from '@accurate/dto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IintService {

  iintobjectLovData: SelectItem[] = [];
  userModeLovData: SelectItem[] = [];
  currencyFilterLovData: SelectItem[] = [];
  iac4LovData: SelectItem[] = [];
  drCrLovData: SelectItem[] = [];
  yesNoList: SelectItem[] = [];
  accountVisibleLovData: SelectItem[] = [];
  iintlogicLovData: SelectItem[] = [];
  printControlLovData: SelectItem[] = [];
  inventoryCostLovData: SelectItem[] = [];
  inventorySignLovData: SelectItem[] = [];
  readOrDeleteLovData: SelectItem[] = [];
  
  mainService: any;

  constructor() { }
}
