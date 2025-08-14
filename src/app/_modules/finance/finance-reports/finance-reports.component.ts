import { IcoDto, LovDto, PrintColumnGroupByMetaDataDto, PrintColumnMetaDataDto } from '@accurate/dto';
import { IcoService, MasterService } from '@accurate/providers';
import { ActionService, ICTReportPageBean, MenuService, Toast } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IrepparamDto } from 'src/app/_dto/irepparam.dto';
import { ReportJsonFormatDto } from 'src/app/_dto/other/report-json-format.dto';
import { ReportParamDto } from 'src/app/_dto/other/report-param.dto';
import { GroupDataDto } from 'src/app/_dto/other/report.dto';
import { AccountsService } from 'src/app/_providers/accounts.service';
import { IbrService } from 'src/app/_providers/ibr.service';
import { IdvService } from 'src/app/_providers/idv.service';
import { IrepparamService } from 'src/app/_providers/irepparam.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { environment } from 'src/environments/environment';
import { isArray } from 'util';


/*
modified by sruthin
date: 15/12/2021
for from and to date year month navigation
 */


@Component({
  selector: 'app-finance-reports',
  templateUrl: './finance-reports.component.html',
  styleUrls: ['./finance-reports.component.scss']
})
export class FinanceReportsComponent extends ICTReportPageBean implements OnInit {

  

  reportParams = {}; // paramter for passing to report paramters

  REPORT_PARAMS_JSON: any = {};

  reportDbParams: IrepparamDto[] = [];

  dateGroup = {
    // date1: { visible: false,name: paramname, data: { label: '', value: '' } }, format
    date1: { visible: false, name: 'fromDate', data: {} },
    date2: { visible: false, name: 'toDate', data: {} }
  }
  inputGroup = {
    input1: { visible: false, name: 'reportTitle', data: {} },
  }

  ageGroup = {
    agefield1: { visible: false, title: '', data: [], style: {} },
  }
  radioGroup = {
    // isGroup1: { visible: false,name: paramname, data: [{ label: '', value: '',valueChange: ()=> this.valueChange  }] }, format
    group1: { visible: false, title: '', name: 'group1', data: [], style: {} },
    group2: { visible: false, title: '', name: 'group2', data: [], style: {} },
    group3: { visible: false, title: '', name: 'group3', data: [], style: {} },
    group4: { visible: false, title: '', name: 'group4', data: [], style: {} },
    group5: { visible: false, title: '', name: 'group5', data: [], style: {} },
    group6: { visible: false, title: '', name: 'group6', data: [], style: {} },
    group7: { visible: false, title: '', name: 'group7', data: [], style: {} },
  };

  checkGroup = {
    // check1: { visible: false, data: [{ label: '', value: '',name:'', disabled: false }] }, format
    check1: { visible: false, title: '', data: [], style: {} },
    check2: { visible: false, title: '', data: [], style: {} },
    check3: { visible: false, title: '', data: [], style: {} },
    check4: { visible: false, title: '', data: [], style: {} },
    check5: { visible: false, title: '', data: [], style: {} },
    check6: { visible: false, title: '', data: [], style: {} },

    check11: { visible: false, title: '', data: [], style: {} },
    check12: { visible: false, title: '', data: [], style: {} },
  }

  tabGroup = {
    // tab1: { visible: false,name: paramname, data: { label: '', value: [] } }, format
    tab1: { visible: false, selected: false, title: '', name: 'SELECTED_COMPANYS', data: { label: '', value: [] } },
    tab2: { visible: false, selected: false, title: '', name: 'SELECTED_DIVISIONS', data: { label: '', value: [] } },
    tab3: { visible: false, selected: false, title: '', name: 'SELECTED_BRANCHES', data: { label: '', value: [] } },
    tab4: { visible: false, selected: false, title: '', name: 'SELECTED_ACCOUNTS', data: { label: '', value: [] } },
    tab5: { visible: false, selected: false, title: '', name: 'SELECTED_LEVELS', data: { label: '', value: [] } },
    tab6: { visible: false, selected: false, title: '', name: 'SELECTED_AREA', data: { label: '', value: [] } },
    tab7: { visible: false, selected: false, title: '', name: 'SELECTED_SALESMAN', data: { label: '', value: [] } },
    tab8: { visible: false, selected: false, title: '', name: 'SELECTED_DEBTCOLLECTOR', data: { label: '', value: [] } },
  }

  checked = false;
  display: boolean = false;

  isPrintPending: boolean = false;

  outputTypeData: LovDto[] = [
    { label: 'PDF', value: "pdf" },
    { label: 'Excel', value: "xlsx" },
    { label: 'Word', value: "docx" },
    { label: 'HTML', value: "html" },
    { label: 'CSV', value: "csv" },
    { label: 'RTF', value: "rtf" },
    { label: 'XML', value: "xml" },
    { label: 'ODT', value: "odt" },
    { label: 'ODS', value: "ods" },
    { label: 'JRPRINT', value: "jrprint" },
  ];
  // xls
  destinationData: LovDto[] = [
    { label: 'Web', value: "W" },
    { label: 'Email', value: "E" },
  ];

  menuId = "";


  //added for report designer by arun joy on 06-12-2021

  reportHeading: string = 'Ledger Report';
  // printColumnMetaData: PrintColumnMetaDataDto[] = [
  //   { column: 'acCode', columnHeading: "Account" },
  //   { column: 'ac4AcName', columnHeading: "Account Name" },
  // ];
  printColumnMetaData: PrintColumnGroupByMetaDataDto
  // = {
  //   headerMetaData: [
  //     { column: 'acCode', columnHeading: "Account" },
  //     { column: 'ac4AcName', columnHeading: "Account Name" },
  //     { column: 'ac4CurCode', columnHeading: ' ' }
  //   ],
  //   detailMetaData: [
  //     { column: 'brCode', columnHeading: 'IBr' },
  //     { column: 'intCode', columnHeading: 'Type' },
  //     { column: 'vrNo', columnHeading: 'Vr No' },
  //     { column: 'vrDate', columnHeading: 'Ledger Date' },
  //     { column: 'chqNo', columnHeading: 'Chq No' },
  //     { column: 'clearedDate ', columnHeading: 'Chq Date' },
  //     { column: 'acamt_dr', columnHeading: 'Debit', type: 'amount' },
  //     { column: 'acamt_cr', columnHeading: 'Credit', type: 'amount' },
  //     { column: 'balance', columnHeading: 'Balance', type: 'amountexp', expression: (row) => { return row.acamt_dr - row.acamt_cr } }
  //   ]
  // }

  detailPrintColumnMetaData: PrintColumnMetaDataDto[] = [
    { column: 'brCode', columnHeading: 'Br' },
    { column: 'intCode', columnHeading: 'Int' },
    { column: 'vrNo', columnHeading: 'Vr No' }
  ];
  data: any[] = [];
  allData: any[] = [];
  groupDataBy: string = 'acCode';
  detail: boolean = true;
  detailPropertyName: string = 'detail';
  rptLanguage: string = 'E';
  reportId: string = 'On Ts Test';
  company: IcoDto;
  fromDate: Date;
  toDate: Date;
  yearRange: any;

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
    super(service, _actionService);
    _actionService.currentComponent = this;
    console.log('here121');

    this.yearRange = `${(new Date()).getFullYear() - 10}:${(new Date()).getFullYear() + 10}`
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.getMenuId();
    if (!this.menuId)
      await this.route.paramMap.subscribe(params => { this.menuId = params.get("menuId");});


    this.actionService.toolbarButton.print = true;
    this.REPORT_OUTPUT_NAME = this._menuService.selectedMenu ? this._menuService.selectedMenu.menuId : this.menuId;

    this.company = await this._icoService.getCurrentCompanyDetails();

    await this.service.getReportParamters(this.menuId).then((res) => {
      this.reportDbParams = res;
      console.log('rwes==',res);
      if (res.length > 0)
        this.handleComponenetVisibility(res);
    }, (err) => {
      // console.warn("===er=rr", err);
    });

    const reportFormat: ReportJsonFormatDto = await this.service.getReportDataFormat(this.menuId);
    this.groupDataBy = reportFormat.groupDataBy;
    this.detail = reportFormat.detail
    this.detailPropertyName = reportFormat.detailPropertyName;
    this.rptLanguage = reportFormat.rptLanguage;
    this.reportId = reportFormat.reportId;
    this.reportHeading = reportFormat.reportHeading;
    this.printColumnMetaData = await this.getPrintColumnMetaDataFormat(reportFormat.printColumnMetaData, reportFormat.detail);
  }
  getMenuId() {
    this.menuId = this._menuService.selectedMenu ? this._menuService.selectedMenu.menuId : "";
  }

  async valueChange(event: Event, data: GroupDataDto) {
    

    if (data.valueChange) {
      data.valueChange(data);
    }
  }

  async levelChange() {
    this.reportParams[this.tabGroup.tab5.name] = [];
    const component = this.tabGroup["tab5"];
    component.data = { label: "SELECTED_LEVELS", value: await this.getTabData("5") };
  }

  async handleAccountSelection(data: GroupDataDto, flag?: string) {
    // this.reportParams["SELECTED_ACCOUNTS"] = [];
    // this.reportParams["SELECTED_LEVELS"] = [];
    this.reportParams["LEVEL_NO"] = "";
    this.reportParams[this.tabGroup.tab4.name] = [];
    this.reportParams[this.tabGroup.tab5.name] = [];

    if (data.value == "fullLedger") {
      this.tabGroup.tab4.visible = false;
      this.tabGroup.tab5.visible = false;
    } else if (data.value == "accountWise") {
      this.tabGroup.tab5.visible = false;
      this.tabGroup.tab4.visible = true;
      this.tabGroup.tab4.data.value = await this.getTabData("4", flag);
    } else {
      this.tabGroup.tab4.visible = false;
      this.tabGroup.tab5.visible = true;
      this.reportParams["LEVEL_NO"] = "1";
      this.reportParams[this.tabGroup.tab5.name] = [];
      this.tabGroup.tab5.data.value = await this.getTabData("5", flag);
    }
  }

  async handleSubLedger(data: GroupDataDto) {
    this.checkGroup.check1.data[2].disabled = false;
    if (this.reportParams[data.name]) {
      this.reportParams["LEVEL3"] = true;
      this.checkGroup.check1.data[2].disabled = true;
    }

  }

  async handlePeriod(data: GroupDataDto) {
    if (data.value == "P") {

      this.ageGroup.agefield1.visible = true;

      this.radioGroup.group7.visible = false;
    }
    else if (data.value == "M") {
      this.ageGroup.agefield1.visible = false;

      this.radioGroup.group7.visible = true;

    }
  }

  async handlePrintFormat(data: GroupDataDto) {
    this.reportParams[this.tabGroup.tab8.name] = [];
    this.reportParams[this.tabGroup.tab7.name] = [];
    if (data.value == "salesmanAc" || data.value == "salesmanTra") {
      this.tabGroup.tab7.visible = true;
      this.tabGroup.tab8.visible = false;
      this.tabGroup.tab7.data.value = await this.getTabData("7");
    } else if (data.value == "debtCollector") {
      this.tabGroup.tab7.visible = false;
      this.tabGroup.tab8.visible = true;
      this.tabGroup.tab8.data.value = await this.getTabData("8");
    } else {
      this.tabGroup.tab7.visible = false;
      this.tabGroup.tab8.visible = false;
    }
   
  }

  async checkCriteria(criteriaName: string, data: GroupDataDto) {
    if (!criteriaName)
      return data;
    // data["valueChange"]= (data:any) => this.test(data);
    // return await data;
    switch (criteriaName) {
      case "FULL_ACCOUNTS":
        data["valueChange"] = (data: GroupDataDto) => this.handleAccountSelection(data);
        return await data;
        break;
      case "BILL_ACCOUNTS":
        data["valueChange"] = (data: GroupDataDto) => this.handleAccountSelection(data, "bill_accounts");
        return await data;
        break;
      case "PRINT_FORMAT":
        data["valueChange"] = (data: GroupDataDto) => this.handlePrintFormat(data);
        return await data;
        break;
      case "SUB_LEDGER":
        data["valueChange"] = (data: GroupDataDto) => this.handleSubLedger(data);
        return data;
        break;
      case "COMPANY_START_DATE":
        const company = this.company;
        data.value = this._actionService.transformDate(company.yrSDt);
        return data;
        break;
      case "YEAR_START_DATE":
        const date = new Date(new Date().getFullYear(), 0, 1);
        data.value = this._actionService.transformDate(date);
        return data;
        break;
      case "PERIOD":
        data["valueChange"] = (data: GroupDataDto) => this.handlePeriod(data);
        return data;
        break;
      default:
        console.warn("==== criteria is missing, please contct administrator=====")
        break;
    }
  }

  async handleComponenetVisibility(data: IrepparamDto[]) {
    let minOptionId: number = 0;
    await data.forEach(async (row) => {
      if (row.optionType == "radio") {
        const component = this.radioGroup["group" + row.optionId];
        if (!component) return;
        component.visible = row.visibility;
        component.name = row.optionName;
        component.title = row.optionTitle;
        if (row.defaultValue)
          this.reportParams[row.optionName] = row.defaultValue;
        let labels: string[] = row.optionLabel.split(",");
        let values: string[] = row.optionValue.split(",");
        let width = 0;
        for (let i = 0; i < values.length; i++) {
          if (labels[i] && width < labels[i].length) {
            width = labels[i].length;
            component.style = { width: (((labels[i].length * 4) + 60) + "px") };
          }
          let componentRow = await this.checkCriteria(row.criteria, { label: labels[i], value: values[i] });
          component.data.push(componentRow);
          if (row.defaultValue && row.defaultValue == values[i]) {
            await this.valueChange(null, componentRow);
          }
        }

      }

      if (row.optionType == "checkbox") {
        const component = this.checkGroup["check" + (parseInt((parseInt(row.optionId) / 10).toString()) + 1)];
        if (!component) return;
        component.visible = row.visibility;
        // component.name = row.optionName;
        if (!component.title)
          component.title = row.optionTitle;
        let labels = row.optionLabel;
        let values: string[] = row.optionValue.split(",");
        component.style = { width: (((labels.length * 4) + 60) + "px") };
        this.reportParams[row.optionName] = (values[1] == "true" ? true : (values[1] == "false" ? false : values[1]));
        if (row.defaultValue) this.reportParams[row.optionName] = (row.defaultValue == "true" ? true : (row.defaultValue == "false" ? false : row.defaultValue));
        let componentRow = await this.checkCriteria(row.criteria, { label: labels, value: (values[0] == "true" ? true : (values[0] == "false" ? false : values[1])), name: row.optionName });
        component.data.push(componentRow);
      }

      if (row.optionType == "date") {
        const component = this.dateGroup["date" + row.optionId];
        if (!component) return;
        component.visible = row.visibility;
        component.name = row.optionName;
        let labels = row.optionLabel;
        let values = this._actionService.transformDate(new Date());
        let componentRow = await this.checkCriteria(row.criteria, { label: labels, value: values });
        // component.data = { label: labels, value: values }
        // set default value here
        this.reportParams[row.optionName] = componentRow.value;
        component.data = componentRow;
      }

      if (row.optionType == "agefield") {
        const component = this.ageGroup["agefield" + (parseInt((parseInt(row.optionId) / 10).toString()) + 1)];
        if (!component) return;
        component.visible = row.visibility;
        // component.name = row.optionName;
        if (!component.title)
          component.title = row.optionTitle;
        let labels = row.optionLabel;
        let values: string = row.optionValue ? row.optionValue : row.defaultValue;
        component.style = { width: (((labels.length * 4) + 60) + "px") };
        this.reportParams[row.optionName] = values;
        let componentRow = await this.checkCriteria(row.criteria, { label: labels, value: values, name: row.optionName });
        component.data.push(componentRow);
      }

      if (row.optionType == "input") {
        const component = this.inputGroup["input" + row.optionId];
        if (!component) return;
        component.visible = row.visibility;
        component.name = row.optionName;
        let labels = row.optionLabel;
        let values = (row.optionValue == null ? row.defaultValue : row.optionValue);
        if (row.defaultValue) this.reportParams[row.optionName] = row.defaultValue;
        let componentRow = await this.checkCriteria(row.criteria, { label: labels, value: values });
        this.reportParams[row.optionName] = componentRow.value;
        component.data = componentRow;

      }

      if (row.optionType == "tab") {

        const component = this.tabGroup["tab" + row.optionId];
        if (!component) return;
        if (minOptionId == 0 && row.visibility == 'true') {
          minOptionId = parseInt(row.optionId);
          component.selected = true;
        }

        component.visible = row.visibility;
        component.name = row.optionName;
        component.title = row.optionTitle;

        let labels = row.optionLabel;
        let values = await this.getTabData(row.optionId);

        this.reportParams[row.optionName] = [];
        component.data = { label: labels, value: values };
      }
    });
   
  }

  async prePrint(): Promise<boolean> {
   
    this.REPORT_PARAMS_JSON = {};
    this.REPORT_PARAMETERS = [];
    let reportFilesMap = new Map();


    this.reportDbParams.forEach(async (row) => {
    
      switch (row.optionType) {
        case "file":
          if (!environment.reportFromJasper) {
            this.REPORT_API_END_URL = row.defaultValue;
            this.reportHeading = row.optionLabel;
          }
          let reportNames: string[] = row.reportFile.split(",");
          reportNames.forEach((rptName, idx) => {
            reportFilesMap.set(idx, rptName);
          });
          break;
        case "radio":
          if (this.reportParams.hasOwnProperty(row.optionName) && this.reportParams[row.optionName] != null) {
            this.REPORT_PARAMS_JSON[row.optionName] = this.reportParams[row.optionName];
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: [this.reportParams[row.optionName]] });
          } else {
            this.reportParams[row.optionName] = row.defaultValue;
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: [row.defaultValue] });
            this.REPORT_PARAMS_JSON[row.optionName] = row.defaultValue;
          }
          if (row.reportFile) {
            let options: string[] = row.optionValue.split(",");
            options.forEach((option, idx) => {
              // if (this.reportParams[row.optionName] === option)
              //   this.REPORT_NAME = reportFilesMap.get(idx);\
              if (this.reportParams[row.optionName] === option) {
                let reportNames: string[] = row.reportFile.split(",");
                this.REPORT_NAME = reportFilesMap.get(parseInt(reportNames[idx]));
              }
            });
          }
          break;
        case "checkbox":
          if (this.reportParams.hasOwnProperty(row.optionName) && this.reportParams[row.optionName] != null) {
            let optionValue = "";
            let options: string[] = row.optionValue.split(",");
            if (<boolean>this.reportParams[row.optionName])
              optionValue = options[0];
            else
              optionValue = options[1];
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: [optionValue] });
            this.REPORT_PARAMS_JSON[row.optionName] = optionValue;
          } else {
            this.reportParams[row.optionName] = row.defaultValue;
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: [row.defaultValue] });
            this.REPORT_PARAMS_JSON[row.optionName] = row.defaultValue;
          }
          if (row.reportFile) {
            let options: string[] = row.optionValue.split(",");
            options.forEach((option, idx) => {
              if (this.reportParams[row.optionName] === option)
                this.REPORT_NAME = reportFilesMap.get(idx);
            });
          }
          break;
        case "agefield":
          if (this.reportParams.hasOwnProperty(row.optionName) && this.reportParams[row.optionName] != null) {
            let optionValue = this.reportParams[row.optionName];
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: [optionValue] });
            this.REPORT_PARAMS_JSON[row.optionName] = optionValue;
          } else {
            this.reportParams[row.optionName] = row.defaultValue;
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: [row.defaultValue] });
            this.REPORT_PARAMS_JSON[row.optionName] = row.defaultValue;
          }
          break;

        case "tab":
          if (this.reportParams.hasOwnProperty(row.optionName) && this.reportParams[row.optionName] != null && this.reportParams[row.optionName].length > 0) {
            let tabData = await this.getTabParamterData(this.reportParams[row.optionName], row.optionId);
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: tabData });
            this.REPORT_PARAMS_JSON[row.optionName] = tabData.toString();
          } else {
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: ["All"] });
            delete this.REPORT_PARAMS_JSON[row.optionName];
          }
          break;
        case "date":
          if (this.reportParams.hasOwnProperty(row.optionName) && this.reportParams[row.optionName] != null) {
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: [this._actionService.transformDate(this.reportParams[row.optionName])] });
            this.REPORT_PARAMS_JSON[row.optionName] = this._actionService.transformDate(this.reportParams[row.optionName]);
          }
          else {
            //check criteria and default value;
          }
          break;
        case "input":
          if (this.reportParams.hasOwnProperty(row.optionName) && this.reportParams[row.optionName] != null) {
            let optionValue = this.reportParams[row.optionName];
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: [optionValue] });
            this.REPORT_PARAMS_JSON[row.optionName] = optionValue;
          } else {
            this.reportParams[row.optionName] = row.defaultValue;
            this.REPORT_PARAMETERS.push({ name: row.optionName, value: [row.defaultValue] });
            this.REPORT_PARAMS_JSON[row.optionName] = row.defaultValue;
          }
          break;
        default:
          if (this.reportParams.hasOwnProperty(row.optionName) && this.reportParams[row.optionName] != null) {
            this.REPORT_PARAMS_JSON[row.optionName] = this.reportParams[row.optionName];
          } else {
            this.REPORT_PARAMS_JSON[row.optionName] = row.defaultValue;
          }
          break;
      }
    }, (err) => {

    });
    
    // this.REPORT_PARAMETERS.push({ name: "SELECTED_ACCOUNTS", value: await this.getTabParamterData(this.reportParams["SELECTED_ACCOUNTS"], "4") });
   
    if (!this.REPORT_NAME)
      this.REPORT_NAME = reportFilesMap.get(0);
    return true;
  }

  async print(): Promise<void> {
    if (!(await this.prePrint()))
      return;

    //   params.reportParams = [
    //     { "name": "CO_CODE", "value": [this.keyInfo.coCode] },
    //     { "name": "DV_CODE", "value": [this.keyInfo.dvCode] },
    //     { "name": "BR_CODE", "value": [this.keyInfo.brCode] },
    //     { "name": "INT_CODE", "value": [this.keyInfo.intCode] },
    //     { "name": "CURRENT_VR", "value": [this.service.header.vrNo] },
    //     { "name": "RANGE", "value": [this.reportParams.RANGE || "C"] },
    //     { "name": "AMT_DEC", "value": [this.branchSelection.icoValues.amtDecPts] },
    //     // { "name": "MAIN_TITLE", "value": [this.reportParams.MAIN_TITLE || this.branchSelection.icoValues.coName] },
    //     // { "name": "SUB_TITLE", "value": [this.reportParams.SUB_TITLE || this.branchSelection.icoValues.add1.trim() + this.branchSelection.icoValues.add2.trim() + this.branchSelection.icoValues.add3.trim()] },
    //     // { "name": "TITLE", "value": [this.reportParams.TITLE || this.branchSelection.iintValues.print2Title] },
    //     { "name": "MAIN_TITLE", "value": [this.reportParams.MAIN_TITLE] },
    //     { "name": "SUB_TITLE", "value": [this.reportParams.SUB_TITLE] },
    //     { "name": "TITLE", "value": [this.reportParams.TITLE] },

    //     { "name": "FROM_DATE", "value": [this.reportParams.FROM_DATE || null] },
    //     { "name": "TO_DATE", "value": [this.reportParams.TO_DATE || null] },
    //     { "name": "FROM_VRNO", "value": [this.reportParams.FROM_VRNO || null] },
    //     { "name": "TO_VRNO", "value": [this.reportParams.TO_VRNO || null] },
    // ];

    let outputReportName: string = this.REPORT_OUTPUT_NAME;
    let params: ReportParamDto = {
      type: this.REPORT_TYPE,
      reportName: this.REPORT_NAME,
      reportParams: environment.reportFromJasper ? this.REPORT_PARAMETERS : this.REPORT_PARAMS_JSON
    };

    await this.actionService.reportService.print(params, this.REPORT_API_END_URL).then(async (data: any) => {
      if (this.groupDataBy)
        this.data = this.groupBy(data, this.groupDataBy);
      else {
        data = this.dataFormatingSession(data);
        this.getDataInFormat(data);
        this.data = data;
      }
      // this.loading = false;
      setTimeout(() => {
        this.display = true;
        // this.loading = false;
        // window.print();
      }, 1500);
      await this.postPrint();
    }, (err) => {
      // Modified by : Aswathy
      // Modified for:(31/12/2021) To get the error message from Backend
      this.actionService.showToast(Toast.ERROR, err.statusText, err.error.message);
    })
  }

  //extended for editing data in other report components;
  dataFormatingSession(data) {
    return data;
  }

  getDataInFormat(arrayData: any[], isDetail?: boolean) {
    if (!this.detail) {
      this.allData = arrayData;
      return
    }
    for (let data of arrayData) {
      let obj = {};
      let detailExistArray = [];
      let detail: any = (!isDetail ? this.printColumnMetaData : this.detailPrintColumnMetaData);
      for (let col of detail) {
        if (isArray(data[col.column])) {
          detailExistArray.push({ code: col.column, value: data[col.column] })
        } else {
          obj[col.column] = data[col.column];
        }
      }

      obj["isHeader"] = !isDetail;
      this.allData.push(obj);
      for (let detail of detailExistArray) {
        this.getDataInFormat(detail.value, true);
      }
    }
  }

  groupBy = (array: any[], key: string) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      let data = (result[currentValue[key]] = result[currentValue[key]] || { detail: [], header: currentValue })
      // if(data["detail"])
      data["detail"].push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  async getTabData(index: string, flag?: string): Promise<any> {
    let data: any = [];
    switch (parseInt(index)) {
      case 1:
        data = await this._icoService.getData();
        break;
      case 2:
        data = await this._idvService.getDivisionLovDetails('01');
        break;
      case 3:
        data = await this._ibrService.getBrWithRights();
        break;
      case 4:
        if (flag && (flag == "bill_accounts"))
          data = await this._iac4Services.getBillAccountOnlyLov();
        else
          data = await this._iac4Services.getAccountLov("01");
        break;
      case 5:
        if (!this.reportParams["LEVEL_NO"] || this.reportParams["LEVEL_NO"] == "") {
          this.reportParams["LEVEL_NO"] = "1";
        }
        if (this.reportParams["LEVEL_NO"] == "1")
          data = await this._iac4Services.getIac1();
        if (this.reportParams["LEVEL_NO"] == "2")
          data = await this._iac4Services.getIac2("01");
        if (this.reportParams["LEVEL_NO"] == "3")
          data = await this._iac4Services.getIac3("01");
        break;
      case 6:
        data = await this._masterService.getMasterData(apiUrl.areaAll);
        break;
      case 7:
        data = await this._masterService.getMasterData(apiUrl.salesmanAll);
        break;
      case 8:
        data = await this._masterService.getMasterData(apiUrl.debtCollectorAll);
        break;
      default:
        data = [];
        break;
    }
    return data;
  }

  async getTabParamterData(data: any[], index: string): Promise<[string | number]> {
    let primaryFeild = "";
    let tabData: any[string | number] = [];

    switch (parseInt(index)) {
      case 1:
        primaryFeild = "coCode";
        break;
      case 2:
        primaryFeild = "dvCode";
        break;
      case 3:
        primaryFeild = "brCode";
        break;
      case 4:
        primaryFeild = "acCode";
        break;
      case 5:
        primaryFeild = "ac" + this.reportParams["LEVEL_NO"] + "Code";
        break;
      default:
        primaryFeild = "";
        break;
    }

    data.forEach((row) => {
      tabData.push(row[primaryFeild]);
    });

    return tabData;
  }

  async getPrintColumnMetaDataFormat(printColumnMetaData: any, hasDetail: boolean) {
    if (hasDetail) {
      for (let row of printColumnMetaData.headerMetaData) {
        if (row.type == 'amountexp' && row.expressionArray)
          row["expression"] = (rowData) => this.getExpressionFormat(row.expressionArray, rowData);
      }
      for (let row of printColumnMetaData.detailMetaData) {
        if (row.type == 'amountexp' && row.expressionArray)
          row["expression"] = (rowData) => this.getExpressionFormat(row.expressionArray, rowData);
      }
    } else {
      for (let row of printColumnMetaData) {
        if (row.type == 'amountexp' && row.expressionArray)
          row["expression"] = (rowData) => this.getExpressionFormat(row.expressionArray, rowData);
      }
    }
    return printColumnMetaData;
  }

  getExpressionFormat(expression, data) {
    switch (expression.type) {
      case "row":
        expression = this.createExpression(expression.exp, data);
        break;
      default: expression = 0;
        break;
    }
    return expression;
  }

  // "expression": { "type": "row", "exp": ["acamt_dr","-","acamt_cr"] }
  // expression: (row) => { return row.acamt_dr - row.acamt_cr }
  createExpression(expression: string[], row: any) {
    let dataExp = 0.00;
    for (let i = 0; i < expression.length; i++) {
      switch (expression[i]) {
        case "+":
          if (dataExp)
            dataExp = dataExp + parseFloat(row[expression[i + 1]]);
          else {
            dataExp = parseFloat(row[expression[i - 1]]) + parseFloat(row[expression[i + 1]]);
          }
          break;
        case "-":
          if (dataExp)
            dataExp = dataExp - parseFloat(row[expression[i + 1]]);
          else
            dataExp = parseFloat(row[expression[i - 1]]) - parseFloat(row[expression[i + 1]])
          break;
        case "*":
          if (dataExp)
            dataExp = dataExp * parseFloat(row[expression[i + 1]]);
          else
            dataExp = parseFloat(row[expression[i - 1]]) * parseFloat(row[expression[i + 1]]);
          break;
        case "/":
          if (dataExp)
            dataExp = dataExp / parseFloat(row[expression[i + 1]]);
          else
            dataExp = parseFloat(row[expression[i + 1]]) / parseFloat(row[expression[i + 1]]);
          break;
        default:
          break;
      }
    }
    return dataExp;
    // return row.acamt_dr - row.acamt_cr;
  }

}
