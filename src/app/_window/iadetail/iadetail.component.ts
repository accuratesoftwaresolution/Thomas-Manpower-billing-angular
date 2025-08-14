import { BranchSelectionService } from '@accurate/branch-selection';
import { ErrorTranslateService } from '@accurate/providers';
import { ActionService, MenuService, Toast } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Iac3Dto } from 'src/app/_dto/iac3.dto';
import { Iac4Dto } from 'src/app/_dto/iac4.dto';
import { IadetailDto } from 'src/app/_dto/iadetail.dto';
import { IbrDto } from 'src/app/_dto/ibr.dto';
import { IccurrencyDto } from 'src/app/_dto/iccurrency.dto';
import { LovDto } from 'src/app/_dto/lov/lov.dto';
import { AccountsService } from 'src/app/_providers/accounts.service';
import { IbrService } from 'src/app/_providers/ibr.service';
import { IccurrencyService } from 'src/app/_providers/iccurrency.service';
import { AccountsComponent } from '../accounts/accounts.component';


/*
    Created By   : Arun Joy
    Created On   : 20-01-2020
    RCreated For : For Using the iadetail for inventory and finance (resubale component).
*/

@Component({
  selector: 'app-iadetail',
  templateUrl: './iadetail.component.html',
  styleUrls: ['./iadetail.component.scss']
})
export class IadetailComponent implements OnInit {

  columns: { field: string; header: string; width: string, sort?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];
  brLovData: LovDto[];
  drCrLovData: LovDto[] = [
    // { label: 'Dr', value: 1 },
    // { label: 'Cr', value: -1 },
    { label: 'Dr', value: "1" },
    { label: 'Cr', value: "-1" },
  ];
  selectedDetailRow: IadetailDto;

  service = this.actionService.currentComponent.service;

  hasBill: boolean = false;
  hasCheque: boolean = false;
  totalAmountSign: number = this.branchSelection.iintValues.drCr;
  icoData: any;
  signIntDisable: boolean = false;

  constructor(
    public actionService: ActionService,
    private ibrService: IbrService,
    private accountsService: AccountsService,
    private branchSelection: BranchSelectionService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private currencyService: IccurrencyService,
    private _messageService: MessageService,
    private _errorTanslateService: ErrorTranslateService,
    private menu: MenuService
  ) { }

  ngOnInit() {
    this.initialize();
    if (this.branchSelection.iintValues.editDrCr == "N")
      this.signIntDisable = true;
  }
  // modified by Ajith A Pradeep
  // modified for detail button visibility using menu rights
  // modified on 16/12/2021

  isDeleteRow(): boolean {
    return this.isRightsGiven("R")
  }

  isCreateInsertRow(): boolean {
    return (this.isRightsGiven('C') && this.isRightsGiven("M"));
  }

  isRightsGiven(right: string): boolean {
    let rightsGiven: string = this.menu.selectedMenu?.rightsGiven ? this.menu.selectedMenu.rightsGiven : "";
    if (rightsGiven.indexOf(right) >= 0)
      return true;
    else
      return false;
  }

  onAccountSelection(rowIndex: number, rowData: any) {
    const ref = this.dialogService.open(AccountsComponent, {
      header: 'Choose an Account',
      width: '70%',
      contentStyle: { "max-height": "450px", "overflow": "auto" }
    });

    ref.onClose.subscribe((account: Iac4Dto) => {
      if (account) {
        delete this.service.header.iadetail[rowIndex].ibill
        this.service.header.iadetail[rowIndex].acCode = account.acCode;
        this.service.header.iadetail[rowIndex].acName = account.acName;
        this.service.header.iadetail[rowIndex].curCode = account.curCode;
        this.currencyService.getCurrencyDetails(account.curCode).then((res: IccurrencyDto) => {
          this.service.header.iadetail[rowIndex].curRate = res.curRate;
          // this.service.header.iadetail.signInt=parseFloat(this.service.header.iadetail.signInt)
        }, (err) => {
          // console.warn("err==", err.error.messege);
        });
      }
      this.changeDetailAmt(rowIndex)
    });

  }

  async allocateBill() {
    this.hasBill = false;
    if (!this.service.selectedDetailRow) {
      this._messageService.add({ severity: 'info', summary: 'Bill', detail: this._errorTanslateService.translate("PleaseSelectAnyRow") });
      return
    };
    if (this.service.selectedDetailRow.bill && this.service.selectedDetailRow.bill == 'N') {
      await this._messageService.add({ severity: 'info', summary: 'Bill', detail: this._errorTanslateService.translate("AccounthasNoBill") });
      return
    };
    //modified by Ajith
    //modified for acamount validation not needed for ZJV (14/12/2021)
    if ((this.service.selectedDetailRow.acAmt == 0 || this.service.selectedDetailRow.acAmt == '0') && this.branchSelection.iintValues.intCode.trim() != "ZJV"
      && this.branchSelection.iintValues.intCode.trim() != "ZJVF") {
      await this._messageService.add({ severity: 'info', summary: 'Bill', detail: this._errorTanslateService.translate("AccountAcAmountNotNull") });
      return
    };
    if (this.service.selectedDetailRow.bill == 'Y') {
      // if (this.service.selectedDetailRow.bill == 'Y' && this.service.selectedDetailRow.acAmt!='0') {
      this.hasBill = true;
    }
    else {
      await this.checkHasBill(this.service.selectedDetailRow);
      this.allocateBill();
    }
  }

  async allocateCheque() {
    if (this.service.header.iadetail.length <= 0 || this.service.header.intCode == 'CPV' || this.service.header.intCode == 'CR' || this.service.header.intCode == 'CPV') {
      return;
    }
    this.hasCheque = true;
  }

  changeDetailAmt(idx?: number) {
    let row: IadetailDto = this.service.header.iadetail[idx];
    if (row.curCode.trim() == this.icoData.baseCurCode.trim()) {
      row.fAcAmt = row.acAmt;
    }
  }

  async checkHasBill(selectedRow: IadetailDto) {
    let ac3Code = selectedRow.acCode.substring(0, 4);
    let idx = this.service.header.iadetail.indexOf(selectedRow);
    await this.accountsService.checkIsBillAccount(ac3Code).then((res: Iac3Dto) => {
      this.service.header.iadetail[idx].bill = res.bill;
    }, (err) => {
      this.service.selectedDetailRow.bill = "N";
      // console.warn("--- error ===", err);
    });
  }

  getBranchLov() {
    this.ibrService.getBrWithRights().then((res: IbrDto[]) => {
      this.brLovData = [];
      res.forEach(row => { this.brLovData.push({ label: row.brCode, value: row.brCode }) });
    }, (err) => {
      // console.warn('--- err in branch lov--', err);
    });
  }

  initialize() {
    this.getBranchLov();
    this.columns = [
      { field: 'interBrCode', header: 'Br.', width: '3em', disableAfterSave: true },
      { field: 'acCode', header: 'Account', width: '8em' },
      { field: 'acName', header: 'Account Name', width: '15em' },
      { field: 'narration', header: 'Narration', width: '15em' },
      { field: 'acAmt', header: 'Amount', width: '5em' },
      { field: 'signInt', header: '#', width: '5em' },
      { field: 'curRate', header: 'Cur. Rate', width: '5em' },
      { field: 'fAcAmt', header: 'FC Amount', width: '5em' },
      { field: 'hAcCode', header: 'H Account', width: '5em' },
      { field: 'pdc', header: 'PDC', width: '3em' },
      { field: 'srNo', header: 'Sr. No', width: '3em' },
      { field: 'chqDate', header: 'CHQ Date', width: '5em' },
      { field: 'chqNo', header: 'CHQ No', width: '5em' },
      { field: 'chqBank', header: 'CHQ Bank', width: '5em' },
      { field: 'clearedDate', header: 'Cleared Date', width: '5em' },
      { field: 'bReco', header: 'Reconciled', width: '5em' },
      { field: 'bRecoDate', header: 'Reco. Date', width: '5em' },
      { field: 'cancel', header: 'Cancel', width: '3em' },
      { field: 'sysuser', header: 'Sys User', width: '4em' },
      { field: 'sysdate', header: 'Sys Date', width: '5em' },
      { field: 'modiuser', header: 'Modi User', width: '4em' },
      { field: 'modidate', header: 'Modi Date', width: '5em' },
      { field: 'refCo', header: 'Ref CO', width: '3em' },
      { field: 'refDv', header: 'Ref DV', width: '3em' },
      { field: 'refBr', header: 'Ref BR', width: '3em' },
      { field: 'refInt', header: 'Ref INT', width: '3em' },
      { field: 'refVrNo', header: 'Ref VRNO', width: '4em' },
      { field: 'refSrNo', header: 'Ref SRNO', width: '4em' },
    ];

    // this.accountsService.getCompanyDetails().then(data => {
    //   this.icoData = data;
    // }, (err) => {
    //   // console.warn('===err===', err.error.message);
    // });
  }

  getTotalAmount(): number {
    if (this.service.header.iadetail && this.service.header.iadetail.length > 0) {
      const total = this.service.header.iadetail.reduce((sum, current) => parseFloat(sum.toString()) + parseFloat((current.acAmt * current.signInt).toString()), 0);
      if (total < 0)
        this.totalAmountSign = -1;
      else
        this.totalAmountSign = 1;
      return Math.abs(total);
    }
    this.totalAmountSign = this.branchSelection.iintValues.drCr;
    return 0;
  }

  isDisable(rowIndex: number): boolean {
    if (this.service.header.iadetail[rowIndex].acCode) {
      if (this.service.header.iadetail[rowIndex].curCode != this.branchSelection.icoValues.baseCurCode) {
        return false;
      }
    }
    return true;
  }

}
