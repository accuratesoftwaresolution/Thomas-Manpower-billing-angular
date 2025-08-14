import { BranchSelectionService } from '@accurate/branch-selection';
import { ErrorTranslateService } from '@accurate/providers';
import { ActionService, Toast } from '@accurate/toolbar';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { IbrDto } from 'src/app/_dto/ibr.dto';
import { IcsalesmanDto } from 'src/app/_dto/icsalesman.dto';
import { IidetailDto } from 'src/app/_dto/iidetail.dto';
import { Iac4LovDto } from 'src/app/_dto/lov/iac4-lov.dto';
import { IccurrencyLovDto } from 'src/app/_dto/lov/iccurrency-lov.dto';
import { AccountsService } from 'src/app/_providers/accounts.service';
import { FinanceService } from 'src/app/_providers/finance.service';
import { IbrService } from 'src/app/_providers/ibr.service';
import { IccurrencyService } from 'src/app/_providers/iccurrency.service';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';

@Component({
  selector: 'app-iheader',
  templateUrl: './iheader.component.html',
  styleUrls: ['./iheader.component.scss']
})
export class IheaderComponent implements OnInit {

  @ViewChild(OverlayPanel, { static: false }) op1: OverlayPanel;
  @Input('screen') screen: string;

  service = this.actionService.currentComponent.service;
  bankAccount: { acCode: string; acName: string; }[];
  key: string;
  constructor(
    // public service: FinanceService,
    public iccurrencyService: IccurrencyService,
    public accountsService: AccountsService,
    public branchSelection: BranchSelectionService,
    public branchService: IbrService,
    public actionService: ActionService,
    public popUpService: PopUpLovService,
    private _messageService: MessageService,
    private _errorTanslateService: ErrorTranslateService,
    public financeService: FinanceService
  ) { }

  ngOnInit() {
    this.initializeLov();
    // console.log("=========branchSelection.iintValues.intMode=========", this.branchSelection.iintValues.intMode);
    // console.log("=========branchSelection.iuserValues.userMode=========", this.branchSelection.iuserValues.userMode);
    // console.log("===============service.header.vrNo==================", this.service.header.vrNo)
    this.key = "BANK_MANDATORY_" + this.branchSelection.iintValues.intCode.trim();

  }

  iac4LovData: Iac4LovDto[];
  iac4LovSelected: Iac4LovDto;
  icsalesmanLovData: IcsalesmanDto[] = [];
  ibrLovData: IbrDto[];

  iac4LovCols = [
    { field: 'acCode', header: 'Ac Code' },
    { field: 'acName', header: 'AC NAME' },
  ];

  icsalesmanLovCols = [
    { field: 'code', header: 'Code', width: '50%' },
    { field: 'name', header: 'Name ', width: '50%' }
  ];

  bankcodeLovCols = [
    { field: 'acCode', header: 'Account', width: '50%' },
    { field: 'acName', header: 'Account Name  ', width: '50%' }
  ];

  ibrLovCols = [
    { field: 'brCode', header: 'Branch', width: '20%' },
    { field: 'brName', header: 'Branch Name  ', width: '50%' },
    { field: 'brShrtName', header: 'Branch Short Name  ', width: '30%' }

  ];

  initializeLov() {
    this.accountsService.getHeaderAccountLovWithRights(this.branchSelection.iintValues.intCode).then((res) => {
      this.iac4LovData = res;
    }, (err) => {
    });

    this.branchService.getIbrLov().then(data => {
      this.ibrLovData = data
    });

    // this.popUpService.getSalesmanLov().then(data => {
    this.popUpService.getSalesmanLovActive().then(data => {
      this.icsalesmanLovData = data.data
    }, (err) => {
      // console.log("==errr===", err.error.message);
    });

    this.getBankAccount()
  }

  async onRowSelectIac4(event) {
    // let G_TOTAL:number = this.service.header.iadetail.reduce((prev,curr)=>{
    //   return prev+curr.acAmt;
    // },0);
    const bill = this.screen == 'inv' ? "" : await this.actionService.currentComponent.checkHasBillOrJob(this.iac4LovSelected.acCode);
    const expense: boolean = this.checkHasExpense(this.iac4LovSelected);
    if (this.screen == 'inv' || this.branchSelection.iintValues.intLogic == "OIN" || (bill.bill === 'N' && bill.job === 'N' && !expense)) {
      this.service.header.acCode = this.iac4LovSelected.acCode;
      this.service.header.acName = this.iac4LovSelected.acName;
      this.service.header.curCode = this.iac4LovSelected.curCode;
    } else {
      this._messageService.add({ severity: 'info', summary: 'Account', detail: `Do not Select this account with ${bill.bill === 'Y' ? "Bill" : (bill.job === "Y" ? "Job" : "Expense")}  wise Indicator in Header ` });
      this.service.header.acCode = "";
      this.service.header.acName = "";
      this.service.header.curCode = this.branchSelection.icoValues.baseCurCode;
    }
    this.onAcCodeChange(this.iac4LovSelected.acCode);
    this.onCurCodeChange();
    this.op1.hide();
  }

  onCurCodeChange() {
    this.iccurrencyService.getCurrencyDetails(this.service.header.curCode)
      .then((res: IccurrencyLovDto) => {
        this.service.header.curRate = res.curRate;
      },
        (err) => {
          // console.log('---err --', err);
        })
  }

  onHeaderDiscount(flag: string) {
    let detailTotAmt = 0;
    if ((!this.service.header.iidetail) || (this.service.header.iidetail && this.service.header.iidetail.length <= 0))
      return;
    detailTotAmt = this.service.header.iidetail.reduce((sum, current) => parseFloat(sum.toString()) + parseFloat((current.itemQty * current.baseRate).toString()), 0);

    if (flag === 'P') {
      if (this.service.header.discPer > 100) {
        this._messageService.add({ severity: 'info', summary: 'Header Discount', detail: this._errorTanslateService.translate("cannotGiveMoreThan100%Discount") });
        return false;
      }
      else {
        this.service.header.discAmt = detailTotAmt * this.service.header.discPer / 100;
      }
    }
    else this.service.header.discPer = this.service.header.discAmt * 100 / detailTotAmt;

    this.service.header.iidetail.forEach((row: IidetailDto) => {
      row.disPer = this.service.header.discPer;
      row.disAmt = (row.itemQty * row.baseRate) * row.disPer / 100;
    });
  }

  async onAcCodeChange(acCode: string) {
    if (this.screen == 'fin' && acCode != "") {
      let key: string = "BANK_MANDATORY_" + this.branchSelection.iintValues.intCode.trim();
      const setUp = this.branchSelection.isetupValues["Bank"];
      if (this.branchSelection.isetupValues[key].length > 0 && this.branchSelection.isetupValues[key].trim() == "AC_CODE" && setUp.some(item => item.acCode == acCode)) {
        this.service.header.bankCode = acCode;
      }
    }
  }

  async onSalesmanLov() {
    const ref = this.actionService.showPopUp(this.icsalesmanLovData, this.icsalesmanLovCols);
    ref.onClose.subscribe((selectedRow: IcsalesmanDto) => {
      if (selectedRow) {
        this.service.header.salesman = selectedRow.code;
      }
    });
  }

  async onBranchLov() {

    const ref = this.actionService.showPopUp(this.ibrLovData, this.ibrLovCols);
    ref.onClose.subscribe((selectedRow: IbrDto) => {
      if (selectedRow) {
        this.service.header.transferBr = selectedRow.brCode;
        this.service.header.transferBrShtName = selectedRow.brShrtName;
        this.service.header.transferBrName = selectedRow.brName;
      }
    });
  }

  onBankcodeLov() {
    const ref = this.actionService.showPopUp(this.bankAccount, this.bankcodeLovCols);
    ref.onClose.subscribe((selectedRow: Iac4LovDto) => {
      if (selectedRow) {
        this.service.header.bankCode = selectedRow.acCode;
      }
    });
  }

  getBankAccount(): { acCode: string, acName: string }[] {
    let bankAc: { acCode: string, acName: string }[] = [];
    const setUp = this.branchSelection.isetupValues["Bank"];
    if (setUp && setUp.length > 1) {
      setUp.forEach(async (res: { shortName: string, acCode: string, bankName: string }) => {
        bankAc.push({ acCode: res.acCode, acName: res.bankName })
      });
    }
    this.bankAccount = bankAc;
    return bankAc;
  }

  isDisable(): boolean {
    if (this.branchSelection.icoValues.baseCurCode === this.service.header.curCode) {
      return true;
    }
    return false;
  }

  checkHasExpense(account) {
    if (account.expGrpCode != null && account.expGrpCode.trim() !== "" && account.expGrpCode)
      return true;
    return false;
  }

  isOin(): boolean {
    if (this.branchSelection.iintValues.intLogic.trim() === "OIN") {
      return true;
    }
    return false;
  }

  isTro(): boolean {
    if (this.branchSelection.iintValues.intCode.trim() === "TRO") {
      return true;
    }
    return false;
  }

  isTri(): boolean {
    if (this.branchSelection.iintValues.intCode.trim() === "TRI") {
      return true;
    }
    return false;
  }
}
