import { IcoService, MasterService } from '@accurate/providers';
import { ActionService, MenuService } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountsService } from 'src/app/_providers/accounts.service';
import { IbrService } from 'src/app/_providers/ibr.service';
import { IdvService } from 'src/app/_providers/idv.service';
import { IrepparamService } from 'src/app/_providers/irepparam.service';
import { FinanceReportsComponent } from './finance-reports.component';


/*
Created by sruthin
date: 31/12/2021
Ageing report
 */


@Component({
  selector: 'app-ageing-report',
  templateUrl: './finance-reports.component.html',
  styleUrls: ['./finance-reports.component.scss']
})
export class AgeingReportComponent extends FinanceReportsComponent implements OnInit {


  constructor(
    public _menuService: MenuService,
    protected service: IrepparamService,
    public _actionService: ActionService,
    public _icoService: IcoService,
    public _idvService: IdvService,
    public _ibrService: IbrService,
    public _masterService: MasterService,
    public _iac4Services: AccountsService,
    public route: ActivatedRoute
  ) {
    super(_menuService, service, _actionService, _icoService, _idvService, _ibrService, _masterService, _iac4Services, route);
    _actionService.currentComponent = this;
  }

  async ngOnInit(): Promise<void> {
   
    await super.ngOnInit();
  }

  getMenuId() {
    this.menuId = "acc_ageing";
  }

  dataFormatingSession(data) {
    for (let row of data) {
      row["month1Amt"] = null;
      row["month2Amt"] = null;
      row["month3Amt"] = null;
      row["month4Amt"] = null;
      row["month5Amt"] = null;
      row["month6Amt"] = null;
      row["total"] = null;
      if (row.billDate > row.month_upto && row.billDate < row.month2)
      row["month1Amt"] = row.balAmt;
      if (row.billDate > row.month2 && row.billDate < row.month3)
      row["month2Amt"] = row.balAmt;
      if (row.billDate > row.month3 && row.billDate < row.month4)
      row["month3Amt"] = row.balAmt;
      if (row.billDate > row.month4 && row.billDate < row.month5)
      row["month4Amt"] = row.balAmt;
      if (row.billDate > row.month5 && row.billDate < row.month6)
      row["month5Amt"] = row.balAmt;
      if (row.billDate > row.month6)
      row["month6Amt"] = row.balAmt;
      row["total"] = parseFloat(row["month1Amt"] + row["month2Amt"] + row["month3Amt"] + row["month4Amt"] + row["month5Amt"] + row["month6Amt"]);
    }
    return data;
  }
}
