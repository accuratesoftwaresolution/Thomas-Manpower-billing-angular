import { BranchSelectionService } from '@accurate/branch-selection';
import { SelectItem } from '@accurate/dto';
import { ErrorTranslateService, MasterService } from '@accurate/providers';
import { ActionService, ICTFormPageBean, ICTTransactionPageBean } from '@accurate/toolbar';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IabudgetDto } from 'src/app/_dto/budgect.dto';
import { Iac4Dto } from 'src/app/_dto/iac4.dto';
import { BudgetService } from 'src/app/_providers/budget.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.scss']
})
export class AllocationComponent extends ICTFormPageBean implements OnInit {

  API_URL = environment.apiUrl;

  keyInfo: any = {
    coCode: '',
    dvCode: '',
    brCode: '',
    intCode: '',
    vrNo: 0
  };

  keys = {
    ico: 'coCode,coName,add1,add2,add3,yrSDt,yrEDt,modiCloseDate,baseCurCode,rateDecPts,amtDecPts,currencyMultiple,multiUnit,dvWiseItemsYn,isArabic',
    idv: 'dvCode,qtyDecPts,dvShrtName,dvName',
    ibr: 'brCode,entrySDt,entryEDt,brName,brShrtName',
    iuser: 'All',
    iint: '',
    isetup: ''
  };


  allAccountData: Iac4Dto[] = [];
  iac4LovData: SelectItem[];
  drCrList: SelectItem[];
  monthList: any[] = [];
  newBudgetRows: IabudgetDto[] = [];
  total: number = 0;
  enableField: boolean = true;
  monthLabel: string;

  constructor(
    protected branchSelection: BranchSelectionService,
    protected actionService: ActionService,
    private _messageService: MessageService,
    public service: BudgetService,
    private _errorTranslateService: ErrorTranslateService,
    private _masterService: MasterService,
    private _uiService: UiService,
  ) {
    super(service, actionService);
    this.actionService.currentComponent = this;
    this.actionService.toolbarVisible = false;
    this.actionService.toolbarButton.createInsert = false;
    this.actionService.toolbarButton.delete = false;
    // this.actionService.toolbarButton.save = false;
    this.actionService.toolbarButton.search = false;
    this.getAllLovData();
  }

  ngOnInit(): void {
    this.service.header = new IabudgetDto();
    this.service.header.vrDate = new Date();
  }


  async getAllLovData() {

    this.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    this.drCrList = [
      { label: 'Dr', value: '1' },
      { label: 'Cr', value: '2' },
    ]

    await this._uiService.getDataInLovFormat(apiUrl.iac4, 2, null, { labelFeild: "acCode", codeFeilds: "acCode" }, true).then(res => {
      this.iac4LovData = res;
    })

    await this._masterService.getMasterData(apiUrl.iac4).then(data => {
      this.allAccountData = data['data'];
    });

  }

  getdrCrType(type: string) {
    const drCrType = this.drCrList.find((row) => row.value == type);
    if (drCrType)
      return drCrType.label;
  }

  async allocateBudget() {
    if (!(await this.preSave())) {
      return;
    }
    if (this.service.header.acAmt && this.newBudgetRows.length > 0) {
      this.newBudgetRows.forEach(data => {
        data.acAmt = this.service.header.acAmt / 12;
      })
      return this.total = this.service.header.acAmt;
    }
  }

  afterBranchSelection() {
    this.actionService.toolbarVisible = true;
  }

  async acCodeValueChange() {
    if(!this.service.header.vrNo){
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('yearNotNull') });
      this.service.header.acCode = "";
      return false;
    }
    if (this.service.header.acCode) {
      this.allAccountData.forEach(async res => {
        if (res.acCode == this.service.header.acCode) {
          this.service.header.acName = res.acName;
          await this.createBudgetRows(this.monthList);
        }
      })
    } else {
      this.newBudgetRows = [];
      this.service.header.acName = '';
    }
  }

  getMonthLabel(index: any) {
    for (let i = 0; i < this.monthList.length; i++) {
      if (i == index) {
        this.monthLabel = this.monthList[i];
      }
    }
    return this.monthLabel;
  }

  async createBudgetRows(year: any) {
    let allRows: IabudgetDto[] = [];
    for (let i = 0; i < year.length; i++) {
      let newRow = new IabudgetDto();
      newRow.vrNo = this.service.header.vrNo;
      newRow.acAmt = 0;
      newRow.brCode = this.keyInfo.brCode;
      newRow.coCode = this.keyInfo.coCode;
      newRow.dvCode = this.keyInfo.dvCode;
      newRow.vrDate = new Date();
      newRow.acCode = this.service.header.acCode;
      allRows.push(newRow);
    }
    this.newBudgetRows = allRows;
  }

  async preSave(): Promise<boolean> {
    if (!this.service.header.vrNo || this.service.header.vrNo.toString().trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('yearNotNull') });
      return false;
    }
    if (!this.service.header.acAmt || this.service.header.acAmt.toString().trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('totalBudgetNotNull') });
      return false;
    }
    if (!this.service.header.acCode || this.service.header.acCode.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('accNotNull') });
      return false;
    }
    return true;
  }


  async postSave(): Promise<void> {
    await super.postSave();

  }

  async save(): Promise<Object> {
    if (!(await this.preSave())) {
      return;
    }
    await this.service.save(this.newBudgetRows).then(res => {
      this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate('saveSuccessMsg') });
      setTimeout(() => {
        this.newBudgetRows = [];
        this.service.header = new IabudgetDto();
        this.total = 0;
      }, 1500);
    }, (err) => {
      this._uiService.handleError(err.error.message);
      // console.warn("==err==", err);
    });
    return ;
  }

  async cancel(): Promise<void> {
    this.newBudgetRows = [];
    this.service.header = new IabudgetDto();
    this.total = 0;
    // console.warn("===rollback");
  }
}
