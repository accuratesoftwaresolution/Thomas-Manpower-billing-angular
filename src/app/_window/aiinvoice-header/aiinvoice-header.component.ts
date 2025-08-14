import { MessageService } from "primeng/api";
import { FormAlignerDto, SelectItem } from "@accurate/dto";
import { ActionService } from "@accurate/toolbar";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IapodetailDto } from "src/app/_dto/iapodetail.dto";
import { IccurrencyDto } from "src/app/_dto/iccurrency.dto";
import { Iac4LovDto } from "src/app/_dto/lov/iac4-lov.dto";
import { IccurrencyService } from "src/app/_providers/iccurrency.service";
import { apiUrl } from "src/app/_resources/api-url.properties";
import {
    ErrorTranslateService,
    LangaugeTranslateService,
    MasterService,
} from "@accurate/providers";
import { UiService } from "@accurate/ui";
import { Iac4Dto } from "src/app/_dto/iac4.dto";
import { BranchSelectionService } from "@accurate/branch-selection";
import { PopUpLovService } from "src/app/_providers/pop-up-lov.service";
import { IcsalesmanDto } from "src/app/_dto/icsalesman.dto";
//import { type } from 'os';
import { InterfaceObjectService } from "src/app/_providers/interface-object.service";
import { style } from "@angular/animations";
import { PurchaseOrderService } from "src/app/_providers/purchase-order.service";
import { IipodetailDto } from "src/app/_dto/iipodetail.dto"
import { GrnInvoiceService } from "src/app/_providers/grn-invoice.service";
import { DatePipe } from "@angular/common";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-aiinvoice-header',
  templateUrl: './aiinvoice-header.component.html',
  styleUrls: ['./aiinvoice-header.component.scss']
})
export class AiinvoiceHeaderComponent implements OnInit {
  service = this.actionService.currentComponent.service;

  @Output() changeData = new EventEmitter<any>();

  columnMetaData: FormAlignerDto[] = [];
  contact: FormAlignerDto[] = [];
  statusLovData: SelectItem[];
  jobLovData: SelectItem[] = [];
  paymentLovData: SelectItem[] = [];
  allAccountData: Iac4Dto[] = [];
  jobAllData: any;
  iac4LovData: SelectItem[];
  iac4LovSelected: Iac4LovDto;
  iitermsLovData: SelectItem[] = [];
  currencyLovData: SelectItem[] = [];
  allCurrencyData: any;
  brList: SelectItem[] = [];

  isStock: boolean = false;

  salesManLovData: any[] = [];
  isTrue: boolean = false;
  isTrueDp: boolean = false;
  visible: boolean;
  searchTerm: any;
  dataCp: any;
  newData: any;
  selectedNumber: string;
  value2: any;
  decimalSearch: any;
  GRNDisabled : boolean = true;
  buttonLabel:string='';
  constructor(
      public iccurrencyService: IccurrencyService,
      public _popUpLovService: PopUpLovService,
      private _uiService: UiService,
      private _lang: LangaugeTranslateService,
      private _masterService: MasterService,
      private actionService: ActionService,
      private messageService: MessageService,
      private _errorTranslateService: ErrorTranslateService,
      private _interfaceObjectService: InterfaceObjectService,
      protected branchSelection: BranchSelectionService,
      protected _service: GrnInvoiceService,
      protected _purchaseOrderService: PurchaseOrderService,
      private _messageService: MessageService,
      private datepipe: DatePipe,
      private _activeRouter: ActivatedRoute

  ) {
      // this.isTrue = this.branchSelection.iintValues.intLogic == "SA";
      // this.isTrueDp = this.branchSelection.iintValues.intCode == "DP";

      // if (this.branchSelection.iintValues.intLogic == "ST" || this.branchSelection.iintValues.intLogic == "STI") {
      //     this.isStock = true
      // }
      this._activeRouter.paramMap.subscribe(async (param: ParamMap) => {
        if (param.get('int')) {
            this.buttonLabel = param.get('int').toUpperCase();
            this.service.header.intCode = param.get('int').toUpperCase()
        //   if(param.get('int')=='do'){
        //     this.service.header.intCode = 'CIS'
        //   }
        //   if(param.get('int')=='grn'){
        //     this.service.header.intCode = 'CIP'
        //   }
            
        }
  
      })
      this.getColumn();
  }

  ngOnInit(): void {
    

      this.getAllLovData();
  }


  onCurCodeChange() {
      this.allCurrencyData.forEach((data) => {
          if (
              this.service.header.curCode &&
              this.service.header.curCode == data.code
          ) {
              this.service.header.curRate = data.curRate;
          }
      });
  }


  onHeaderDiscount(flag: string) {
      let detailTotAmt = 0;
      if (
          !this.service.header.iapodetail ||
          (this.service.header.iapodetail &&
              this.service.header.iapodetail.length <= 0)
      )
          return;
      detailTotAmt = this.getTotalAmount();
      if (flag == "P") {
          this.service.header.discAmt = this.actionService.round(
              (detailTotAmt * this.service.header.discPer) / 100,
              this.service.amtDecPts
          );
      } else if (flag == "A" && detailTotAmt > 0) {
          this.service.header.discPer = this.actionService.round(
              (this.service.header.discAmt * 100) / detailTotAmt,
              this.service.amtDecPts
          );
      }

      this.service.header.iapodetail.forEach((row: IapodetailDto) => {
          row.discPer = this.service.header.discPer;
          row.discAmt = (row.qty * row.rate * row.discPer) / 100;
      });
  }

  getTotalAmount(): number {
      if (
          this.service.header.iapodetail &&
          this.service.header.iapodetail.length > 0
      ) {
          const total = this.service.header.iapodetail.reduce(
              (sum, current) =>
                  parseFloat(sum.toString()) +
                  parseFloat((current.qty * current.rate).toString()),
              0
          );
          return total;
      }
      return 0;
  }

  acCodeValueChange() {
      if (this.service.header.acCode) {
          this.allAccountData.forEach((res) => {
              if (res.acCode == this.service.header.acCode) {
                  this.service.header.acName = res.acName;
                  this.service.header.curCode = res.curCode;
                  this.onCurCodeChange();
              }
          });
      } else {
          this.service.header.acName = "";
          this.service.header.curCode = "";
      }
  }

  vatValueChange(event) {
      if (event && event.checked) {
          this.service.header.vat = "Y";
      } else this.service.header.vat = "N";
  }

  phoneValueChange(event, colName) {
      if (
          this.service.header.tel &&
          colName == "tel" &&
          !this._uiService.getPhoneRegex().test(this.service.header.tel)
      ) {
          this.messageService.add({
              severity: "info",
              summary: "Info",
              detail: this._errorTranslateService.translate(
                  "EnterValidTelephone"
              ),
          });
          this.service.header.tel = null;
      } else if (
          this.service.header.gsm &&
          colName == "gsm" &&
          !this._uiService.getPhoneRegex().test(this.service.header.gsm)
      ) {
          this.messageService.add({
              severity: "info",
              summary: "Info",
              detail: this._errorTranslateService.translate("EnterValidGsm"),
          });
          this.service.header.gsm = null;
      } else if (
          this.service.header.contact &&
          colName == "contact" &&
          !this._uiService.getPhoneRegex().test(this.service.header.contact)
      ) {
          this.messageService.add({
              severity: "info",
              summary: "Info",
              detail: this._errorTranslateService.translate(
                  "EnterValidContact"
              ),
          });
          this.service.header.contact = null;
      }
      if (
          this.service.header.fax &&
          colName == "fax" &&
          !this._uiService.getPhoneRegex().test(this.service.header.fax)
      ) {
          this.messageService.add({
              severity: "info",
              summary: "Info",
              detail: this._errorTranslateService.translate("EnterValidFax"),
          });
          this.service.header.fax = null;
      }

      if (
          this.service.header.email &&
          colName == "email" &&
          !this._uiService.getEmailRegex().test(this.service.header.email)
      ) {
          this.messageService.add({
              severity: "info",
              summary: "Info",
              detail: this._errorTranslateService.translate(
                  "EnterValidEmail"
              ),
          });
          this.service.header.email = null;
      }
  }

  getColumn() {
    let today = new Date();
    let yesterDay = new Date();
    yesterDay.setDate(yesterDay.getDate() - 1);

          {
              this.contact = [
                  {
                      type: "group",
                      size: 12,
                      label: "",
                      groupColumnMetaData: [
                          {
                              columnName: "fromDate",
                              labelCode: "fromDate",
                              mandatory: true,
                              size: 4,
                              type: "date",
                              maxDate: yesterDay
                          },
                          {
                              columnName: "toDate",
                              labelCode: "toDate",
                              mandatory: true,
                              size: 4,
                              type: "date",
                              maxDate: today
                          },
                          {
                              columnName: "acCode",
                              size: 4,
                              labelCode: "account",
                              type: "dropdown",
                              data: () => this.iac4LovData,
                          },
                          {
                            columnName: "button",
                            size: 3,
                            labelCode:"submit",
                            label: this.buttonLabel,
                            type: "button",
                            click:()=> this.retrieve()
                          },
                      ],
                  },
              ];

              this.columnMetaData = [
                {
                    type: "group",
                    size: 12,
                    label: "",
                    groupColumnMetaData: [
                        {
                            columnName: "vrDate",
                            labelCode: "vrDate",
                            mandatory: true,
                            size: 3,
                            type: "date",
                            isDisabled:true,
                            valueChange: (event)=> this.inputChange(event,'vrDate')
                        },
                        {
                            columnName: "billNo",
                            labelCode: "billNo",
                            mandatory: true,
                            size: 3,
                            type: "text",
                            valueChange: (event)=> this.inputChange(event,'billNo')
                        },{
                          columnName: "billDate",
                          labelCode: "billDate",
                          mandatory: true,
                          size: 3,
                          type: "date",
                          valueChange: (event)=> this.inputChange(event,'billDate')
                      },
                        //{ columnName: 'refNo', labelCode: 'refNo', size: 3, maxlength: 30 },
                        //{ columnName: 'refDate', labelCode: 'refDate', size: 3, type: 'date' },
                        {
                            columnName: "All",
                            size: 3,
                            labelCode: "All",
                            type: "check",
                            valueChange: (event)=> this.inputChange(event,'All')
                        },
                        {
                            columnName: "narration",
                            size: 6,
                            labelCode: "Narration",
                            type: "text",
                            valueChange: (event)=> this.inputChange(event,'narration')
                        },

                        ],
                },
            ];
          }
   
  }

  async getAllLovData() {
      this.statusLovData = [
          { label: this._lang.first("active"), value: "A" },
          { label: this._lang.first("inactive"), value: "I" },
      ];
      await this._uiService.getDataInLovFormat(apiUrl.iac4,2,null,{ labelFeild: "acName", codeFeilds: "acCode" },true).then((res) => {
              this.iac4LovData = res;
          });

          await this._uiService.getDataInLovFormat(apiUrl.salesman,2,null,{ labelFeild: "name", codeFeilds: "code" },true).then((res) => {
          this.salesManLovData = res;
          
          });

      await this._uiService
          .getDataInLovFormat(
              apiUrl.terms,
              2,
              null,
              {
                  labelFeild: "name",
                  codeFeilds: "name",
                  dataFetchExpression: {
                      getMethodExpression: `where[termType]=2`,
                  },
              },
              true
          )
          .then((res) => {
              this.iitermsLovData = res;
          });

      await this._uiService
          .getDataInLovFormat(
              apiUrl.job,
              2,
              null,
              { labelFeild: "jobName", codeFeilds: "jobCode" },
              true
          )
          .then((res) => {
              this.jobLovData = res;
          });

      await this._uiService
          .getDataInLovFormat(
              apiUrl.terms,
              2,
              null,
              {
                  labelFeild: "name",
                  codeFeilds: "name",
                  dataFetchExpression: {
                      getMethodExpression: `where[termType]=3`,
                  },
              },
              true
          )
          .then((res) => {
              this.paymentLovData = res;
          });

      await this._uiService
          .getDataInLovFormat(
              apiUrl.currency,
              2,
              null,
              { labelFeild: "code", codeFeilds: "code" },
              true
          )
          .then((data) => {
              this.currencyLovData = data;
          });

      await this._masterService.getMasterData(apiUrl.iac4).then((data) => {
          this.allAccountData = data["data"];
      });

      await this._masterService.getMasterData(apiUrl.job).then((data) => {
          this.jobAllData = data["data"];
      });

      await this._masterService.getMasterData(apiUrl.currency).then((res) => {
          this.allCurrencyData = res["data"];
      });
  }

  inputChange(event,col){
    
    if(this.GRNDisabled){
        this.service.header[col] = '';
        this._messageService.add({ severity: 'warn', summary: 'Warning', detail: `Select ${this.service.intCode} First` });
        return
    }
    
  }

  retrieve(){
    let currentDate = new Date()
    if(!this.service.header.fromDate || this.service.header.fromDate==undefined){
        this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('fromDateCannotBeBlank') });
        return
    }
    if(!this.service.header.toDate || this.service.header.toDate==undefined){
        this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('toDateCannotBeBlank') });
        return
    }
    if(this.service.header.fromDate > this.service.header.toDate){
        this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('InValidToDate') });
        return
    }
    if( this.service.header.toDate > currentDate){
        this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('toDateCannotBeGreaterThanCurrentDate') });
        return
    }
    if(!this.service.header.acCode || this.service.header.acCode==undefined){
        this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('acCodeNotNull') });
        return
    }
    else{
        this.service.loading = true;
        let filter = `where[fromDate]=${this.datepipe.transform(this.service.header.fromDate, 'yyyy-MM-dd')}&where[toDate]=${this.datepipe.transform(this.service.header.toDate, 'yyyy-MM-dd')}&where[accCode]=${this.service.header.acCode}&where[brCode]=${this.service.header.brCode}&where[coCode]=${this.service.header.coCode}&where[dvCode]=${this.service.header.dvCode}&where[intCode]=${this.service.intCode}`;
        this._masterService.getMasterData(apiUrl.iheaderReport,filter).then(res=>{
            this.service.allSelect = false
            this.service.loading = false;
            this.GRNDisabled = false
            this.service.header.aidetail = res
        },err=>{
            this.service.loading = false;
            this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            return
            
        })

    }
  }

  selectedProduct: any = ''
  products: any = ''
  showDialog() {

      this.visible = true;

      this._purchaseOrderService.searchList(this.branchSelection.icoValues.coCode, this.branchSelection.idvValues.dvCode, this.branchSelection.ibrValues.brCode, this.branchSelection.iintValues.refInt).then(res => {
          this.products = res;
          this.dataCp = res['data'];
      })
  }

  product = [];

  onChangeNo(value) {
      this.products.data = this.dataCp
      this.product = this.products.data;
      this.products.data = this.product.filter(item => item.vrNo.toLowerCase().includes(value.toLowerCase()));
  }
  onChangeDate(value) {
      this.products.data = this.dataCp
      this.product = this.products.data;
      this.products.data = this.product.filter(item => item.vrDate.toLowerCase().includes(value.toLowerCase()));
  }
  onChangeAcc(value) {
      this.products.data = this.dataCp
      this.product = this.products.data;
      this.products.data = this.product.filter(item => item.acName.toLowerCase().includes(value.toLowerCase()));
  }
  globalSearch(value) {
      this.products.data = this.dataCp
      this.product = this.products.data;
      this.products.data = this.product.filter(item => {
          return item.acName.toLowerCase().includes(value.toLowerCase()) ||
              item.vrDate.toLowerCase().includes(value.toLowerCase()) ||
              item.vrNo.toLowerCase().includes(value.toLowerCase());
      });
  }
  async onRowClick(product) {
      this.visible = false;
      await this._purchaseOrderService.search(product.coCode, product.dvCode, product.brCode, product.intCode, parseFloat(product.vrNo)).then(async res => {
          this.service.header.aidetail = await res.iipodetail;
          for (let i = 0; i < this.service.header.aidetail.length; i++) {
              this.service.header.aidetail[i].interBrCode = res.iipodetail[i].brCode;
              this.service.header.aidetail[i].storeCode = res.iipodetail[i].srNo;
              this.service.header.vrNo = res.iipodetail[i].vrNo;
              this.service.header.acName = res.acName
              this.service.header.acCode = res.acCode
              this.service.header.aidetail[i].itemDesc = res.iipodetail[i].itemName;
          }
      })
  }

  async decSearch(event: any) {
      this.decimalSearch = event.target.value;
      await this._service.search(this.branchSelection?.icoValues?.coCode, this.branchSelection?.idvValues?.dvCode, this.branchSelection?.ibrValues?.brCode, this.branchSelection?.iintValues?.intCode, this.decimalSearch).then(async res => {
          this.service.header = await res;
          if (!Boolean(res)) {
              await this.messageService.add({ severity: 'error', summary: 'Error', detail: this._errorTranslateService.translate("vrNoNotFound") });
          }
      }, err => {
          // console.warn("err========", err);
      });

  }

}
