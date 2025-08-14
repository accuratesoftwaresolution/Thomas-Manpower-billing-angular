import { BranchSelectionService } from '@accurate/branch-selection';
import { ErrorTranslateService } from '@accurate/providers';
import { ActionService, ICTTransactionPageBean, Toast } from '@accurate/toolbar';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Iac3Dto } from 'src/app/_dto/iac3.dto';
import { IadetailDto } from 'src/app/_dto/iadetail.dto';
import { IccurrencyDto } from 'src/app/_dto/iccurrency.dto';
import { IheaderDto } from 'src/app/_dto/iheader.dto';
import { IccurrencyLovDto } from 'src/app/_dto/lov/iccurrency-lov.dto';
import { AccountsService } from 'src/app/_providers/accounts.service';
import { FinanceService } from 'src/app/_providers/finance.service';
import { IccurrencyService } from 'src/app/_providers/iccurrency.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent extends ICTTransactionPageBean {
  /* use All for any keys for take all columns */
  keys = {
    ico: 'coCode,coName,add1,add2,add3,yrSDt,yrEDt,modiCloseDate,baseCurCode,pdcRecAc,pdcPayAc,rateDecPts,amtDecPts,currencyMultiple,multiUnit,dvWiseItemsYn,isArabic',
    idv: 'dvCode,qtyDecPts,dvShrtName,dvName',
    ibr: 'brCode,entrySDt,entryEDt,brName,brShrtName',
    iuser: 'All',
    iint: 'All',
    isetup: 'c:CR_LT_AC_SELECT_MSG:acCode,c:CASH_SALE_AC:acCode,c:ARABIC_<INT_CODE>:acCode,c:VAT_<INT_CODE>:acCode,b:Bank:acCode,b:Bank:bankName,c:BANK_MANDATORY_<INT_CODE>:acCode'
  };

  API_URL = environment.apiUrl;
  showSummeryDetail: boolean = false;
  bankCode: string;
  RepeatHNarration: string = "";
  defaultTitle: string;
  displayPrint: boolean = false;
  pagination: boolean = true;

  constructor(
    protected branchSelection: BranchSelectionService,
    protected actionService: ActionService,
    protected service: FinanceService,
    public accountsService: AccountsService,
    private currencyService: IccurrencyService,
    private _errorTanslateService: ErrorTranslateService,
    private _messageService: MessageService,
    private _ui: UiService,

  ) {
    super(service, branchSelection, actionService);
    actionService.currentComponent = this;
    actionService.headerDto = IheaderDto;
    actionService.detailDto = IadetailDto;
    actionService.detailDtoList = [{ "iadetail": IadetailDto }];
    actionService.detailPropertyName = "iadetail";
  }

  async preCreateInsertRow(): Promise<boolean> {
    if ((!this.service.header.acCode) && (!this.isJv())) {
      this._messageService.add({ severity: 'info', summary: 'Create Insert Row', detail: this._errorTanslateService.translate("pleaseInsertAnyHeaderAccount") });
      return false;
    }

    /**
    * Read Only/ Delete Only checcking.
    */
    if (this.branchSelection.iintValues.readonly === "R") {
      this._messageService.add({ severity: 'info', summary: 'Create Insert Row', detail: this._errorTanslateService.translate("thisInterfacesetasReadOnlyCannotCreateDetailRow") });
      return false;
    } else if (this.branchSelection.iintValues.readonly === "D") {
      this._messageService.add({ severity: 'info', summary: 'Create Insert Row', detail: this._errorTanslateService.translate("thisInterfacesetasDeleteOnlyCannotCreateDetailRow") });
      return false;
    }
    /**
    * Voucher Number Validation
    */
    if (this.service.header.vrNo != null) {
      //Modified by Aswathy on 22-10-2021 to solve the Invalid issue raised by Ajesh
      if (this.service.header.vrNo == 0 && ((this.branchSelection.iintValues.intMode == "S") ||
        (this.branchSelection.iintValues.intMode == 'U' && this.branchSelection.iuserValues.userMode == 'S'))) {
        this._messageService.add({ severity: 'info', summary: 'Create Insert Row', detail: this._errorTanslateService.translate("voucherNumberCannotbeInvalid") });
        return false;
      }
    }
    return true;
  }

  // async preCreateInsert(): Promise<boolean> {
  //   // this.service.header.iadetail = [];
  //   return await super.preCreateInsert()
  // }

  async preSave(): Promise<boolean> {

    const bill = await this.actionService.currentComponent.checkHasBillOrJob(this.service.header.acCode);
    if (bill.bill == 'Y' && (this.service.header.billNo == null || !this.service.header.billNo)) {
      this._messageService.add({ severity: 'info', summary: 'Save Action', detail: this._errorTanslateService.translate("can'tSaveWithoutHeaderBillNo") });
      return false;
    }

    if (bill.bill == 'Y' && (this.service.header.billDate == null || !this.service.header.billDate)) {
      this._messageService.add({ severity: 'info', summary: 'Save Action', detail: this._errorTanslateService.translate("can'tSaveWithoutHeaderBillDate") });
      return false;
    }

    if (this.service.header.iadetail.length <= 0) {
      this._messageService.add({ severity: 'info', summary: 'Save Action', detail: this._errorTanslateService.translate("can'taveWithoutAnyDetailData") });
      return false;
    }


    if (this.branchSelection.iintValues.narrationD === "P") {
      for (let row of this.service.header.iadetail) {
        row.narration = this.service.header.narration
      }
    }

    if (this.branchSelection.iintValues.narrationD === "C") {
      for (let row of this.service.header.iadetail) {
        if (!row.narration || row.narration == "")
          row.narration = this.service.header.narration
      }
    }

    /**
    * Read Only/ Delete Only checking.
    */
    this.service.header.fAcAmt = parseFloat(this._ui.convertDecimal(this.service.header.fAcAmt, 3));
    this.service.header.vrDate = this.actionService.transformDate(this.service.header.vrDate);
    if (this.service.header.refDate)
      this.service.header.refDate = this.actionService.transformDate(this.service.header.refDate);
    if (this.branchSelection.iintValues.readonly === "R") {
      this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("thisInterfaceSetasReadOnlyCannotSave") });
      return false;
    }
    else if (this.branchSelection.iintValues.readonly === "D") {
      this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("thisInterfaceSetasDeleteOnlyCannotSave") });
      return false;
    }
    /**
      * User rights checcking.
      */
    else if (this.branchSelection.iuserValues.verifiedVrEdit === "N" && this.service.header.verified === "Y") {
      this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("verifiedVoucherCannotModifyUnverifyInsufficientuserrights") });
      return false;
    }
    else if (this.branchSelection.iuserValues.canVrEdit === "N" && this.service.header.void === "Y") {
      this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("cancelledVoucherCannotModifyActivateInsufficientuserrights") });
      return false;
    }
    /**
     * Financial year/ VrDate checking.
     */
    else if (this.service.header.vrDate < this.actionService.transformDate(this.branchSelection.icoValues.yrSDt)
      || this.service.header.vrDate > this.actionService.transformDate(this.branchSelection.icoValues.yrEDt)) {
      this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("dateisNotinThisFinancialYear") });
      return false;
    }
    else if (this.service.header.vrDate < this.actionService.transformDate(this.branchSelection.icoValues.modiCloseDate)
    ) {
      this._messageService.add({ severity: 'info', summary: 'Save', detail: ` All Modification Closed Before ${this.branchSelection.icoValues.modiCloseDate}` });
      return false;
    }
    else if (this.service.header.vrDate < this.actionService.transformDate(this.branchSelection.iintValues.intCloseDate)) {
      this._messageService.add({ severity: 'info', summary: 'Save', detail: ` Interface has closed on ${this.branchSelection.iintValues.intCloseDate} for Interface ${this.branchSelection.iintValues.intCode}` });
      return false;
    }
    else if (this.branchSelection.iintValues.overrideDateChk === "N") {
      if (this.service.header.vrDate < this.actionService.transformDate(this.branchSelection.ibrValues.entrySDt)
        || this.service.header.vrDate > this.actionService.transformDate(this.branchSelection.ibrValues.entryEDt)) {
        this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("dateisNotintheEntryAllowedPeriodofthisBranch") });
        return false;
      }
    }
    /**
      * Voucher number checking.
      */
    else if (this.service.header.vrNo != null) {
      if (this.service.header.vrNo === 0 && (this.branchSelection.iintValues.intMode == "S") ||
        (this.branchSelection.iintValues.intMode == 'U' && this.branchSelection.iuserValues.userMode == 'S')) {
        this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("voucherNumberCannotbeInvalid") });
        return false;
      }
    }
    /**
    * Salesman validation.
    */

    if (this.branchSelection.iintValues.salesmanMandatory === "Y" && (this.service.header.salesman === "" || this.service.header.salesman == null)) {
      this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("salesmanCannotbeBlank") });
      return false;
    }

    /**
     * Detail validations.
     */
    for (let i = 0; i < this.service.header.iadetail.length; i++) {
      if (!this.service.header.iadetail[i].acCode.trim()) {
        this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("detailAccountCannotbeBlank") });
        return false;
      }
      else if ((this.service.header.iadetail[i].acAmt == 0 || this.service.header.iadetail[i].acAmt === null) &&
        this.branchSelection.iintValues.intCode.trim() != "ZJV" && this.branchSelection.iintValues.intCode.trim() != "ZJVF") {
        this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("accountAmountCannotbeBlankZero") });
        return false;
      }
      else if (this.service.header.iadetail[i].fAcAmt == 0 && this.branchSelection.iintValues.intCode.trim() != "ZJV"
        && this.branchSelection.iintValues.intCode.trim() != "ZJVF") {
        this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("foreignAccountAmountCannotbeBlankZero") });
        return false;
      }
      else if (!this.isJv()) {
        if ((this.service.header.iadetail[i].chqNo == null || this.service.header.iadetail[i].chqNo.trim() === "") &&
          this.branchSelection.iintValues.chqMandatory === "Y" && this.branchSelection.iintValues.chqNo === "Y") {
          this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("chequeNumberCannotbeBlank") });
          return false;
        }
        else if (!this.service.header.iadetail[i].chqDate && this.branchSelection.iintValues.chqMandatory === "Y"
          && this.branchSelection.iintValues.chqDate === "Y") {
          this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("chequeDateCannotbeBlank") });
          return false;
        }
        else if ((!this.service.header.iadetail[i].chqBank || !this.service.header.iadetail[i].chqBank.trim())
          && this.branchSelection.iintValues.chqMandatory === "Y" && this.branchSelection.iintValues.chqBank === "Y") {
          this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("chequeBankCannotbeBlank") });
          return false;
        }
        //added by aswathy on 22-10-2021 to solve the null issue due to pdc
        if (!this.service.header.iadetail[i].pdc) this.service.header.iadetail[i].pdc = "N";
      }
      const bill = await this.checkHasBillOrJob(this.service.header.iadetail[i].acCode)
      if (bill.bill == 'Y') {
        const total = (this.service.header.iadetail[i].ibill && this.service.header.iadetail[i].ibill.length > 0) ?
          (this.service.header.iadetail[i].ibill.reduce((sum, current) =>
            parseFloat(sum.toString()) + parseFloat((current.acAmt * current.signInt).toString()), 0)) : 0;
        if (total != (this.service.header.iadetail[i].acAmt * this.service.header.iadetail[i].signInt)) {
          this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("mismatchinBillAllocation") });
          return false;
        }
        //modified by Ajith A Pradeep
        //modified for Foreign Bill Allocation (16/12/2021)
        const totalForeignAmt = (this.service.header.iadetail[i].ibill && this.service.header.iadetail[i].ibill.length > 0) ?
          (this.service.header.iadetail[i].ibill.reduce((sum, current) =>
            parseFloat(sum.toString()) + parseFloat((current.fAcAmt * current.signInt).toString()), 0)) : 0;
        if (totalForeignAmt != (this.service.header.iadetail[i].fAcAmt * this.service.header.iadetail[i].signInt)) {
          this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("mismatchinForeignAmountBillAllocation") });
          return false;
        }
      }
    }



    if (this.branchSelection.iintValues.intLogic.trim() == "JV" || this.branchSelection.iintValues.intLogic.trim() === "SCH" || this.branchSelection.iintValues.intLogic.trim() === "JVZ") {

      let total: number = this.getDetailTotal();
      if (total != 0) {
        this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("voucherNotTallied") });
        return false;
      }
    }
    if (!this.isJv()) {
      if (!this.service.header.acCode) {
        this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("headerAccountCannotbeBlank") });
        return false;
      }
      if (this.service.header.bankCode != null && this.service.header.bankCode.trim() != "") {
        this.bankCode = this.service.header.bankCode;
      }
      if (this.branchSelection.icoValues.baseCurCode != this.service.header.curCode) {
        if (this.service.header.fAcAmt === 0) {
          this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("headerForeignCurrencyAmountCannotbeBlank") });
          return false;
        }
      }

      let key: string = "BANK_MANDATORY_" + this.branchSelection.iintValues.intCode.trim();
      if (this.branchSelection.isetupValues[key].length > 0 &&
        (this.branchSelection.isetupValues[key].trim() == "Y" || this.branchSelection.isetupValues[key].trim() == "AC_CODE")
        && !this.service.header.bankCode) {
        this._messageService.add({ severity: 'info', summary: 'Save', detail: this._errorTanslateService.translate("headerBankAccountCannotbeBlank") });
        return false;
      }
      /**
        * Setting Header bankcode to detail Rows..
       */
      if (this.service.header.bankCode) {
        this.service.header.iadetail.forEach(res => {
          res.bankCode = this.service.header.bankCode;
        });
      }

      if (this.service.header.iadetail.length > 1) {
        let flag = 1;
        let chqNo: string = this.service.header.iadetail[0].chqNo;
        let chqDate: Date = this.service.header.iadetail[0].chqDate;
        let chqBank: string = this.service.header.iadetail[0].chqBank;
        this.service.header.iadetail.forEach(res => {
          if (res.chqNo != chqNo || res.chqDate != chqDate || res.chqBank != chqBank) {
            flag = 0;
          }
        });
        //Mofified by Ajith A Pradeep
        //modified for skip summary detail popup for header account with foreign currency(16/12/2021)
        if (flag == 1) {
          if (!this.service.header.summeryDetail) {
            this.service.header.summeryDetail = "S";
            if (this.service.header.curCode == this.branchSelection.icoValues.baseCurCode){
              this.showSummeryDetail = true;
              return false;
            }
            else
              this.showSummeryDetail = false;
          }
        }
      }
    }

    /**
    * Set Default Narration for Header Row based on Interface Admin Setting
    */
    if (this.branchSelection.iintValues.narrationH === "F" && this.service.header.iadetail[0].acCode) {
      //Copy first Ac Name from Detail
      this.service.header.narration = this.service.header.iadetail[0].acName;
    }
    else if (this.branchSelection.iintValues.narrationH === "D") {
      this.service.header.narration = this.branchSelection.iintValues.narrationHDef;
    }
    else if (this.branchSelection.iintValues.narrationH === "R") {
      if (this.service.header.narration) {
        this.RepeatHNarration = this.service.header.narration;
      }
    }

    if (this.service.header.curCode === this.branchSelection.icoValues.baseCurCode)
      this.service.header.fAcAmt = Math.abs(this.service.header.iadetail.reduce((sum, current) => parseFloat(sum.toString()) + parseFloat((current.acAmt * current.signInt).toString()), 0));

    if (!this.SELECTED_FROM_VERIFY)
      this.service.header.verified = this.branchSelection.iintValues.verifyYn;

    return true;
  }

  async preDelete(): Promise<boolean> {
    if (!(await super.preDelete())) return false;
    if (this.branchSelection.iintValues.readonly === "R") {
      this._messageService.add({ severity: 'info', summary: 'Delete', detail: this._errorTanslateService.translate("thisInterfacesetasReadOnlyCannotDelete") });
      return false;
    }
    return true;
  }

  async preDeleteDetailRow(): Promise<boolean> {
    if (!(await super.preDeleteDetailRow())) return false;
    if (this.branchSelection.iintValues.readonly === "R") {
      this._messageService.add({ severity: 'info', summary: 'Delete', detail: this._errorTanslateService.translate("thisInterfacesetasReadOnlyCannotDelete") });
      return false;
    }
    return true;
  }

  async postCreateInsert(): Promise<void> {

    this.service.header.verified = this.branchSelection.iintValues.verifyYn;

    if (!this.isJv() && this.branchSelection.iintValues.acCodeH != null && this.branchSelection.iintValues.acCodeH.trim() != "") {
      // (this.branchSelection.iintValues.acCodeH)
      this.service.header.acCode = this.branchSelection.iintValues.acCodeH;
      this.service.header.acName = await this.accountsService.getAccoutName(this.branchSelection.iintValues.acCodeH);
      if (this.service.header.acCode === "") {
        this._messageService.add({ severity: 'info', summary: 'Create Insert', detail: this._errorTanslateService.translate("defaultAccountnotfoundinHeaderFilterSet") });
      }
    }
    if (!this.service.header.curCode) {
      this.service.header.curCode = this.branchSelection.icoValues.baseCurCode;
      await this.currencyService.getCurrencyDetails(this.branchSelection.icoValues.baseCurCode).then((res: IccurrencyDto) => {
        this.service.header.curRate = res.curRate;
      }, (err) => {
        // console.warn("err==", err.error.messege);
      });
    }
    /**
    * Set Default Narration for HEADER based on Interface Admin Setting
    */
    if (this.branchSelection.iintValues.narrationH === "D") {
      this.service.header.narration = this.branchSelection.iintValues.narrationHDef;
    }
    else if (this.branchSelection.iintValues.narrationH === "R") {
      if (this.RepeatHNarration != null) {
        this.service.header.narration = this.RepeatHNarration;
      }
      if (this.service.header.narration != null) {
        this.RepeatHNarration = this.service.header.narration;
      }
    }
  }

  async postCreateInsertRow(): Promise<void> {
    if (!this.service.header.iadetail[this.getSelectedDetailRowIndex()].vatAmt)
      this.service.header.iadetail[this.getSelectedDetailRowIndex()].vatAmt = 0;
    if (!this.isJv() && this.branchSelection.iintValues.acCodeD != null && this.branchSelection.iintValues.acCodeD.trim()) {
      this.service.header.iadetail[this.getSelectedDetailRowIndex()].acCode = this.branchSelection.iintValues.acCodeD;
      this.service.header.iadetail[this.getSelectedDetailRowIndex()].acName = await this.accountsService.getAccoutName(this.branchSelection.iintValues.acCodeD);

      await this.accountsService.getAccoutName(this.service.header.iadetail[this.getSelectedDetailRowIndex()].acCode);
      if (this.service.header.iadetail[this.getSelectedDetailRowIndex()].acCode == null ||
        this.service.header.iadetail[this.getSelectedDetailRowIndex()].acCode == "") {
        this._messageService.add({ severity: 'info', summary: 'Create Insert', detail: this._errorTanslateService.translate("defaultAccountnotfoundinDetailFilterSet") });
      }

      let accDetails = await this.accountsService.getAccountDetails(this.branchSelection.iintValues.acCodeD);
      this.service.header.iadetail[this.getSelectedDetailRowIndex()].curCode = accDetails[0].curCode;
      this.onCurCodeChange();

    }
    /**
    * Set Default Narration for Detail Rows based on Interface Admin Setting
    */
    if (this.branchSelection.iintValues.narrationD === "D") {
      this.service.header.iadetail[this.getSelectedDetailRowIndex()].narration = this.branchSelection.iintValues.narrationDDef;
    }

    if (!this.isJv()) {
      this.service.header.iadetail[this.getSelectedDetailRowIndex()].chqDate = new Date();
    }

  }

  async postSave(): Promise<void> {
    await super.postSave();

  }

  async rollback(): Promise<void> {
    await this.createInsert();
  }

  onTabChange(event) {
    if (event.index == 0) {
      this.actionService.detailDto = IadetailDto;
      this.actionService.detailPropertyName = "iadetail"
    }
    else if (event.index == 1) {

    }
  }

  getDetailTotal(): number {
    if (this.service.header.iadetail && this.service.header.iadetail.length > 0) {
      const total = this.service.header.iadetail.reduce((sum, current) => parseFloat(sum.toString()) + parseFloat((current.acAmt * current.signInt).toString()), 0);
      return total;
    }
    return 0;
  }

  isJv(): boolean {
    if (this.branchSelection.iintValues.intLogic.trim() === "JV" || this.branchSelection.iintValues.intLogic.trim() === "JVZ"
      || this.branchSelection.iintValues.intLogic.trim() === "SCH") {
      return true;
    }
    return false;
  }

  async checkHasBillOrJob(acCode: string): Promise<Iac3Dto> {
    let ac3Code = acCode.substring(0, 4);
    return await this.accountsService.checkIsBillAccount(ac3Code);
  }


  onCurCodeChange() {
    this.currencyService.getCurrencyDetails(this.service.header.iadetail[this.getSelectedDetailRowIndex()].curCode)
      .then((res: IccurrencyLovDto) => {
        this.service.header.iadetail[this.getSelectedDetailRowIndex()].curRate = res.curRate;
      },
        (err) => {
          // console.warn('---err --', err);
        })
  }


  async print(): Promise<void> {
    if (this.displayPrint) {
      await super.print();
    }
    else {
      this.displayPrint = true;
    }

    this.defaultTitle = this.branchSelection.iintValues.reportTitle;
  }
}


