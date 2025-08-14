import { Injectable } from '@angular/core';
import { IiitemDto } from '../_dto/iiitem.dto';
import { AiitemunitDto } from '../_dto/aiitemunit.dto';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  header: IiitemDto;
  deletedDetailRows: AiitemunitDto[] = [];
  //selectedDetailRow: AidetailDto;
  constructor() { }
}
