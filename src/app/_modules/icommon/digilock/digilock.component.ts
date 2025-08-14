import { Component, OnInit } from '@angular/core';
import { TblDigiHeadDto } from 'src/app/_dto/tbldigihead.dto';
import { TblDigiUserDto } from 'src/app/_dto/tbldigiuser.dto';
import { SalesService } from 'src/app/_providers/sales.service';

@Component({
  selector: 'app-digilock',
  templateUrl: './digilock.component.html',
  styleUrls: ['./digilock.component.scss']
})
export class DigilockComponent implements OnInit {



  activeState: boolean[] = [false, false, false];

  activeIndex: number = 0;

  display: boolean = false;

  status: string

  selectedCities: string[] = [];

  rights = [
    { hasRight: true, detail: 'Access', hasAction: true },
    { hasRight: true, detail: 'Edit', hasAction: true },
    { hasRight: true, detail: 'Delete', hasAction: true },
    { hasRight: true, detail: 'Print', hasAction: true },
    { hasRight: true, detail: 'Re Print Documents', hasAction: true },
    { hasRight: true, detail: 'Edit Documents Enter by Other Users', hasAction: true },
    { hasRight: true, detail: 'Edit Documents are checked', hasAction: true },
    { hasRight: true, detail: 'Edit Documents are Reconciled', hasAction: true },
    { hasRight: true, detail: 'Edit Documents are Authorized by Higher groups', hasAction: true },
    { hasRight: true, detail: 'Enter Documents Exceed the limit', hasAction: true },
    { hasRight: true, detail: 'Enter Documents Make Cash and Bank Negative', hasAction: true },
    { hasRight: true, detail: 'Edit documents that are re Printed', hasAction: true },
    { hasRight: true, detail: 'Accesses though API', hasAction: true },
    { hasRight: true, detail: 'Always suspend upon saving', hasAction: true },
    { hasRight: true, detail: 'Change Print Layouts', hasAction: true },
    { hasRight: true, detail: 'Print Un authorized documents', hasAction: true },
    { hasRight: true, detail: 'Access to link Report', hasAction: true },
    { hasRight: true, detail: 'Make Cheque Void', hasAction: true },
    { hasRight: true, detail: 'Close Link', hasAction: true },
    { hasRight: true, detail: 'Access documents entered by other user', hasAction: true }
  ];

  tblDigiHead: TblDigiHeadDto = new TblDigiHeadDto()


  constructor(public salesService: SalesService) { }

  ngOnInit(): void {
    this.tblDigiHead = new TblDigiHeadDto()
  }

}
