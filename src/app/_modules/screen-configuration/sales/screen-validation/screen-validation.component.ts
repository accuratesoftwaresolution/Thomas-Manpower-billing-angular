// import { MasterService } from '@accurate/providers';
import { MasterService } from 'src/app/_providers/master.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldConfDocuCo } from 'src/app/_dto/TbldConfDocuCo.dto';
import { TblHConfDocu } from 'src/app/_dto/TblHConfDocu.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { TblDigdUserDetailDto } from 'src/app/_dto/tbldigiuserdetail.dto';
import { TblAuthorizerDto } from 'src/app/_dto/tblauthorizer.dto';
import { TblTrasCriteria } from 'src/app/_dto/TblTrasCriteria.dto';
import { TblHMidConfPrint } from 'src/app/_dto/TblHMidConfPrint.dto';
import { TblHMidConfProGSele } from 'src/app/_dto/TblHMidConfProGSele.dto';
import { TblHMidConfVtype } from 'src/app/_dto/TblHMidConfVtype.dto';
import { TblHMidConfCopDoc } from 'src/app/_dto/TblHMidConfCopDoc.dto';
import { TblHMidConfInterCo } from 'src/app/_dto/TblHMidConfInterCo.dto';
import { TblHMidConfPTerms } from 'src/app/_dto/TblHMidConfPTerms.dto';
import { TblHMidConfPdcBank } from 'src/app/_dto/TblHMidConfPdcBank.dto';
import { TblHMidConfCorpTax } from 'src/app/_dto/TblHMidConfCorpTax.dto';
import { TblHMidConfPUnit } from 'src/app/_dto/TblHMidConfPUnit.dto';
import { TblHMidConfPCustList } from 'src/app/_dto/TblHMidConfPCustList.dto';
import { TblHMidConfPVenList } from 'src/app/_dto/TblHMidConfPVenList.dto';
import { TblHMidCostCent } from 'src/app/_dto/TblHAllMasters.dto';
import { TblHMidProfCent } from 'src/app/_dto/TblHMidProfCent.dto';
import { TblHMidDivision } from 'src/app/_dto/TblHMidDivision.dto';
import { TblHMidSman } from 'src/app/_dto/TblHMidSman.dto';
import { TblHMidDept } from 'src/app/_dto/TblHMidDept.dto';
import { TblHMidMidJob } from 'src/app/_dto/TblHMidMidJob.dto';
import { TblHMidOthCentre } from 'src/app/_dto/TblHMidOthCentre.dto';
import { TblHMidSalesOrg } from 'src/app/_dto/TblHMidSalesOrg.dto';
import { TblHMidDistChanel } from 'src/app/_dto/TblHMidDistChanel.dto';
import { TblHMidSoffice } from 'src/app/_dto/TblHMidSoffice.dto';
import { TblHMidSalGroup } from 'src/app/_dto/TblHMidSalGroup.dto';
import { TblHMidPlaceSupply } from 'src/app/_dto/TblHMidPlaceSupply.dto';
import { TblHMidJurisd } from 'src/app/_dto/TblHMidJurisd.dto';
import { TblHMidWhOne } from 'src/app/_dto/TblHMidWhOne.dto';
import { TblHMidWhTwo } from 'src/app/_dto/TblHMidWhTwo.dto';
import { TblHMidAccFirst } from 'src/app/_dto/TblHMidAccFirst.dto';
import { TblHMidAccSec } from 'src/app/_dto/TblHMidAccSec.dto';
import { TblHMidAccCus } from 'src/app/_dto/TblHMidAccCus.dto';
import { TblHMidAccVen } from 'src/app/_dto/TblHMidAccVen.dto';
import { TblHMidExpCust } from 'src/app/_dto/TblHMidExpCust.dto';
import { TblHMidLandCost } from 'src/app/_dto/TblHMidLandCost.dto';
import { TblHMShippedto } from 'src/app/_dto/TblHMShippedto.dto';
import { TblHMBilledto } from 'src/app/_dto/TblHMBilledto.dto';
import { TblHMidExpVen } from 'src/app/_dto/TblHMidExpVen.dto';
import { TblHMidTaxOne } from 'src/app/_dto/TblHMidTaxOne.dto';
import { TblHMidTaxThree } from 'src/app/_dto/TblHMidTaxThree.dto';
import { TblHMidTaxTwo } from 'src/app/_dto/TblHMidTaxTwo.dto';
import { TblHDocStartNo } from 'src/app/_dto/TblHDocStartNo.dto';
import { TblHMProdModu } from 'src/app/_dto/TblHMProdModu.dto';
import { TblHMNarration } from 'src/app/_dto/TblHMNarration.dto';
import { TblHMAppDate } from 'src/app/_dto/TblHMAppDate.dto';
import { TblHMProdMast } from 'src/app/_dto/TblHMProdMast.dto';
import { TblHMInco } from 'src/app/_dto/TblHMInco.dto';
import { TblHMBAccCr } from 'src/app/_dto/TblHMBAccCr.dto';
import { TblHMBAccDr } from 'src/app/_dto/TblHMBAccDr.dto';
import { TblHMBPAccCr } from 'src/app/_dto/TblHMBPAccCr.dto';
import { TblHMBPAccDr } from 'src/app/_dto/TblHMBPAccDr.dto';
import { TblHMJouCr } from 'src/app/_dto/TblHMJouCr.dto';
import { TblHMJouDr } from 'src/app/_dto/TblHMJouDr.dto';
import { TblHMPettyCr } from 'src/app/_dto/TblHMPettyCr.dto';
import { TblHMPettyDr } from 'src/app/_dto/TblHMPettyDr.dto';
import { TblFieldMasterDto } from 'src/app/_dto/tblfieldmaster.dto';
import { FormLinkingDto } from 'src/app/_dto/formlinking.dto';
import { TblHTabHDDto } from 'src/app/_dto/tblhtabhd.dto';
import { TbldTranDigiLock } from 'src/app/_dto/TbldTranDigiLock.dto';
import { TblHMCurrMast } from 'src/app/_dto/TblHMCurrMast.dto';
import { TblHMTaxAcc } from 'src/app/_dto/TblHMTaxAcc.dto';
import { TblHMDocuMaster } from 'src/app/_dto/TblHMDocuMaster.dto';
import { TblHMEmp } from 'src/app/_dto/TblHMEmp.dto';


@Component({
  selector: 'app-screen-validation',
  templateUrl: './screen-validation.component.html',
  styleUrls: ['./screen-validation.component.scss']
})
export class ScreenValidationComponent implements OnInit {

  //Apis
  voucherType: any;
  printFormat: any;



  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  showAmendment: boolean = false;
  activeState: boolean[] = [false, false, false];
  activeIndex: number = 0;
  display: boolean = false;
  singleCompany: any;
  showDeleteButton: boolean = false;
  showListButton: boolean = true;
  isSaving: boolean = false;

  progressValue: number = 0;

  scrollableTabs: any[] = [
    { title: "Main", content: "" },
    // { title: "Select Query", content: "" },
    // { title: "Select Query", content: "" },
    // { title: "Insert Query", content: "" },
    // { title: "Update Query", content: "" },
    // { title: "Delete Query", content: "" },
    { title: "DigiLock", content: "" },
    { title: "Transaction Approval", content: "" },
    { title: "Hide Or Display Fields", content: "" },
    { title: "Hide Or Display Tabs", content: "" },
    { title: "Hide Buttons", content: "" },
    { title: "Form Linking", content: "" },
    { title: "Voucher Type & Others", content: "" },
    { title: "PDC & Terms", content: "" },
    { title: "Rate Agreement", content: "" },
    { title: "Masters One", content: "" },
    { title: "Masters Two", content: "" },
    { title: "Masters Three", content: "" },
    { title: "Masters Four", content: "" },

    { title: "First Account", content: "" },
    { title: "Second Account", content: "" },
    { title: "Customer Account", content: "" },
    { title: "Vendor Account", content: "" },

    { title: "Additional Expenses Add to Customer Account", content: "" },
    { title: "Additional Expenses Add to Vendor Account", content: "" },


    { title: "Tax Group", content: "" },
    { title: "Document start Number", content: '' },

    { title: "Product & Others", content: "" },
    { title: "Finance", content: '' },

    { title: "Active Employee Master", content: '' },
  ];

  toolBarData = {
    title: 'Toolbar Title',
    screen: 'SomeScreen',
    buttons: [
      { label: 'Approval Status', class: 'header-btn', isHide: false, isDisabled: false, functionName: 'save' },
      //{ label: 'Save', class: 'header-btn', isHide: false, isDisabled: false, functionName: 'save' },
      // { label: 'Cancel', class: 'header-btn', isHide: false, isDisabled: false, functionName: 'cancel' },
      // { label: 'Add', class: 'header-btn', isHide: false, isDisabled: false, functionName: 'add' },
      // { label: 'List', class: 'header-btn', isHide: false, isDisabled: false, functionName: 'list' },
      // { label: 'Print', class: 'header-btn', isHide: false, isDisabled: false, functionName: 'print' },
      { label: 'Suspend', class: 'header-btn', isHide: false, isDisabled: false, functionName: 'suspend' },
      { label: 'Authorize', class: 'header-btn', isHide: false, isDisabled: false, functionName: 'authorize' },
      { label: 'Reject', class: 'header-btn', isHide: false, isDisabled: false, functionName: 'reject' },
      { label: 'Approve', class: 'header-btn', isHide: false, isDisabled: false, functionName: 'approve' },
    ]
  };

  buttonSettings: boolean = false

  tableIndex: any;

  TblHConfDocu: TblHConfDocu = new TblHConfDocu()




  accOne: any[] = [];
  productmaster: any[] = [];
  narration: any[] = [];
  menuCode: any[] = [];
  shippedTo: any[] = [];
  billedTo: any[] = [];
  productGroupMaster: any[] = [];
  accountOne: any[] = [];
  copydocTemplate: any;
  corporatTax: any;
  paymentTermsMaster: any;
  unitmaster: any;
  salesRateAgreement: any;
  purchaseRateAgreement: any;
  costCenter: any;
  profitCenter: any;
  salesMan: any;
  division: any;
  department: any;
  job: any;
  otherCentre: any;
  salesOrganization: any;
  distributionChannel: any;
  salesOffice: any;
  salesGroup: any;
  placeOfsupply: any;
  jurisdiction: any;
  warehouse: any;
  currencyMaster: any;
  LandedCostExpense: any;
  taxMaster: any;
  ProductModule: any;
  applicableDate: any;
  incoTerms: any;
  alertCode: any;
  fieldHideDisplay: any;
  document: any;
  employee: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    public masterService: MasterService,
    private confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {


    this.TblHConfDocu.applicableCo = [new TbldConfDocuCo()]
    this.TblHConfDocu.tblAuthorizer = [new TblAuthorizerDto()]
    this.TblHConfDocu.Digilock = new TbldTranDigiLock()
    this.TblHConfDocu.tblHTabHD = []
    this.TblHConfDocu.Digilock.TblDigdUserDetail = [new TblDigdUserDetailDto()]



    // if (this.TblHConfDocu.tblAuthorizer.length < 2) {
    //   const number = 2 - this.TblHConfDocu.tblAuthorizer.length
    //   for (let index = 0; index < number; index++) {
    //     this.TblHConfDocu.tblAuthorizer.push(new TblAuthorizerDto());
    //   }
    // }


    this.TblHConfDocu.tblHTabHD = [
      { HTabHD_SysID: 0, HTabHD_Code: "1001", HTabHD_Name: "Main", HTabHD_HD_Yn: true, HTabHD_GridSysID: null },
      { HTabHD_SysID: 1, HTabHD_Code: "1002", HTabHD_Name: "Other Expenses", HTabHD_HD_Yn: true, HTabHD_GridSysID: null },
      { HTabHD_SysID: 2, HTabHD_Code: "1003", HTabHD_Name: "Payment Terms", HTabHD_HD_Yn: true, HTabHD_GridSysID: null },
      { HTabHD_SysID: 3, HTabHD_Code: "1004", HTabHD_Name: "PO Number", HTabHD_HD_Yn: true, HTabHD_GridSysID: null },
      { HTabHD_SysID: 4, HTabHD_Code: "1005", HTabHD_Name: "Tax", HTabHD_HD_Yn: true, HTabHD_GridSysID: null },
      { HTabHD_SysID: 5, HTabHD_Code: "1006", HTabHD_Name: "Masters", HTabHD_HD_Yn: true, HTabHD_GridSysID: null },
      { HTabHD_SysID: 6, HTabHD_Code: "1007", HTabHD_Name: "Other Fields", HTabHD_HD_Yn: false, HTabHD_GridSysID: null },
      { HTabHD_SysID: 7, HTabHD_Code: "1008", HTabHD_Name: "Journal", HTabHD_HD_Yn: false, HTabHD_GridSysID: null },
      { HTabHD_SysID: 8, HTabHD_Code: "1009", HTabHD_Name: "User Key", HTabHD_HD_Yn: false, HTabHD_GridSysID: null },
      { HTabHD_SysID: 9, HTabHD_Code: "1010", HTabHD_Name: "Vessel Booking", HTabHD_HD_Yn: false, HTabHD_GridSysID: null },
      { HTabHD_SysID: 10, HTabHD_Code: "1011", HTabHD_Name: "QA/QC", HTabHD_HD_Yn: false, HTabHD_GridSysID: null },
      { HTabHD_SysID: 11, HTabHD_Code: "1012", HTabHD_Name: "WH Management", HTabHD_HD_Yn: false, HTabHD_GridSysID: null },
      { HTabHD_SysID: 12, HTabHD_Code: "1013", HTabHD_Name: "Document Attachment", HTabHD_HD_Yn: true, HTabHD_GridSysID: null },
      { HTabHD_SysID: 13, HTabHD_Code: "1014", HTabHD_Name: "LC Details", HTabHD_HD_Yn: false, HTabHD_GridSysID: null },
      { HTabHD_SysID: 14, HTabHD_Code: "1015", HTabHD_Name: "Landed Cost Expense", HTabHD_HD_Yn: false, HTabHD_GridSysID: null }
    ];



    this.getLovData()


  }

  getLovData() {
    this._salesService.getMasterData(apiUrl.accGroup).then((res) => {
      this.accOne = res
    })
    this._salesService.getMasterData(apiUrl.singleCompany).then((res) => {
      this.singleCompany = res
    })
    this._salesService.getMasterData(apiUrl.voucherType).then((res) => {
      this.voucherType = res
    })
    this._salesService.getMasterData(apiUrl.menuCode).then((res) => {
      this.menuCode = res
    })
    this._salesService.getMasterData(apiUrl.printFormat).then((res) => {
      this.printFormat = res;
    })
    this._salesService.getMasterData(apiUrl.productGroupMaster).then((res) => {
      this.productGroupMaster = res;
    })
    this._salesService.getMasterData(apiUrl.accountOne).then((res) => {
      this.accountOne = res;
    })
    this._salesService.getMasterData(apiUrl.copydocTemplate).then((res) => {
      this.copydocTemplate = res;
    })
    this._salesService.getMasterData(apiUrl.corporatTax).then((res) => {
      this.corporatTax = res;
    })
    this._salesService.getMasterData(apiUrl.paymentTermsMaster).then((res) => {
      this.paymentTermsMaster = res;
    })
    this._salesService.getMasterData(apiUrl.unitmaster).then((res) => {
      this.unitmaster = res;
    })
    //
    this._salesService.getMasterData(apiUrl.salesRateAgreement).then((res) => {
      this.salesRateAgreement = res;
    })
    this._salesService.getMasterData(apiUrl.purchaseRateAgreement).then((res) => {
      this.purchaseRateAgreement = res;
    })
    //
    this._salesService.getMasterData(apiUrl.costCenter).then((res) => {
      this.costCenter = res
    })
    this._salesService.getMasterData(apiUrl.profitCenter).then((res) => {
      this.profitCenter = res
    })
    this._salesService.getMasterData(apiUrl.salesMan).then((res) => {
      this.salesMan = res
    })
    this._salesService.getMasterData(apiUrl.division).then((res) => {
      this.division = res
    })
    this._salesService.getMasterData(apiUrl.department).then((res) => {
      this.department = res
    })
    this._salesService.getMasterData(apiUrl.job).then((res) => {
      this.job = res
    })
    this._salesService.getMasterData(apiUrl.otherCentre).then((res) => {
      this.otherCentre = res
    })
    this._salesService.getMasterData(apiUrl.salesOrganization).then((res) => {
      this.salesOrganization = res
    })
    this._salesService.getMasterData(apiUrl.distributionChannel).then((res) => {
      this.distributionChannel = res
    })
    this._salesService.getMasterData(apiUrl.salesOffice).then((res) => {
      this.salesOffice = res
    })
    this._salesService.getMasterData(apiUrl.salesGroup).then((res) => {
      this.salesGroup = res
    })
    this._salesService.getMasterData(apiUrl.placeOfsupply).then((res) => {
      this.placeOfsupply = res
    })
    this._salesService.getMasterData(apiUrl.jurisdiction).then((res) => {
      this.jurisdiction = res
    })
    this._salesService.getMasterData(apiUrl.warehouse).then((res) => {
      this.warehouse = res
    })

    this._salesService.getMasterData(apiUrl.billedTo).then((res) => {
      this.billedTo = res
    })
    this._salesService.getMasterData(apiUrl.shippedTo).then((res) => {
      this.shippedTo = res
    })
    this._salesService.getMasterData(apiUrl.narration).then((res) => {
      this.narration = res
    })

    this._salesService.getMasterData(apiUrl.currencyMaster).then((res) => {
      this.currencyMaster = res
    })
    this._salesService.getMasterData(apiUrl.LandedCostExpense).then((res) => {
      this.LandedCostExpense = res
    })
    this._salesService.getMasterData(apiUrl.taxMaster).then((res) => {
      this.taxMaster = res
    })
    this._salesService.getMasterData(apiUrl.productmaster).then((res) => {
      this.productmaster = res
    })
    this._salesService.getMasterData(apiUrl.ProductModule).then((res) => {
      this.ProductModule = res
    })

    this._salesService.getMasterData(apiUrl.applicableDate).then((res) => {
      this.applicableDate = res
    })
    this._salesService.getMasterData(apiUrl.incoTerms).then((res) => {
      this.incoTerms = res
    })
    this._salesService.getMasterData(apiUrl.alertCode).then((res) => {
      this.alertCode = res
    })
    this._salesService.getMasterData(apiUrl.fieldHideDisplay).then((res) => {
      this.fieldHideDisplay = res
    })
    this._salesService.getMasterData(apiUrl.document).then((res) => {
      this.document = res
    })
    this._salesService.getMasterData(apiUrl.employeeCreation).then((res) => {
      this.employee = res
    })


  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCompany;
        break;

      //
      case 'VoucherTypeCode':
        this.popUpService.popUpData = this.voucherType;
        break;
      case 'MenuCode':
        this.popUpService.popUpData = this.menuCode;
        break;
      case 'printFormatCode':
        this.popUpService.popUpData = this.printFormat;
        break;
      case 'ProductGroupCode':
        this.popUpService.popUpData = this.productGroupMaster;
        break;
      case 'DInterCoCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'CopyDocFromTemplateCode':
        this.popUpService.popUpData = this.copydocTemplate;
        break;
      //
      case 'PdcConvBankCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'PaymentTerms':
        this.popUpService.popUpData = this.paymentTermsMaster;
        break;
      case 'BaseUnit':
        this.popUpService.popUpData = this.unitmaster;
        break;
      case 'CurrencyCode':
        this.popUpService.popUpData = this.currencyMaster;
        break;
      //
      case 'SalesAgreement':
        this.popUpService.popUpData = this.salesRateAgreement;
        break;
      case 'PurchaseAgreement':
        this.popUpService.popUpData = this.purchaseRateAgreement;
        break;
      //
      case 'CostCenterCode':
        this.popUpService.popUpData = this.costCenter;
        break;
      case 'ProfitCenterCode':
        this.popUpService.popUpData = this.profitCenter;
        break;
      case 'SalesmanCode':
        this.popUpService.popUpData = this.salesMan;
        break;
      case 'DivisionCode':
        this.popUpService.popUpData = this.division;
        break;
      case 'DepartmentCode':
        this.popUpService.popUpData = this.department;
        break;
      case 'JobCode':
        this.popUpService.popUpData = this.job;
        break;
      case 'OtherCentreCode':
        this.popUpService.popUpData = this.otherCentre;
        break;
      case 'SalesOrganizationCode':
        this.popUpService.popUpData = this.salesOrganization;
        break;
      case 'DistributionChannelCode':
        this.popUpService.popUpData = this.distributionChannel;
        break;
      case 'SalesOfficeCode':
        this.popUpService.popUpData = this.salesOffice;
        break;
      case 'SalesGroupCode':
        this.popUpService.popUpData = this.salesGroup;
        break;
      case 'PlaceOfSupplyCode':
        this.popUpService.popUpData = this.placeOfsupply;
        break;
      case 'JurisdictionCode':
        this.popUpService.popUpData = this.jurisdiction;
        break;
      case 'WarehouseOneCode':
        this.popUpService.popUpData = this.warehouse;
        break;
      case 'WarehouseTwoCode':
        this.popUpService.popUpData = this.warehouse;
        break;
      //
      case 'FirstAccGroup':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'SecondAccGroup':
        this.popUpService.popUpData = this.accountOne;
        break;
      //
      case 'CustomerAccGroupCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'VendorGroupCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      //
      case 'AdditionalExpenseCustomerCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'AdditionalExpenseCurrencyCode':
        this.popUpService.popUpData = this.currencyMaster;
        break;
      case 'AdditionalExpenseNarrationCode':
        this.popUpService.popUpData = this.narration;
        break;
      case 'LandedCostCode':
        this.popUpService.popUpData = this.LandedCostExpense;
        break;
      case 'ShippedToCode':
        this.popUpService.popUpData = this.shippedTo;
        break;
      case 'BilledToCode':
        this.popUpService.popUpData = this.billedTo;
        break;
      //
      case 'AdditionalExpenseVendorCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'AdditionalExpenseVendorCurrCode':
        this.popUpService.popUpData = this.currencyMaster;
        break;
      case 'AdditionalExpenseVendorNarraCode':
        this.popUpService.popUpData = this.narration;
        break;
      //
      case 'TaxGroupOneCode':
        this.popUpService.popUpData = this.taxMaster;
        break;
      case 'TaxGroupTwoCode':
        this.popUpService.popUpData = this.taxMaster;
        break;
      case 'TaxGroupThreeCode':
        this.popUpService.popUpData = this.taxMaster;
        break;
      case 'TaxAccount':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'CorporateTaxAccountGroup':
        this.popUpService.popUpData = this.corporatTax;
        break;
      //
      case 'DocumentMenuCode':
        this.popUpService.popUpData = this.menuCode;
        break;
      case 'DocumentVoucherTypeCode':
        this.popUpService.popUpData = this.voucherType;
        break;
      //
      case 'ProductModuleCode':
        this.popUpService.popUpData = this.ProductModule;
        break;
      case 'NarrationCode':
        this.popUpService.popUpData = this.narration;
        break;
      case 'ProductCode':
        this.popUpService.popUpData = this.productmaster;
        break;
      case 'IncoTerms':
        this.popUpService.popUpData = this.incoTerms;
        break;
      case 'ApplicationDateCode':
        this.popUpService.popUpData = this.applicableDate;
        break;
      case 'EmployeeCode':
        this.popUpService.popUpData = this.employee;
        break;
      //
      case 'TblHMBAccDrCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'TblHMBAccCrCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'TblHMBPAccDrCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'TblHMBPAccCrCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'TblHMPettyDrCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'TblHMPettyCrCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'TblHMJouDrCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      case 'TblHMJouCrCode':
        this.popUpService.popUpData = this.accountOne;
        break;
      //
      case 'FieldHideOrDisCode':
        this.popUpService.popUpData = this.fieldHideDisplay;
        break;
      case 'FieldAlertCode':
        this.popUpService.popUpData = this.alertCode;
        break;
      case 'FieldNarrationCode':
        this.popUpService.popUpData = this.narration;
        break;
      //
      case 'TabMenuCode':
        this.popUpService.popUpData = this.menuCode;
        break;
      case 'TabFormCode':
        this.popUpService.popUpData = this.menuCode;
        break;
      //
      case 'LinkingFromScreenCode':
        this.popUpService.popUpData = this.menuCode;
        break;
      case 'LinkingToScreenCode':
        this.popUpService.popUpData = this.menuCode;
        break;
      //
      case 'DocumentCode':
        this.popUpService.popUpData = this.document;
        break;











      case 'AdditionalExpGroup':
        this.popUpService.popUpData = this.accOne;
        break;
      case 'ExpenseAddToCustSupplier':
        this.popUpService.popUpData = this.accOne;
        break;
      case 'InterCoGroup':
        this.popUpService.popUpData = this.accOne;
        break;
      case 'DirectExpAccGroup':
        this.popUpService.popUpData = this.accOne;
        break;
      case 'InDirectExpAccGroup':
        this.popUpService.popUpData = this.accOne;
        break;




      case 'InDirectExpAccGroup':
        this.popUpService.popUpData = this.accOne;
        break;
      case 'InDirectExpAccGroup':
        this.popUpService.popUpData = this.accOne;
        break;

      case 'TransactionMenuCode':
        this.popUpService.popUpData = this.menuCode;
        break;
      case 'ActAndDeactCode':
        break;
      case 'AlertsEmpCodeM':
        break

      case 'AuthorizerCode':
        break;
      case 'EmployeeDeptCode':
        break;
      case 'CriteriaCode':
        break



      case 'SalesGroupCode':
        break;
      case 'CustomerGroupCode':
        break;
      // 

      case 'ProductGroupCode':
        break;
      case 'PriceListGroupCode':
        break;


      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {
      case 'ApplicableCompanyCode':
        this.TblHConfDocu.applicableCo[this.tableIndex].DcCDocu_SingleCo_SysID = event.SingleCo_SysID
        this.TblHConfDocu.applicableCo[this.tableIndex].DcICDocu_SingleCo_Code = event.SingleCo_Code
        this.TblHConfDocu.applicableCo[this.tableIndex].DcICDocu_SingleCo_Name = event.SingleCo_Name
        break;
      case 'ActAndDeactCode':
        break;



      // case 'ValidationMenuCode':
      //   this.TblHConfDocu.HCDocu_MiddleMenu_SysID = event.sysId
      //   this.TblHConfDocu.HCDocu_MiddleMenu_Code = event.code
      //   this.TblHConfDocu.HCDocu_MiddleMenu_Name = event.name

      //   break


      case 'TransactionMenuCode':
        this.TblHConfDocu.HCDocu_TransMenu_SysID = event.HMenu_SysID
        this.TblHConfDocu.HCDocu_TransMenu_Code = event.HMenu_Code
        this.TblHConfDocu.HCDocu_TransMenu_Name = event.HMenu_Name

        break
      //already hided
      // case 'TransactionMenuCode':
      // this.TblHConfDocu.HCDocu_TransMenu_SysID = event.sysId
      // this.TblHConfDocu.HCDocu_TransMenu_Code = event.code
      // this.TblHConfDocu.HCDocu_TransMenu_Name = event.name

      // break
      //---------------------------------------------------------------

      case 'ValidationMenuCode':
        this.TblHConfDocu.HCDocu_MiddValid_SysID = event.sysId
        this.TblHConfDocu.HCDocu_MiddValid_Code = event.code
        this.TblHConfDocu.HCDocu_MiddValid_Name = event.name
        break
      case 'AuthorizerCode':
        this.TblHConfDocu.tblAuthorizer[this.tableIndex].HTrasAutho_SysID = event.authorizerSysID
        this.TblHConfDocu.tblAuthorizer[this.tableIndex].HTrasAutho_Code = event.authorizerCode
        this.TblHConfDocu.tblAuthorizer[this.tableIndex].HTrasAutho_Name = event.authorizerName
        break;
      case 'EmployeeDeptCode':
        this.TblHConfDocu.tblAuthorizer[this.tableIndex].HTrasDept_SysID = event.deptSysID
        this.TblHConfDocu.tblAuthorizer[this.tableIndex].HTrasDep_Code = event.deptCode
        this.TblHConfDocu.tblAuthorizer[this.tableIndex].HTrasDep_Name = event.deptName
        break;
      case 'CriteriaCode':
        this.TblHConfDocu.tblAuthorizer[this.tableIndex].HCrit_SysID = event.criteriaSysID
        this.TblHConfDocu.tblAuthorizer[this.tableIndex].HCrit_Code = event.criteriaCode
        this.TblHConfDocu.tblAuthorizer[this.tableIndex].HCrit_Name = event.criteriaName
        break
      //
      case 'FieldHideOrDisCode':
        this.TblHConfDocu.tblFieldMaster[this.tableIndex].HFieldMaster_SysID = event.HFieldDispHide_SysID
        this.TblHConfDocu.tblFieldMaster[this.tableIndex].HFieldMaster_Code = event.HFieldDispHide_Code
        this.TblHConfDocu.tblFieldMaster[this.tableIndex].HFieldMaster_Name = event.HFieldDispHide_Name
        break;
      case 'FieldAlertCode':
        this.TblHConfDocu.tblFieldMaster[this.tableIndex].HField_Alert_SysID = event.HAlert_SysID
        this.TblHConfDocu.tblFieldMaster[this.tableIndex].HField_Alert_Code = event.HAlert_Code
        this.TblHConfDocu.tblFieldMaster[this.tableIndex].HField_Alert_Name = event.HAlert_Name
        break;
      case 'FieldNarrationCode':
        this.TblHConfDocu.tblFieldMaster[this.tableIndex].HField_Narration_SysID = event.HNarraMast_SysID
        this.TblHConfDocu.tblFieldMaster[this.tableIndex].HField_Narration_Code = event.HNarraMast_Code
        this.TblHConfDocu.tblFieldMaster[this.tableIndex].HField_Narration_Name = event.HNarraMast_Name
        break;
      //
      // case 'TabMenuCode':
      //   this.TblHConfDocu.tblHTabHD[this.tableIndex].HTabHD_Menu_SysID = event.HMenu_SysID
      //   this.TblHConfDocu.tblHTabHD[this.tableIndex].HTabHD_Menu_Code = event.HMenu_Code
      //   this.TblHConfDocu.tblHTabHD[this.tableIndex].HTabHD_Menu_Name = event.HMenu_Name
      //   break;
      //
      case 'LinkingFromScreenCode':
        this.TblHConfDocu.formLinking[this.tableIndex].HLinkBase_Screen_MenuCode = event.HMenu_SysID
        this.TblHConfDocu.formLinking[this.tableIndex].HLinkBase_Screen_MenuCode = event.HMenu_Code
        this.TblHConfDocu.formLinking[this.tableIndex].HLinkBase_Screen_MenuName = event.HMenu_Name
        break;
      case 'LinkingToScreenCode':
        this.TblHConfDocu.formLinking[this.tableIndex].HLinkCalling_Screen_MenuCode = event.HMenu_SysID
        this.TblHConfDocu.formLinking[this.tableIndex].HLinkCalling_Screen_MenuCode = event.HMenu_Code
        this.TblHConfDocu.formLinking[this.tableIndex].HLinkCalling_Screen_MenuName = event.HMenu_Name
        break;












      // case 'SalesGroupCode':
      //   this.TblHConfDocu.salesAccSelection[this.tableIndex].HmS_SalSecAcc_Code = event.salesGroupCode
      //   this.TblHConfDocu.salesAccSelection[this.tableIndex].HmS_SalSecAcc_Name = event.salesGroupName
      //   break;
      // case 'CustomerCode':
      //   this.TblHConfDocu.customerAccSelection[this.tableIndex].HmS_SalCusAcc_Code = event.customerCode
      //   this.TblHConfDocu.customerAccSelection[this.tableIndex].HmS_SalCusAcc_Name = event.customerName
      //   break;

      //
      case 'VoucherTypeCode':
        this.TblHConfDocu.voucherTypeSelection[this.tableIndex].HVouType_SysID = event.HVouType_SysID
        this.TblHConfDocu.voucherTypeSelection[this.tableIndex].HVouType_Code = event.HVouType_Code
        this.TblHConfDocu.voucherTypeSelection[this.tableIndex].HVouType_Name = event.HVouType_Name
        break;
      case 'MenuCode':
        this.TblHConfDocu.printFormatSelection[this.tableIndex].HMenu_SysID = event.HMenu_SysID
        this.TblHConfDocu.printFormatSelection[this.tableIndex].HMenu_Code = event.HMenu_Code
        this.TblHConfDocu.printFormatSelection[this.tableIndex].HMenu_Name = event.HMenu_Name
        break;
      case 'printFormatCode':
        this.TblHConfDocu.printFormatSelection[this.tableIndex].HPFormat_SysID = event.HPFormat_SysID
        this.TblHConfDocu.printFormatSelection[this.tableIndex].HPFormat_Code = event.HPFormat_Code
        this.TblHConfDocu.printFormatSelection[this.tableIndex].HPFormat_Name = event.HPFormat_Name
        break;
      case 'ProductGroupCode':
        this.TblHConfDocu.productGrpSelection[this.tableIndex].HProdGroup_SysID = event.HProdGroup_SysID
        this.TblHConfDocu.productGrpSelection[this.tableIndex].HProdGroup_Code = event.HProdGroup_Code
        this.TblHConfDocu.productGrpSelection[this.tableIndex].HProdGroup_Short_Name = event.HProdGroup_Short_Name
        break;
      case 'DInterCoCode':
        this.TblHConfDocu.interCompanySelection[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.interCompanySelection[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.interCompanySelection[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'CopyDocFromTemplateCode':
        this.TblHConfDocu.copyDocFromSelection[this.tableIndex].HCDTemp_SysID = event.HCDTemp_SysID
        this.TblHConfDocu.copyDocFromSelection[this.tableIndex].HCDTemp_Code = event.HCDTemp_Code
        this.TblHConfDocu.copyDocFromSelection[this.tableIndex].HCDTemp_Name = event.HCDTemp_Name
        break;
      //
      case 'PdcConvBankCode':
        this.TblHConfDocu.PDCbankDetails[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.PDCbankDetails[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.PDCbankDetails[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'CorporateTaxAccountGroup':
        this.TblHConfDocu.CorporateTax[this.tableIndex].HCorpTax_SysID = event.HCorpTax_SysID
        this.TblHConfDocu.CorporateTax[this.tableIndex].HCorpTax_Code = event.HCorpTax_Code
        this.TblHConfDocu.CorporateTax[this.tableIndex].HCorpTax_Name = event.HCorpTax_Name
        break;
      case 'PaymentTerms':
        this.TblHConfDocu.PaymentTermsSelection[this.tableIndex].HPayTerm_SysID = event.HPayTerm_SysID
        this.TblHConfDocu.PaymentTermsSelection[this.tableIndex].HPayTerm_Code = event.HPayTerm_Code
        this.TblHConfDocu.PaymentTermsSelection[this.tableIndex].HPayTerm_Name = event.HPayTerm_Name
        break;
      case 'BaseUnit':
        this.TblHConfDocu.productUnitGroupSelection[this.tableIndex].HFirstUnit_SysID = event.HFirstUnit_SysID
        this.TblHConfDocu.productUnitGroupSelection[this.tableIndex].HFirstUnit_Base_Unit = event.HFirstUnit_Base_Unit
        this.TblHConfDocu.productUnitGroupSelection[this.tableIndex].HFirstUnit_Unit_Frac = event.HFirstUnit_Unit_Frac
        break;
      case 'CurrencyCode':
        this.TblHConfDocu.currencySelection[this.tableIndex].HCurrFirst_SysID = event.HCurrFirst_SysID
        this.TblHConfDocu.currencySelection[this.tableIndex].HCurrFirst_Code = event.HCurrFirst_Code
        this.TblHConfDocu.currencySelection[this.tableIndex].HCurrFirst_Name = event.HCurrFirst_Name
        this.TblHConfDocu.currencySelection[this.tableIndex].HCurrFirst_Symbol = event.HCurrFirst_Symbol
        this.TblHConfDocu.currencySelection[this.tableIndex].HCurrFirst_Rate = event.HCurrFirst_Rate
        this.TblHConfDocu.currencySelection[this.tableIndex].HCurrFirst_Date = event.HCurrFirst_Date
        break;
      //
      case 'SalesAgreement':
        this.TblHConfDocu.salesRateAgreementSelection[this.tableIndex].HSalAgree_SysID = event.HSalAgree_SysID
        this.TblHConfDocu.salesRateAgreementSelection[this.tableIndex].HSalAgree_Code = event.HSalAgree_Code
        this.TblHConfDocu.salesRateAgreementSelection[this.tableIndex].HSalAgree_Name = event.HSalAgree_Name
        this.TblHConfDocu.salesRateAgreementSelection[this.tableIndex].HSalAgree_From_Date = event.HSalAgree_From_Date
        this.TblHConfDocu.salesRateAgreementSelection[this.tableIndex].HSalAgree_to_Date = event.HSalAgree_to_Date
        break;
      case 'PurchaseAgreement':
        this.TblHConfDocu.purchaseRateAgreementSelection[this.tableIndex].HPur_Agree_SysID = event.HPur_Agree_SysID
        this.TblHConfDocu.purchaseRateAgreementSelection[this.tableIndex].HPur_Agree_Code = event.HPur_Agree_Code
        this.TblHConfDocu.purchaseRateAgreementSelection[this.tableIndex].HPur_Agree_Name = event.HPur_Agree_Name
        this.TblHConfDocu.purchaseRateAgreementSelection[this.tableIndex].HPur_Agree_From_Date = event.HPur_Agree_From_Date
        this.TblHConfDocu.purchaseRateAgreementSelection[this.tableIndex].HPur_Agree_to_Date = event.HPur_Agree_to_Date
        break;
      //
      case 'CostCenterCode':
        this.TblHConfDocu.costCenterSelection[this.tableIndex].HCostCent_SysID = event.HCostCent_SysID
        this.TblHConfDocu.costCenterSelection[this.tableIndex].HCostCent_Code = event.HCostCent_Code
        this.TblHConfDocu.costCenterSelection[this.tableIndex].HCostCent_Name = event.HCostCent_Name
        break;
      case 'ProfitCenterCode':
        this.TblHConfDocu.profitCenterSelection[this.tableIndex].HProfCent_SysID = event.HProfCent_SysID
        this.TblHConfDocu.profitCenterSelection[this.tableIndex].HProfCent_Code = event.HProfCent_Code
        this.TblHConfDocu.profitCenterSelection[this.tableIndex].HProfCent_Name = event.HProfCent_Name
        break;
      case 'SalesmanCode':
        this.TblHConfDocu.salesmanSelection[this.tableIndex].HSman_SysID = event.HSman_SysID
        this.TblHConfDocu.salesmanSelection[this.tableIndex].HSman_Code = event.HSman_Code
        this.TblHConfDocu.salesmanSelection[this.tableIndex].HSman_Name = event.HSman_Name
        break;
      case 'DivisionCode':
        this.TblHConfDocu.divisionSelection[this.tableIndex].HDivision_SysID = event.HDivision_SysID
        this.TblHConfDocu.divisionSelection[this.tableIndex].HDivision_Code = event.HDivision_Code
        this.TblHConfDocu.divisionSelection[this.tableIndex].HDivision_Name = event.HDivision_Name
        break;

      case 'DepartmentCode':
        this.TblHConfDocu.departmentSelection[this.tableIndex].HDept_SysID = event.HDept_SysID
        this.TblHConfDocu.departmentSelection[this.tableIndex].HDept_Code = event.HDept_Code
        this.TblHConfDocu.departmentSelection[this.tableIndex].HDept_Name = event.HDept_Name
        break;
      case 'JobCode':
        this.TblHConfDocu.jobSelection[this.tableIndex].HJob_SysID = event.HJob_SysID
        this.TblHConfDocu.jobSelection[this.tableIndex].HJob_Code = event.HJob_Code
        this.TblHConfDocu.jobSelection[this.tableIndex].HJob_Name = event.HJob_Name
        break;
      case 'OtherCentreCode':
        this.TblHConfDocu.otherCenterSelection[this.tableIndex].HOthCentre_SysID = event.HOthCentre_SysID
        this.TblHConfDocu.otherCenterSelection[this.tableIndex].HOthCentre_Code = event.HOthCentre_Code
        this.TblHConfDocu.otherCenterSelection[this.tableIndex].HOthCentre_Name = event.HOthCentre_Name
        break;
      case 'SalesOrganizationCode':
        this.TblHConfDocu.salesOrganizationSelection[this.tableIndex].HSalesOrg_SysID = event.HSalesOrg_SysID
        this.TblHConfDocu.salesOrganizationSelection[this.tableIndex].HSalesOrg_Code = event.HSalesOrg_Code
        this.TblHConfDocu.salesOrganizationSelection[this.tableIndex].HSalesOrg_Name = event.HSalesOrg_Name
        break;
      case 'DistributionChannelCode':
        this.TblHConfDocu.distributionChannelSelection[this.tableIndex].HDistChanel_SysID = event.HDistChanel_SysID
        this.TblHConfDocu.distributionChannelSelection[this.tableIndex].HDistChanel_Code = event.HDistChanel_Code
        this.TblHConfDocu.distributionChannelSelection[this.tableIndex].HDistChanel_Name = event.HDistChanel_Name
        break;
      case 'SalesOfficeCode':
        this.TblHConfDocu.salesOfficeSelection[this.tableIndex].HSoffice_SysID = event.HSoffice_SysID
        this.TblHConfDocu.salesOfficeSelection[this.tableIndex].HSoffice_Code = event.HSoffice_Code
        this.TblHConfDocu.salesOfficeSelection[this.tableIndex].HSoffice_Name = event.HSoffice_Name
        break;
      case 'SalesGroupCode':
        this.TblHConfDocu.salesGroupSelection[this.tableIndex].HSalGroup_SysID = event.HSalGroup_SysID
        this.TblHConfDocu.salesGroupSelection[this.tableIndex].HSalGroup_Code = event.HSalGroup_Code
        this.TblHConfDocu.salesGroupSelection[this.tableIndex].HSalGroup_Name = event.HSalGroup_Name
        break;
      case 'PlaceOfSupplyCode':
        this.TblHConfDocu.placeOfSupplySelection[this.tableIndex].HPlaceSupply_SysID = event.HPlaceSupply_SysID
        this.TblHConfDocu.placeOfSupplySelection[this.tableIndex].HPlaceSupply_Code = event.HPlaceSupply_Code
        this.TblHConfDocu.placeOfSupplySelection[this.tableIndex].HPlaceSupply_Name = event.HPlaceSupply_Name
        break;
      case 'JurisdictionCode':
        this.TblHConfDocu.jurisdictionChannelSelection[this.tableIndex].HJurisd_SysID = event.HJurisd_SysID
        this.TblHConfDocu.jurisdictionChannelSelection[this.tableIndex].HJurisd_Code = event.HJurisd_Code
        this.TblHConfDocu.jurisdictionChannelSelection[this.tableIndex].HJurisd_Name = event.HJurisd_Name
        break;
      case 'WarehouseOneCode':
        this.TblHConfDocu.warehouseOneSelection[this.tableIndex].HWh_SysID = event.HWh_SysID
        this.TblHConfDocu.warehouseOneSelection[this.tableIndex].HWh_Code = event.HWh_Code
        this.TblHConfDocu.warehouseOneSelection[this.tableIndex].HWh_Name = event.HWh_Name
        break;
      case 'WarehouseTwoCode':
        this.TblHConfDocu.warehouseTwoSelection[this.tableIndex].HWh_SysID = event.HWh_SysID
        this.TblHConfDocu.warehouseTwoSelection[this.tableIndex].HWh_Code = event.HWh_Code
        this.TblHConfDocu.warehouseTwoSelection[this.tableIndex].HWh_Name = event.HWh_Name
        break;
      //
      case 'FirstAccGroup':
        this.TblHConfDocu.firstAccGroupSelection[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.firstAccGroupSelection[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.firstAccGroupSelection[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        this.TblHConfDocu.firstAccGroupSelection[this.tableIndex].HAccOne_CrLimit = event.HAccOne_CrLimit
        this.TblHConfDocu.firstAccGroupSelection[this.tableIndex].HAccOne_CrLimit_Days = event.HAccOne_CrLimit_Days
        this.TblHConfDocu.firstAccGroupSelection[this.tableIndex].HAccOne_Insu_CrLimit = event.HAccOne_Insu_CrLimit
        this.TblHConfDocu.firstAccGroupSelection[this.tableIndex].HAccOne_Insu_CrLimit_Days = event.HAccOne_Insu_CrLimit_Days
        this.TblHConfDocu.firstAccGroupSelection[this.tableIndex].HAccOne_Block_CrLimit = event.HAccOne_Block_CrLimit
        this.TblHConfDocu.firstAccGroupSelection[this.tableIndex].HAccOne_Block_CrLimit_Days = event.HAccOne_Block_CrLimit_Days
        this.TblHConfDocu.firstAccGroupSelection[this.tableIndex].HAccOne_Creation_Date = event.HAccOne_Creation_Date
        break;
      //
      case 'SecondAccGroup':
        this.TblHConfDocu.secondAccGroupSelection[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.secondAccGroupSelection[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.secondAccGroupSelection[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        this.TblHConfDocu.secondAccGroupSelection[this.tableIndex].HAccOne_CrLimit = event.HAccOne_CrLimit
        this.TblHConfDocu.secondAccGroupSelection[this.tableIndex].HAccOne_CrLimit_Days = event.HAccOne_CrLimit_Days
        this.TblHConfDocu.secondAccGroupSelection[this.tableIndex].HAccOne_Insu_CrLimit = event.HAccOne_Insu_CrLimit
        this.TblHConfDocu.secondAccGroupSelection[this.tableIndex].HAccOne_Insu_CrLimit_Days = event.HAccOne_Insu_CrLimit_Days
        this.TblHConfDocu.secondAccGroupSelection[this.tableIndex].HAccOne_Block_CrLimit = event.HAccOne_Block_CrLimit
        this.TblHConfDocu.secondAccGroupSelection[this.tableIndex].HAccOne_Block_CrLimit_Days = event.HAccOne_Block_CrLimit_Days
        this.TblHConfDocu.secondAccGroupSelection[this.tableIndex].HAccOne_Creation_Date = event.HAccOne_Creation_Date
        break;
      //
      case 'CustomerAccGroupCode':
        this.TblHConfDocu.customerAccGroupSelection[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.customerAccGroupSelection[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.customerAccGroupSelection[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        this.TblHConfDocu.customerAccGroupSelection[this.tableIndex].HAccOne_CrLimit = event.HAccOne_CrLimit
        this.TblHConfDocu.customerAccGroupSelection[this.tableIndex].HAccOne_CrLimit_Days = event.HAccOne_CrLimit_Days
        this.TblHConfDocu.customerAccGroupSelection[this.tableIndex].HAccOne_Insu_CrLimit = event.HAccOne_Insu_CrLimit
        this.TblHConfDocu.customerAccGroupSelection[this.tableIndex].HAccOne_Insu_CrLimit_Days = event.HAccOne_Insu_CrLimit_Days
        this.TblHConfDocu.customerAccGroupSelection[this.tableIndex].HAccOne_Block_CrLimit = event.HAccOne_Block_CrLimit
        this.TblHConfDocu.customerAccGroupSelection[this.tableIndex].HAccOne_Block_CrLimit_Days = event.HAccOne_Block_CrLimit_Days
        this.TblHConfDocu.customerAccGroupSelection[this.tableIndex].HAccOne_Creation_Date = event.HAccOne_Creation_Date
        break;
      case 'VendorGroupCode':
        this.TblHConfDocu.VendorAccGroupSelection[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.VendorAccGroupSelection[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.VendorAccGroupSelection[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        this.TblHConfDocu.VendorAccGroupSelection[this.tableIndex].HAccOne_CrLimit = event.HAccOne_CrLimit
        this.TblHConfDocu.VendorAccGroupSelection[this.tableIndex].HAccOne_CrLimit_Days = event.HAccOne_CrLimit_Days
        this.TblHConfDocu.VendorAccGroupSelection[this.tableIndex].HAccOne_Insu_CrLimit = event.HAccOne_Insu_CrLimit
        this.TblHConfDocu.VendorAccGroupSelection[this.tableIndex].HAccOne_Insu_CrLimit_Days = event.HAccOne_Insu_CrLimit_Days
        this.TblHConfDocu.VendorAccGroupSelection[this.tableIndex].HAccOne_Block_CrLimit = event.HAccOne_Block_CrLimit
        this.TblHConfDocu.VendorAccGroupSelection[this.tableIndex].HAccOne_Block_CrLimit_Days = event.HAccOne_Block_CrLimit_Days
        this.TblHConfDocu.VendorAccGroupSelection[this.tableIndex].HAccOne_Creation_Date = event.HAccOne_Creation_Date
        break;
      //
      case 'AdditionalExpenseCustomerCode':
        this.TblHConfDocu.AdditionalExpenseCustomer[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.AdditionalExpenseCustomer[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.AdditionalExpenseCustomer[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'AdditionalExpenseCurrencyCode':
        this.TblHConfDocu.AdditionalExpenseCustomer[this.tableIndex].HCurrFirst_SysID = event.HCurrFirst_SysID
        this.TblHConfDocu.AdditionalExpenseCustomer[this.tableIndex].HCurrFirst_Code = event.HCurrFirst_Code
        this.TblHConfDocu.AdditionalExpenseCustomer[this.tableIndex].HCurrFirst_Name = event.HCurrFirst_Name
        this.TblHConfDocu.AdditionalExpenseCustomer[this.tableIndex].HCurrFirst_Rate = event.HCurrFirst_Rate
        break;
      case 'AdditionalExpenseNarrationCode':
        this.TblHConfDocu.AdditionalExpenseCustomer[this.tableIndex].HNarraMast_SysID = event.HNarraMast_SysID
        this.TblHConfDocu.AdditionalExpenseCustomer[this.tableIndex].HNarraMast_Code = event.HNarraMast_Code
        this.TblHConfDocu.AdditionalExpenseCustomer[this.tableIndex].HNarraMast_Name = event.HNarraMast_Name
        break;
      case 'LandedCostCode':
        this.TblHConfDocu.TblHMidLandCost[this.tableIndex].HLmCost_SysID = event.HLmCost_SysID
        this.TblHConfDocu.TblHMidLandCost[this.tableIndex].HLmCost_Code = event.HLmCost_Code
        this.TblHConfDocu.TblHMidLandCost[this.tableIndex].HLmCost_Name = event.HLmCost_Name
        this.TblHConfDocu.TblHMidLandCost[this.tableIndex].HLmCost_Perce = event.HLmCost_Perce
        break;
      case 'ShippedToCode':
        this.TblHConfDocu.TblHMShippedto[this.tableIndex].HShippedto_SysID = event.HShippedto_SysID
        this.TblHConfDocu.TblHMShippedto[this.tableIndex].HShippedto_Code = event.HShippedto_Code
        this.TblHConfDocu.TblHMShippedto[this.tableIndex].HShippedto_Name = event.HShippedto_Name
        break;
      case 'BilledToCode':
        this.TblHConfDocu.TblHMBilledto[this.tableIndex].HBilledto_SysID = event.HBilledto_SysID
        this.TblHConfDocu.TblHMBilledto[this.tableIndex].HBilledto_Code = event.HBilledto_Code
        this.TblHConfDocu.TblHMBilledto[this.tableIndex].HBilledto_Name = event.HBilledto_Name
        break;
      //
      case 'AdditionalExpenseVendorCode':
        this.TblHConfDocu.AdditionalExpenseVendor[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.AdditionalExpenseVendor[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.AdditionalExpenseVendor[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'AdditionalExpenseVendorCurrCode':
        this.TblHConfDocu.AdditionalExpenseVendor[this.tableIndex].HCurrFirst_SysID = event.HCurrFirst_SysID
        this.TblHConfDocu.AdditionalExpenseVendor[this.tableIndex].HCurrFirst_Code = event.HCurrFirst_Code
        this.TblHConfDocu.AdditionalExpenseVendor[this.tableIndex].HCurrFirst_Name = event.HCurrFirst_Name
        this.TblHConfDocu.AdditionalExpenseVendor[this.tableIndex].HCurrFirst_Rate = event.HCurrFirst_Rate
        break;
      case 'AdditionalExpenseVendorNarraCode':
        this.TblHConfDocu.AdditionalExpenseVendor[this.tableIndex].HNarraMast_SysID = event.HNarraMast_SysID
        this.TblHConfDocu.AdditionalExpenseVendor[this.tableIndex].HNarraMast_Code = event.HNarraMast_Code
        this.TblHConfDocu.AdditionalExpenseVendor[this.tableIndex].HNarraMast_Name = event.HNarraMast_Name
        break;
      //
      case 'TaxGroupOneCode':
        this.TblHConfDocu.TaxOne[this.tableIndex].HFirstRateTax_SysID = event.HFirstRateTax_SysID
        this.TblHConfDocu.TaxOne[this.tableIndex].HFirstRateTax_Code = event.HFirstRateTax_Code
        this.TblHConfDocu.TaxOne[this.tableIndex].HFirstRateTax_Name = event.HFirstRateTax_Name
        break;
      case 'TaxGroupTwoCode':
        this.TblHConfDocu.TaxTwo[this.tableIndex].HFirstRateTax_SysID = event.HFirstRateTax_SysID
        this.TblHConfDocu.TaxTwo[this.tableIndex].HFirstRateTax_Code = event.HFirstRateTax_Code
        this.TblHConfDocu.TaxTwo[this.tableIndex].HFirstRateTax_Name = event.HFirstRateTax_Name
        break;
      case 'TaxGroupThreeCode':
        this.TblHConfDocu.TaxThree[this.tableIndex].HFirstRateTax_SysID = event.HFirstRateTax_SysID
        this.TblHConfDocu.TaxThree[this.tableIndex].HFirstRateTax_Code = event.HFirstRateTax_Code
        this.TblHConfDocu.TaxThree[this.tableIndex].HFirstRateTax_Name = event.HFirstRateTax_Name
        break;
      case 'TaxAccount':
        this.TblHConfDocu.TaxAccount[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.TaxAccount[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.TaxAccount[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      //
      case 'DocumentMenuCode':
        this.TblHConfDocu.DocumentStartingNumber[this.tableIndex].HMenu_SysID = event.HMenu_SysID
        this.TblHConfDocu.DocumentStartingNumber[this.tableIndex].HMenu_Code = event.HMenu_Code
        this.TblHConfDocu.DocumentStartingNumber[this.tableIndex].HMenu_Name = event.HMenu_Name
        break;

      case 'DocumentVoucherTypeCode':
        this.TblHConfDocu.DocumentStartingNumber[this.tableIndex].HVouType_SysID = event.HVouType_SysID
        this.TblHConfDocu.DocumentStartingNumber[this.tableIndex].HVouType_Code = event.HVouType_Code
        this.TblHConfDocu.DocumentStartingNumber[this.tableIndex].HVouType_Name = event.HVouType_Name
        break;


      case 'DocumentCode':
        this.TblHConfDocu.TblHMDocuMaster[this.tableIndex].HDocMaster_SysID = event.HDocMaster_SysID
        this.TblHConfDocu.TblHMDocuMaster[this.tableIndex].HDocMaster_Code = event.HDocMaster_Code
        this.TblHConfDocu.TblHMDocuMaster[this.tableIndex].HDocMaster_Name = event.HDocMaster_Name
        break;
      //
      case 'ProductModuleCode':
        this.TblHConfDocu.TblHMProdModu[this.tableIndex].HProdModule_SysID = event.HProdModule_SysID
        this.TblHConfDocu.TblHMProdModu[this.tableIndex].HProdModule_Code = event.HProdModule_Code
        this.TblHConfDocu.TblHMProdModu[this.tableIndex].HProdModule_Name = event.HProdModule_Name
        break;
      case 'NarrationCode':
        this.TblHConfDocu.TblHMNarration[this.tableIndex].HNarraMast_SysID = event.HNarraMast_SysID
        this.TblHConfDocu.TblHMNarration[this.tableIndex].HNarraMast_Code = event.HNarraMast_Code
        this.TblHConfDocu.TblHMNarration[this.tableIndex].HNarraMast_Name = event.HNarraMast_Name
        break;
      case 'ProductCode':
        this.TblHConfDocu.TblHMProdMast[this.tableIndex].HProd_SysID = event.HProd_SysID
        this.TblHConfDocu.TblHMProdMast[this.tableIndex].HProd_Code = event.HProd_Code
        this.TblHConfDocu.TblHMProdMast[this.tableIndex].HProd_Short_Name = event.HProd_Short_Name
        this.TblHConfDocu.TblHMProdMast[this.tableIndex].HProd_Long_Name = event.HProd_Long_Name
        break;
      case 'IncoTerms':
        this.TblHConfDocu.TblHMInco[this.tableIndex].HInco_SysID = event.HInco_SysID
        this.TblHConfDocu.TblHMInco[this.tableIndex].HInco_Code = event.HInco_Code
        this.TblHConfDocu.TblHMInco[this.tableIndex].HInco_Name = event.HInco_Name
        this.TblHConfDocu.TblHMInco[this.tableIndex].HInco_Days = event.HInco_Days
        break;
      case 'ApplicationDateCode':
        this.TblHConfDocu.TblHMAppDate[this.tableIndex].HAppDate_SysID = event.HAppDate_SysID
        this.TblHConfDocu.TblHMAppDate[this.tableIndex].HAppDate_Code = event.HAppDate_Code
        this.TblHConfDocu.TblHMAppDate[this.tableIndex].HAppDate_Name = event.HAppDate_Name
        break;
      case 'EmployeeCode':
        this.TblHConfDocu.TblHMEmp[this.tableIndex].HEmpl_SysID = event.HEmpl_SysID
        this.TblHConfDocu.TblHMEmp[this.tableIndex].HEmpl_Code = event.HEmpl_Code
        this.TblHConfDocu.TblHMEmp[this.tableIndex].HEmpl_Name = event.HEmpl_Name
        break;
      //
      case 'TblHMBAccDrCode':
        this.TblHConfDocu.TblHMBAccDr[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.TblHMBAccDr[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.TblHMBAccDr[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'TblHMBAccCrCode':
        this.TblHConfDocu.TblHMBAccCr[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.TblHMBAccCr[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.TblHMBAccCr[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'TblHMBPAccDrCode':
        this.TblHConfDocu.TblHMBPAccDr[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.TblHMBPAccDr[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.TblHMBPAccDr[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'TblHMBPAccCrCode':
        this.TblHConfDocu.TblHMBPAccCr[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.TblHMBPAccCr[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.TblHMBPAccCr[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'TblHMPettyDrCode':
        this.TblHConfDocu.TblHMPettyDr[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.TblHMPettyDr[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.TblHMPettyDr[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'TblHMPettyCrCode':
        this.TblHConfDocu.TblHMPettyCr[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.TblHMPettyCr[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.TblHMPettyCr[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'TblHMJouDrCode':
        this.TblHConfDocu.TblHMJouDr[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.TblHMJouDr[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.TblHMJouDr[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;
      case 'TblHMJouCrCode':
        this.TblHConfDocu.TblHMJouCr[this.tableIndex].HAccOne_SysID = event.HAccOne_SysID
        this.TblHConfDocu.TblHMJouCr[this.tableIndex].HAccOne_Code = event.HAccOne_Code
        this.TblHConfDocu.TblHMJouCr[this.tableIndex].HAccOne_Name = event.HAccOne_Name
        break;






      // case 'selectionSalesGroupCode':
      //   this.TblHConfDocu.salesGroupSelection[this.tableIndex].HMSalGroup_Code = event.code
      //   this.TblHConfDocu.salesGroupSelection[this.tableIndex].HMSalGroup_Name = event.name
      //   break;
      //-----------------------------------------------------------
      //already hide


      // case 'PriceListGroupCode':
      //   break;



      // case 'AdditionalExpGroup':
      //   this.TblHConfDocu.addExpenseGroupSelection[this.tableIndex].HConfAllGAcc_Code = event.HAccGroup_Group_Code
      //   this.TblHConfDocu.addExpenseGroupSelection[this.tableIndex].HConfAllGAcc_Name = event.HAccGroup_Group_Name
      //   break;
      // case 'ExpenseAddToCustSupplier':
      //   this.TblHConfDocu.expAddToCustSupplierGroupSelection[this.tableIndex].HConfAllGAcc_Code = event.HAccGroup_Group_Code
      //   this.TblHConfDocu.expAddToCustSupplierGroupSelection[this.tableIndex].HConfAllGAcc_Name = event.HAccGroup_Group_Name
      //   break;
      // case 'InterCoGroup':
      //   this.TblHConfDocu.interCompanyGroupSelection[this.tableIndex].HConfAllGAcc_Code = event.HAccGroup_Group_Code
      //   this.TblHConfDocu.interCompanyGroupSelection[this.tableIndex].HConfAllGAcc_Name = event.HAccGroup_Group_Name
      //   break;
      //
      // case 'DirectExpAccGroup':
      //   this.TblHConfDocu.directExpenseAccGroupSelection[this.tableIndex].HConfAllGAcc_Code = event.HAccGroup_Group_Code
      //   this.TblHConfDocu.directExpenseAccGroupSelection[this.tableIndex].HConfAllGAcc_Name = event.HAccGroup_Group_Name
      //   break;
      // case 'InDirectExpAccGroup':
      //   this.TblHConfDocu.indirectExpenseGroupSelection[this.tableIndex].HConfAllGAcc_Code = event.HAccGroup_Group_Code
      //   this.TblHConfDocu.indirectExpenseGroupSelection[this.tableIndex].HConfAllGAcc_Name = event.HAccGroup_Group_Name
      //   break;
      //

      //
      // case 'TaxGroup':
      //   this.TblHConfDocu.taxGroupSelection[this.tableIndex].HTaxGroup_Code = event.HFirstTaxGroup_Code
      //   this.TblHConfDocu.taxGroupSelection[this.tableIndex].HTaxGroup_Name = event.HFirstTaxGroup_Name
      //   break;
      // case 'AdditionalTaxGroupOne':
      //   this.TblHConfDocu.additionalTaxGroupOneSelection[this.tableIndex].HTaxGroup_Code = event.HFirstTaxGroup_Code
      //   this.TblHConfDocu.additionalTaxGroupOneSelection[this.tableIndex].HTaxGroup_Name = event.HFirstTaxGroup_Name
      //   break;

      // case 'TaxAccGroupCode':
      //   this.TblHConfDocu.taxAccGroupSelection[this.tableIndex].HConfAllGAcc_Code = event.HAccOne_Group_Code
      //   this.TblHConfDocu.taxAccGroupSelection[this.tableIndex].HConfAllGAcc_Name = event.HAccOne_Group_Name
      //   break;



      // case 'TaxAccGroupCode':
      //   this.TblHConfDocu.taxAccGroupSelection[this.tableIndex].HConfAllGAcc_Code = event.HAccOne_Group_Code
      //   this.TblHConfDocu.taxAccGroupSelection[this.tableIndex].HConfAllGAcc_Name = event.HAccOne_Group_Name
      //   break;
      // case 'TaxAccGroupOneCode':
      //   this.TblHConfDocu.taxAccGroupOneSelection[this.tableIndex].HConfAllGAcc_Code = event.HAccOne_Group_Code
      //   this.TblHConfDocu.taxAccGroupOneSelection[this.tableIndex].HConfAllGAcc_Name = event.HAccOne_Group_Name
      //   break;
      // case 'TaxAccGroupTwoCode':
      //   this.TblHConfDocu.taxAccGroupTwoSelection[this.tableIndex].HConfAllGAcc_Code = event.HAccOne_Group_Code
      //   this.TblHConfDocu.taxAccGroupTwoSelection[this.tableIndex].HConfAllGAcc_Name = event.HAccOne_Group_Name
      //   break;
      //


      // case 'EmployeeCode':
      //   this.TblHConfDocu.TblHAppEmpl[this.tableIndex].HAppEmpl_Code = event.DLSum_Emp_Code
      //   this.TblHConfDocu.TblHAppEmpl[this.tableIndex].HAppEmpl_Name = event.DLSum_Emp_Name
      //   break;
      // case 'AlertEmployeeCode':
      //   this.TblHConfDocu.TblHAppAlert[this.tableIndex].HAppAlert_Code = event.DLSum_Emp_Code
      //   this.TblHConfDocu.TblHAppAlert[this.tableIndex].HAppAlert_Name = event.DLSum_Emp_Name
      //   break;


      // case 'RemarkCode':
      //   this.TblHConfDocu.TblHRemark[this.tableIndex].HRemark_Code = event.HRemark_Code
      //   this.TblHConfDocu.TblHRemark[this.tableIndex].HRemark_Name = event.HRemark_Name
      //   break;
      // case 'PaymentCode':
      //   this.TblHConfDocu.TblHPterm[this.tableIndex].HPterm_Code = event.paymentTermCode
      //   this.TblHConfDocu.TblHPterm[this.tableIndex].HPterm_Name = event.paymentTermName
      //   break;
      // case 'DocDocumnetCode':
      //   this.TblHConfDocu.TblHDocManage[this.tableIndex].HDocManage_Code = event.documentCode
      //   this.TblHConfDocu.TblHDocManage[this.tableIndex].HDocManage_Name = event.documentName
      //   break;
      // default:
      //   break;
    }

  }

  routeTo(screen) {
    this.router.navigate([screen]);
  }

  deleteRow(table: any, index: number) {


    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        if (table === 'tblAuthorizer') {
          this.TblHConfDocu.tblAuthorizer.splice(index, 1);
          if (this.TblHConfDocu.tblAuthorizer.length === 0) {
            this.addRow('tblAuthorizer', -1);
          }
        }

        if (table === 'applicableCo') {
          this.TblHConfDocu.applicableCo.splice(index, 1);
          if (this.TblHConfDocu.applicableCo.length === 0) {
            this.addRow('applicableCo', -1);
          }
        }
        if (table === 'tblFieldMaster') {
          this.TblHConfDocu.tblFieldMaster.splice(index, 1);
          if (this.TblHConfDocu.tblFieldMaster.length === 0) {
            this.addRow('tblFieldMaster', -1);
          }
        }
        //
        // if (table === 'tblHTabHD') {
        //   this.TblHConfDocu.tblHTabHD.splice(index, 1);
        //   if (this.TblHConfDocu.tblHTabHD.length === 0) {
        //     this.addRow('tblHTabHD', -1);
        //   }
        // }
        //
        if (table === 'formLinking') {
          this.TblHConfDocu.formLinking.splice(index, 1);
          if (this.TblHConfDocu.formLinking.length === 0) {
            this.addRow('formLinking', -1);
          }
        }
        if (table === 'voucherTypeSelection') {
          this.TblHConfDocu.voucherTypeSelection.splice(index, 1);
          if (this.TblHConfDocu.voucherTypeSelection.length === 0) {
            this.addRow('voucherTypeSelection', -1);
          }
        }
        if (table === 'printFormatSelection') {
          this.TblHConfDocu.printFormatSelection.splice(index, 1);
          if (this.TblHConfDocu.printFormatSelection.length === 0) {
            this.addRow('printFormatSelection', -1);
          }
        }
        if (table === 'productGrpSelection') {
          this.TblHConfDocu.productGrpSelection.splice(index, 1);
          if (this.TblHConfDocu.productGrpSelection.length === 0) {
            this.addRow('productGrpSelection', -1);
          }
        }
        if (table === 'interCompanySelection') {
          this.TblHConfDocu.interCompanySelection.splice(index, 1);
          if (this.TblHConfDocu.interCompanySelection.length === 0) {
            this.addRow('interCompanySelection', -1);
          }
        }
        if (table === 'copyDocFromSelection') {
          this.TblHConfDocu.copyDocFromSelection.splice(index, 1);
          if (this.TblHConfDocu.copyDocFromSelection.length === 0) {
            this.addRow('copyDocFromSelection', -1);
          }
        }
        //
        if (table === 'PDCbankDetails') {
          this.TblHConfDocu.PDCbankDetails.splice(index, 1);
          if (this.TblHConfDocu.PDCbankDetails.length === 0) {
            this.addRow('PDCbankDetails', -1);
          }
        }

        if (table === 'PaymentTermsSelection') {
          this.TblHConfDocu.PaymentTermsSelection.splice(index, 1);
          if (this.TblHConfDocu.PaymentTermsSelection.length === 0) {
            this.addRow('PaymentTermsSelection', -1);
          }
        }
        if (table === 'productUnitGroupSelection') {
          this.TblHConfDocu.productUnitGroupSelection.splice(index, 1);
          if (this.TblHConfDocu.productUnitGroupSelection.length === 0) {
            this.addRow('productUnitGroupSelection', -1);
          }
        }
        if (table === 'currencySelection') {
          this.TblHConfDocu.currencySelection.splice(index, 1);
          if (this.TblHConfDocu.currencySelection.length === 0) {
            this.addRow('currencySelection', -1);
          }
        }
        //
        if (table === 'salesRateAgreementSelection') {
          this.TblHConfDocu.salesRateAgreementSelection.splice(index, 1);
          if (this.TblHConfDocu.salesRateAgreementSelection.length === 0) {
            this.addRow('salesRateAgreementSelection', -1);
          }
        }
        if (table === 'purchaseRateAgreementSelection') {
          this.TblHConfDocu.purchaseRateAgreementSelection.splice(index, 1);
          if (this.TblHConfDocu.purchaseRateAgreementSelection.length === 0) {
            this.addRow('purchaseRateAgreementSelection', -1);
          }
        }

        if (table === 'costCenterSelection') {
          this.TblHConfDocu.costCenterSelection.splice(index, 1);
          if (this.TblHConfDocu.costCenterSelection.length === 0) {
            this.addRow('costCenterSelection', -1);
          }
        }
        if (table === 'profitCenterSelection') {
          this.TblHConfDocu.profitCenterSelection.splice(index, 1);
          if (this.TblHConfDocu.profitCenterSelection.length === 0) {
            this.addRow('profitCenterSelection', -1);
          }
        }
        if (table === 'salesmanSelection') {
          this.TblHConfDocu.salesmanSelection.splice(index, 1);
          if (this.TblHConfDocu.salesmanSelection.length === 0) {
            this.addRow('salesmanSelection', -1);
          }
        }
        if (table === 'divisionSelection') {
          this.TblHConfDocu.divisionSelection.splice(index, 1);
          if (this.TblHConfDocu.divisionSelection.length === 0) {
            this.addRow('divisionSelection', -1);
          }
        }
        if (table === 'departmentSelection') {
          this.TblHConfDocu.departmentSelection.splice(index, 1);
          if (this.TblHConfDocu.departmentSelection.length === 0) {
            this.addRow('departmentSelection', -1);
          }
        }
        if (table === 'jobSelection') {
          this.TblHConfDocu.jobSelection.splice(index, 1);
          if (this.TblHConfDocu.jobSelection.length === 0) {
            this.addRow('jobSelection', -1);
          }
        }
        if (table === 'otherCenterSelection') {
          this.TblHConfDocu.otherCenterSelection.splice(index, 1);
          if (this.TblHConfDocu.otherCenterSelection.length === 0) {
            this.addRow('otherCenterSelection', -1);
          }
        }
        if (table === 'salesOrganizationSelection') {
          this.TblHConfDocu.salesOrganizationSelection.splice(index, 1);
          if (this.TblHConfDocu.salesOrganizationSelection.length === 0) {
            this.addRow('salesOrganizationSelection', -1);
          }
        }
        if (table === 'distributionChannelSelection') {
          this.TblHConfDocu.distributionChannelSelection.splice(index, 1);
          if (this.TblHConfDocu.distributionChannelSelection.length === 0) {
            this.addRow('distributionChannelSelection', -1);
          }
        }
        if (table === 'salesOfficeSelection') {
          this.TblHConfDocu.salesOfficeSelection.splice(index, 1);
          if (this.TblHConfDocu.salesOfficeSelection.length === 0) {
            this.addRow('salesOfficeSelection', -1);
          }
        }
        if (table === 'salesGroupSelection') {
          this.TblHConfDocu.salesGroupSelection.splice(index, 1);
          if (this.TblHConfDocu.salesGroupSelection.length === 0) {
            this.addRow('salesGroupSelection', -1);
          }
        }
        if (table === 'placeOfSupplySelection') {
          this.TblHConfDocu.placeOfSupplySelection.splice(index, 1);
          if (this.TblHConfDocu.placeOfSupplySelection.length === 0) {
            this.addRow('placeOfSupplySelection', -1);
          }
        }
        if (table === 'jurisdictionChannelSelection') {
          this.TblHConfDocu.jurisdictionChannelSelection.splice(index, 1);
          if (this.TblHConfDocu.jurisdictionChannelSelection.length === 0) {
            this.addRow('jurisdictionChannelSelection', -1);
          }
        }
        if (table === 'warehouseOneSelection') {
          this.TblHConfDocu.warehouseOneSelection.splice(index, 1);
          if (this.TblHConfDocu.warehouseOneSelection.length === 0) {
            this.addRow('warehouseOneSelection', -1);
          }
        }
        if (table === 'warehouseTwoSelection') {
          this.TblHConfDocu.warehouseTwoSelection.splice(index, 1);
          if (this.TblHConfDocu.warehouseTwoSelection.length === 0) {
            this.addRow('warehouseTwoSelection', -1);
          }
        }
        //
        if (table === 'firstAccGroupSelection') {
          this.TblHConfDocu.firstAccGroupSelection.splice(index, 1);
          if (this.TblHConfDocu.firstAccGroupSelection.length === 0) {
            this.addRow('firstAccGroupSelection', -1);
          }
        }
        if (table === 'secondAccGroupSelection') {
          this.TblHConfDocu.secondAccGroupSelection.splice(index, 1);
          if (this.TblHConfDocu.secondAccGroupSelection.length === 0) {
            this.addRow('secondAccGroupSelection', -1);
          }
        }
        //
        if (table === 'customerAccGroupSelection') {
          this.TblHConfDocu.customerAccGroupSelection.splice(index, 1);
          if (this.TblHConfDocu.customerAccGroupSelection.length === 0) {
            this.addRow('customerAccGroupSelection', -1);
          }
        }
        if (table === 'VendorAccGroupSelection') {
          this.TblHConfDocu.VendorAccGroupSelection.splice(index, 1);
          if (this.TblHConfDocu.VendorAccGroupSelection.length === 0) {
            this.addRow('VendorAccGroupSelection', -1);
          }
        }
        //
        if (table === 'AdditionalExpenseCustomer') {
          this.TblHConfDocu.AdditionalExpenseCustomer.splice(index, 1);
          if (this.TblHConfDocu.AdditionalExpenseCustomer.length === 0) {
            this.addRow('AdditionalExpenseCustomer', -1);
          }
        }
        if (table === 'TblHMidLandCost') {
          this.TblHConfDocu.TblHMidLandCost.splice(index, 1);
          if (this.TblHConfDocu.TblHMidLandCost.length === 0) {
            this.addRow('TblHMidLandCost', -1);
          }
        }
        if (table === 'TblHMShippedto') {
          this.TblHConfDocu.TblHMShippedto.splice(index, 1);
          if (this.TblHConfDocu.TblHMShippedto.length === 0) {
            this.addRow('TblHMShippedto', -1);
          }
        }
        if (table === 'TblHMBilledto') {
          this.TblHConfDocu.TblHMBilledto.splice(index, 1);
          if (this.TblHConfDocu.TblHMBilledto.length === 0) {
            this.addRow('TblHMBilledto', -1);
          }
        }
        //
        if (table === 'AdditionalExpenseVendor') {
          this.TblHConfDocu.AdditionalExpenseVendor.splice(index, 1);
          if (this.TblHConfDocu.AdditionalExpenseVendor.length === 0) {
            this.addRow('AdditionalExpenseVendor', -1);
          }
        }
        //
        if (table === 'TaxOne') {
          this.TblHConfDocu.TaxOne.splice(index, 1);
          if (this.TblHConfDocu.TaxOne.length === 0) {
            this.addRow('TaxOne', -1);
          }
        }
        if (table === 'TaxTwo') {
          this.TblHConfDocu.TaxTwo.splice(index, 1);
          if (this.TblHConfDocu.TaxTwo.length === 0) {
            this.addRow('TaxTwo', -1);
          }
        }
        if (table === 'TaxThree') {
          this.TblHConfDocu.TaxThree.splice(index, 1);
          if (this.TblHConfDocu.TaxThree.length === 0) {
            this.addRow('TaxThree', -1);
          }
        }
        if (table === 'CorporateTax') {
          this.TblHConfDocu.CorporateTax.splice(index, 1);
          if (this.TblHConfDocu.CorporateTax.length === 0) {
            this.addRow('CorporateTax', -1);
          }
        }
        if (table === 'TaxAccount') {
          this.TblHConfDocu.TaxAccount.splice(index, 1);
          if (this.TblHConfDocu.TaxAccount.length === 0) {
            this.addRow('TaxAccount', -1);
          }
        }
        //
        if (table === 'DocumentStartingNumber') {
          this.TblHConfDocu.DocumentStartingNumber.splice(index, 1);
          if (this.TblHConfDocu.DocumentStartingNumber.length === 0) {
            this.addRow('DocumentStartingNumber', -1);
          }
        }
        if (table === 'TblHMDocuMaster') {
          this.TblHConfDocu.TblHMDocuMaster.splice(index, 1);
          if (this.TblHConfDocu.TblHMDocuMaster.length === 0) {
            this.addRow('TblHMDocuMaster', -1);
          }
        }
        //
        if (table === 'TblHMProdModu') {
          this.TblHConfDocu.TblHMProdModu.splice(index, 1);
          if (this.TblHConfDocu.TblHMProdModu.length === 0) {
            this.addRow('TblHMProdModu', -1);
          }
        }
        if (table === 'TblHMNarration') {
          this.TblHConfDocu.TblHMNarration.splice(index, 1);
          if (this.TblHConfDocu.TblHMNarration.length === 0) {
            this.addRow('TblHMNarration', -1);
          }
        }
        if (table === 'TblHMProdMast') {
          this.TblHConfDocu.TblHMProdMast.splice(index, 1);
          if (this.TblHConfDocu.TblHMProdMast.length === 0) {
            this.addRow('TblHMProdMast', -1);
          }
        }
        if (table === 'TblHMInco') {
          this.TblHConfDocu.TblHMInco.splice(index, 1);
          if (this.TblHConfDocu.TblHMInco.length === 0) {
            this.addRow('TblHMInco', -1);
          }
        }
        if (table === 'TblHMAppDate') {
          this.TblHConfDocu.TblHMAppDate.splice(index, 1);
          if (this.TblHConfDocu.TblHMAppDate.length === 0) {
            this.addRow('TblHMAppDate', -1);
          }
        }
        if (table === 'TblHMEmp') {
          this.TblHConfDocu.TblHMEmp.splice(index, 1);
          if (this.TblHConfDocu.TblHMEmp.length === 0) {
            this.addRow('TblHMEmp', -1);
          }
        }
        //
        if (table === 'TblHMBAccDr') {
          this.TblHConfDocu.TblHMBAccDr.splice(index, 1);
          if (this.TblHConfDocu.TblHMBAccDr.length === 0) {
            this.addRow('TblHMBAccDr', -1);
          }
        }
        if (table === 'TblHMBAccCr') {
          this.TblHConfDocu.TblHMBAccCr.splice(index, 1);
          if (this.TblHConfDocu.TblHMBAccCr.length === 0) {
            this.addRow('TblHMBAccCr', -1);
          }
        }
        if (table === 'TblHMBPAccDr') {
          this.TblHConfDocu.TblHMBPAccDr.splice(index, 1);
          if (this.TblHConfDocu.TblHMBPAccDr.length === 0) {
            this.addRow('TblHMBPAccDr', -1);
          }
        }
        if (table === 'TblHMBPAccCr') {
          this.TblHConfDocu.TblHMBPAccCr.splice(index, 1);
          if (this.TblHConfDocu.TblHMBPAccCr.length === 0) {
            this.addRow('TblHMBPAccCr', -1);
          }
        }
        if (table === 'TblHMPettyDr') {
          this.TblHConfDocu.TblHMPettyDr.splice(index, 1);
          if (this.TblHConfDocu.TblHMPettyDr.length === 0) {
            this.addRow('TblHMPettyDr', -1);
          }
        }
        if (table === 'TblHMPettyCr') {
          this.TblHConfDocu.TblHMPettyCr.splice(index, 1);
          if (this.TblHConfDocu.TblHMPettyCr.length === 0) {
            this.addRow('TblHMPettyCr', -1);
          }
        }
        if (table === 'TblHMJouDr') {
          this.TblHConfDocu.TblHMJouDr.splice(index, 1);
          if (this.TblHConfDocu.TblHMJouDr.length === 0) {
            this.addRow('TblHMJouDr', -1);
          }
        }
        if (table === 'TblHMJouCr') {
          this.TblHConfDocu.TblHMJouCr.splice(index, 1);
          if (this.TblHConfDocu.TblHMJouCr.length === 0) {
            this.addRow('TblHMJouCr', -1);
          }
        }
        //











      }
    });







    //   if (table == 'tblFieldMaster') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         
    //       }
    //     });
    //   }

    //   if (table == 'formLinking') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {

    //       }
    //     });

    //   }
    //   if (table == 'salesAccSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'salesAccSelection') {
    //           this.TblHConfDocu.salesAccSelection.splice(index, 1);
    //           if (this.TblHConfDocu.salesAccSelection.length === 0) {
    //             this.addRow('salesAccSelection', -1);
    //           }
    //         }
    //       }
    //     });
    //   }
    //   if (table == 'customerAccSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'customerAccSelection') {
    //           this.TblHConfDocu.customerAccSelection.splice(index, 1);
    //           if (this.TblHConfDocu.customerAccSelection.length === 0) {
    //             this.addRow('customerAccSelection', -1);
    //           }
    //         }
    //       }
    //     });
    //   }
    //   if (table == 'AddExpAccGroupSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'AddExpAccGroupSelection') {
    //           this.TblHConfDocu.AddExpAccGroupSelection.splice(index, 1);
    //           if (this.TblHConfDocu.AddExpAccGroupSelection.length === 0) {
    //             this.addRow('AddExpAccGroupSelection', -1);
    //           }
    //         }
    //       }
    //     });
    //   }
    //   if (table == 'taxAccGroupSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'taxAccGroupSelection') {
    //           this.TblHConfDocu.taxAccGroupSelection.splice(index, 1);
    //           if (this.TblHConfDocu.taxAccGroupSelection.length === 0) {
    //             this.addRow('taxAccGroupSelection', -1);
    //           }
    //         }
    //       }
    //     });

    //   }



    //   }








    //   if (table == 'TblHAppAlert') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'TblHAppAlert') {
    //           this.TblHConfDocu.TblHAppAlert.splice(index, 1);
    //           if (this.TblHConfDocu.TblHAppAlert.length === 0) {
    //             this.addRow('TblHAppAlert', -1);
    //           }
    //         }
    //       }
    //     });
    //   }











    //   if (table == 'addExpenseGroupSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'addExpenseGroupSelection') {
    //           this.TblHConfDocu.addExpenseGroupSelection.splice(index, 1);
    //           if (this.TblHConfDocu.addExpenseGroupSelection.length === 0) {
    //             this.addRow('addExpenseGroupSelection', -1);
    //           }
    //         }
    //       }
    //     });
    //   }
    //   if (table == 'expAddToCustSupplierGroupSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'expAddToCustSupplierGroupSelection') {
    //           this.TblHConfDocu.expAddToCustSupplierGroupSelection.splice(index, 1);
    //           if (this.TblHConfDocu.expAddToCustSupplierGroupSelection.length === 0) {
    //             this.addRow('expAddToCustSupplierGroupSelection', -1);
    //           }
    //         }
    //       }
    //     });
    //   }
    //   if (table == 'interCompanyGroupSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'interCompanyGroupSelection') {
    //           this.TblHConfDocu.interCompanyGroupSelection.splice(index, 1);
    //           if (this.TblHConfDocu.interCompanyGroupSelection.length === 0) {
    //             this.addRow('interCompanyGroupSelection', -1);
    //           }
    //         }
    //       }
    //     });
    //   }
    //   //
    //   if (table == 'directExpenseAccGroupSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'directExpenseAccGroupSelection') {
    //           this.TblHConfDocu.directExpenseAccGroupSelection.splice(index, 1);
    //           if (this.TblHConfDocu.directExpenseAccGroupSelection.length === 0) {
    //             this.addRow('directExpenseAccGroupSelection', -1);
    //           }
    //         }
    //       }
    //     });

    //   }
    //   if (table == 'indirectExpenseGroupSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'indirectExpenseGroupSelection') {
    //           this.TblHConfDocu.indirectExpenseGroupSelection.splice(index, 1);
    //           if (this.TblHConfDocu.indirectExpenseGroupSelection.length === 0) {
    //             this.addRow('indirectExpenseGroupSelection', -1);
    //           }
    //         }
    //       }
    //     });
    //   }
    //   //
    //   if (table == 'secondAccGroupSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         
    //       }
    //     });

    //   }








    //   if (table == 'TblHConfDocu.VendorAccGroupSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         
    //       }
    //     });
    //   }
    //   //
    //   if (table == 'taxGroupSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'taxGroupSelection') {
    //           this.TblHConfDocu.taxGroupSelection.splice(index, 1);
    //           if (this.TblHConfDocu.taxGroupSelection.length === 0) {
    //             this.addRow('taxGroupSelection', -1);
    //           }
    //         }
    //       }
    //     });
    //   }
    //   if (table == 'additionalTaxGroupOneSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'additionalTaxGroupOneSelection') {
    //           this.TblHConfDocu.additionalTaxGroupOneSelection.splice(index, 1);
    //           if (this.TblHConfDocu.additionalTaxGroupOneSelection.length === 0) {
    //             this.addRow('additionalTaxGroupOneSelection', -1);
    //           }
    //         }
    //       }
    //     });
    //   }
    //   if (table == 'additionalTaxGroupTwoSelection') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'additionalTaxGroupTwoSelection') {
    //           this.TblHConfDocu.additionalTaxGroupTwoSelection.splice(index, 1);
    //           if (this.TblHConfDocu.additionalTaxGroupTwoSelection.length === 0) {
    //             this.addRow('additionalTaxGroupTwoSelection', -1);
    //           }
    //         }
    //       }
    //     });
    //   }











    //   if (table == 'TblHRemark') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'TblHRemark') {
    //           this.TblHConfDocu.TblHRemark.splice(index, 1);
    //           if (this.TblHConfDocu.TblHRemark.length === 0) {
    //             this.addRow('TblHRemark', -1);
    //           }
    //         }
    //       }
    //     });

    //   }
    //   if (table == 'TblHPterm') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'TblHPterm') {
    //           this.TblHConfDocu.TblHPterm.splice(index, 1);
    //           if (this.TblHConfDocu.TblHPterm.length === 0) {
    //             this.addRow('TblHPterm', -1);
    //           }
    //         }
    //       }
    //     });

    //   }
    //   if (table == 'TblHDocManage') {
    //     this.confirmationService.confirm({
    //       message: 'Are you sure you want to delete this row?',
    //       header: 'Confirm Delete',
    //       icon: 'pi pi-exclamation-triangle',
    //       accept: () => {
    //         if (table === 'TblHDocManage') {
    //           this.TblHConfDocu.TblHDocManage.splice(index, 1);
    //           if (this.TblHConfDocu.TblHDocManage.length === 0) {
    //             this.addRow('TblHDocManage', -1);
    //           }
    //         }
    //       }
    //     });

    //   }
  }

  addRow(table: any, index: number) {

    if (table == 'applicableCo') {

      const newRow = new TbldConfDocuCo()
      this.TblHConfDocu.applicableCo.splice(index + 1, 0, newRow);
    }


    // if (table == 'TblHRemark') {
    //   const newRow = new TblHRemark()
    //   this.TblHConfDocu.TblHRemark.splice(index + 1, 0, newRow);
    // }

    // if (table == 'TblHPterm') {
    //   const newRow = new TblHPterm()
    //   this.TblHConfDocu.TblHPterm.splice(index + 1, 0, newRow);
    // }

    // if (table == 'TblHDocManage') {
    //   const newRow = new TblHDocManage()
    //   this.TblHConfDocu.TblHDocManage.splice(index + 1, 0, newRow);
    // }

    if (table == 'tblAuthorizer') {
      const newRow = new TblAuthorizerDto()
      this.TblHConfDocu.tblAuthorizer.splice(index + 1, 0, newRow);
    }

    if (table == 'tblFieldMaster') {
      const newRow = new TblFieldMasterDto()
      this.TblHConfDocu.tblFieldMaster.splice(index + 1, 0, newRow);

    }
    //

    if (table == 'formLinking') {
      const newRow = new FormLinkingDto()
      this.TblHConfDocu.formLinking.splice(index + 1, 0, newRow);
    }
    //
    if (table == 'voucherTypeSelection') {
      const newRow = new TblHMidConfVtype()
      this.TblHConfDocu.voucherTypeSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'printFormatSelection') {
      const newRow = new TblHMidConfPrint()
      this.TblHConfDocu.printFormatSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'productGrpSelection') {
      const newRow = new TblHMidConfProGSele()
      this.TblHConfDocu.productGrpSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'interCompanySelection') {
      const newRow = new TblHMidConfInterCo()
      this.TblHConfDocu.interCompanySelection.splice(index + 1, 0, newRow);
    }
    if (table == 'copyDocFromSelection') {
      const newRow = new TblHMidConfCopDoc()
      this.TblHConfDocu.copyDocFromSelection.splice(index + 1, 0, newRow);
    }
    //
    if (table == 'PDCbankDetails') {
      const newRow = new TblHMidConfPdcBank()
      this.TblHConfDocu.PDCbankDetails.splice(index + 1, 0, newRow);
    }

    if (table == 'PaymentTermsSelection') {
      const newRow = new TblHMidConfPTerms()
      this.TblHConfDocu.PaymentTermsSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'productUnitGroupSelection') {
      const newRow = new TblHMidConfPUnit()
      this.TblHConfDocu.productUnitGroupSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'currencySelection') {
      const newRow = new TblHMCurrMast()
      this.TblHConfDocu.currencySelection.splice(index + 1, 0, newRow);
    }
    //
    if (table == 'salesRateAgreementSelection') {
      const newRow = new TblHMidConfPCustList()
      this.TblHConfDocu.salesRateAgreementSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'purchaseRateAgreementSelection') {
      const newRow = new TblHMidConfPVenList()
      this.TblHConfDocu.purchaseRateAgreementSelection.splice(index + 1, 0, newRow);
    }
    //

    if (table == 'costCenterSelection') {
      const newRow = new TblHMidCostCent()
      this.TblHConfDocu.costCenterSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'profitCenterSelection') {
      const newRow = new TblHMidProfCent()
      this.TblHConfDocu.profitCenterSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesmanSelection') {
      const newRow = new TblHMidSman()
      this.TblHConfDocu.salesmanSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'divisionSelection') {
      const newRow = new TblHMidDivision()
      this.TblHConfDocu.divisionSelection.splice(index + 1, 0, newRow);
    }
    // //
    if (table == 'departmentSelection') {
      const newRow = new TblHMidDept()
      this.TblHConfDocu.departmentSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'jobSelection') {
      const newRow = new TblHMidMidJob()
      this.TblHConfDocu.jobSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'otherCenterSelection') {
      const newRow = new TblHMidOthCentre()
      this.TblHConfDocu.otherCenterSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesOrganizationSelection') {
      const newRow = new TblHMidSalesOrg()
      this.TblHConfDocu.salesOrganizationSelection.splice(index + 1, 0, newRow);
    }
    // //
    if (table == 'distributionChannelSelection') {
      const newRow = new TblHMidDistChanel()
      this.TblHConfDocu.distributionChannelSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesOfficeSelection') {
      const newRow = new TblHMidSoffice()
      this.TblHConfDocu.salesOfficeSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesGroupSelection') {
      const newRow = new TblHMidSalGroup()
      this.TblHConfDocu.salesGroupSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'placeOfSupplySelection') {
      const newRow = new TblHMidPlaceSupply()
      this.TblHConfDocu.placeOfSupplySelection.splice(index + 1, 0, newRow);
    }
    if (table == 'jurisdictionChannelSelection') {
      const newRow = new TblHMidJurisd()
      this.TblHConfDocu.jurisdictionChannelSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'warehouseOneSelection') {
      const newRow = new TblHMidWhOne()
      this.TblHConfDocu.warehouseOneSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'warehouseTwoSelection') {
      const newRow = new TblHMidWhTwo()
      this.TblHConfDocu.warehouseTwoSelection.splice(index + 1, 0, newRow);
    }
    //

    if (table == 'firstAccGroupSelection') {
      const newRow = new TblHMidAccFirst()
      this.TblHConfDocu.firstAccGroupSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'secondAccGroupSelection') {
      const newRow = new TblHMidAccSec()
      this.TblHConfDocu.secondAccGroupSelection.splice(index + 1, 0, newRow);
    }
    //
    if (table == 'customerAccGroupSelection') {
      const newRow = new TblHMidAccCus()
      this.TblHConfDocu.customerAccGroupSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'VendorAccGroupSelection') {
      const newRow = new TblHMidAccVen()
      this.TblHConfDocu.VendorAccGroupSelection.splice(index + 1, 0, newRow);
    }
    //


    if (table == 'AdditionalExpenseCustomer') {
      const newRow = new TblHMidExpCust()
      this.TblHConfDocu.AdditionalExpenseCustomer.splice(index + 1, 0, newRow);
    }
    if (table == 'TblHMidLandCost') {
      const newRow = new TblHMidLandCost()
      this.TblHConfDocu.TblHMidLandCost.splice(index + 1, 0, newRow);
    }
    if (table == 'TblHMShippedto') {
      const newRow = new TblHMShippedto()
      this.TblHConfDocu.TblHMShippedto.splice(index + 1, 0, newRow);
    }
    if (table == 'TblHMBilledto') {
      const newRow = new TblHMBilledto()
      this.TblHConfDocu.TblHMBilledto.splice(index + 1, 0, newRow);
    }
    //
    if (table == 'AdditionalExpenseVendor') {
      const newRow = new TblHMidExpVen()
      this.TblHConfDocu.AdditionalExpenseVendor.splice(index + 1, 0, newRow);
    }
    //
    if (table == 'TaxOne') {
      const newRow = new TblHMidTaxOne()
      this.TblHConfDocu.TaxOne.splice(index + 1, 0, newRow);
    }
    if (table == 'TaxTwo') {
      const newRow = new TblHMidTaxTwo()
      this.TblHConfDocu.TaxTwo.splice(index + 1, 0, newRow);
    }
    if (table == 'TaxThree') {
      const newRow = new TblHMidTaxThree()
      this.TblHConfDocu.TaxThree.splice(index + 1, 0, newRow);
    }
    if (table == 'CorporateTax') {
      const newRow = new TblHMidConfCorpTax()
      this.TblHConfDocu.CorporateTax.splice(index + 1, 0, newRow);
    }
    if (table == 'TaxAccount') {
      const newRow = new TblHMTaxAcc()
      this.TblHConfDocu.TaxAccount.splice(index + 1, 0, newRow);
    }
    //
    if (table == 'DocumentStartingNumber') {
      const newRow = new TblHDocStartNo()
      this.TblHConfDocu.DocumentStartingNumber.splice(index + 1, 0, newRow);
    }
    if (table == 'TblHMDocuMaster') {
      const newRow = new TblHMDocuMaster()
      this.TblHConfDocu.TblHMDocuMaster.splice(index + 1, 0, newRow);
    }
    //
    if (table == 'TblHMProdModu') {
      const newRow = new TblHMProdModu()
      this.TblHConfDocu.TblHMProdModu.splice(index + 1, 0, newRow);
    }
    if (table == 'TblHMNarration') {
      const newRow = new TblHMNarration()
      this.TblHConfDocu.TblHMNarration.splice(index + 1, 0, newRow);
    }
    if (table == 'TblHMProdMast') {
      const newRow = new TblHMProdMast()
      this.TblHConfDocu.TblHMProdMast.splice(index + 1, 0, newRow);
    }
    if (table == 'TblHMInco') {
      const newRow = new TblHMInco()
      this.TblHConfDocu.TblHMInco.splice(index + 1, 0, newRow);

    }
    if (table == 'TblHMAppDate') {
      const newRow = new TblHMAppDate()
      this.TblHConfDocu.TblHMAppDate.splice(index + 1, 0, newRow);

    }
    if (table == 'TblHMEmp') {
      const newRow = new TblHMEmp()
      this.TblHConfDocu.TblHMEmp.splice(index + 1, 0, newRow);

    }
    //
    if (table == 'TblHMBAccDr') {
      const newRow = new TblHMBAccDr()
      this.TblHConfDocu.TblHMBAccDr.splice(index + 1, 0, newRow);

    }
    if (table == 'TblHMBAccCr') {
      const newRow = new TblHMBAccCr()
      this.TblHConfDocu.TblHMBAccCr.splice(index + 1, 0, newRow);

    }
    if (table == 'TblHMBPAccDr') {
      const newRow = new TblHMBPAccDr()
      this.TblHConfDocu.TblHMBPAccDr.splice(index + 1, 0, newRow);

    }
    if (table == 'TblHMBPAccCr') {
      const newRow = new TblHMBPAccCr()
      this.TblHConfDocu.TblHMBPAccCr.splice(index + 1, 0, newRow);

    }
    if (table == 'TblHMPettyDr') {
      const newRow = new TblHMPettyDr()
      this.TblHConfDocu.TblHMPettyDr.splice(index + 1, 0, newRow);

    }
    if (table == 'TblHMPettyCr') {
      const newRow = new TblHMPettyCr()
      this.TblHConfDocu.TblHMPettyCr.splice(index + 1, 0, newRow);

    }
    if (table == 'TblHMJouDr') {
      const newRow = new TblHMJouDr()
      this.TblHConfDocu.TblHMJouDr.splice(index + 1, 0, newRow);

    }
    if (table == 'TblHMJouCr') {
      const newRow = new TblHMJouCr()
      this.TblHConfDocu.TblHMJouCr.splice(index + 1, 0, newRow);

    }








    // if (table == 'salesAccSelection') {
    //   const newRow = new SalesAccountSelectionDto()
    //   this.TblHConfDocu.salesAccSelection.splice(index + 1, 0, newRow);

    // }
    // if (table == 'customerAccSelection') {
    //   const newRow = new CustomerAccountSelectionDto()
    //   this.TblHConfDocu.customerAccSelection.splice(index + 1, 0, newRow);
    // }


    // if (table == 'AddExpAccGroupSelection') {
    //   const newRow = new HAddExpSeleDTO()
    //   this.TblHConfDocu.AddExpAccGroupSelection.splice(index + 1, 0, newRow);

    // }
    // //

    // if (table == 'TblHAppEmpl') {
    //   const newRow = new TblHAppEmpl()
    //   this.TblHConfDocu.TblHAppEmpl.splice(index + 1, 0, newRow);
    // }

    // if (table == 'TblHAppAlert') {
    //   const newRow = new TblHAppAlert()
    //   this.TblHConfDocu.TblHAppAlert.splice(index + 1, 0, newRow);
    // }
    // //




    //-----------------------------------------------------------
    //already hidden
    // if (table == 'addExpenseGroupSelection') {
    //   const newRow = new TblHAllMasters()
    //   this.addExpenseGroupSelection.splice(index + 1, 0, newRow);
    // }
    // if (table == 'expAddToCustSupplierGroupSelection') {
    //   const newRow = new TblHAllMasters()
    //   this.expAddToCustSupplierGroupSelection.splice(index + 1, 0, newRow);
    // }
    // if (table == 'interCompanyGroupSelection') {
    //   const newRow = new TblHAllMasters()
    //   this.interCompanyGroupSelection.splice(index + 1, 0, newRow);
    // }
    // //
    // if (table == 'directExpenseAccGroupSelection') {
    //   const newRow = new TblHAllMasters()
    //   this.directExpenseAccGroupSelection.splice(index + 1, 0, newRow);
    // }
    // if (table == 'indirectExpenseGroupSelection') {
    //   const newRow = new TblHAllMasters()
    //   this.indirectExpenseGroupSelection.splice(index + 1, 0, newRow);
    // }
    // //
    //---------------------------------------------------------------------------



    // if (table == 'taxGroupSelection') {
    //   const newRow = new TblHTaxGroup()
    //   this.TblHConfDocu.taxGroupSelection.splice(index + 1, 0, newRow);

    // }
    // if (table == 'additionalTaxGroupOneSelection') {
    //   const newRow = new TblHTaxGroup()
    //   this.TblHConfDocu.additionalTaxGroupOneSelection.splice(index + 1, 0, newRow);

    // }
    // if (table == 'additionalTaxGroupTwoSelection') {
    //   const newRow = new TblHTaxGroup()
    //   this.TblHConfDocu.additionalTaxGroupTwoSelection.splice(index + 1, 0, newRow);

    // }

    //already hidden
    // if (table == 'additionalTaxGroupTwoSelection') {
    //   const newRow = new TblHTaxGroup()
    //   this.additionalTaxGroupTwoSelection.splice(index + 1, 0, newRow);

    // }
    //---------------------------------------------------------------------------

    //already hidden
    // if (table == 'DocumentStartingNumber') {
    //   const newRow = new TblHDocStartNo()
    //   this.TaxThree.splice(index + 1, 0, newRow);

    // }
    //
    //---------------------------------------------------------------------------

    //already hidden

    // if (table == 'taxAccGroupOneSelection') {
    //   const newRow = new TblHAllMasters()
    //   this.taxAccGroupOneSelection.splice(index + 1, 0, newRow);

    // }
    // if (table == 'taxAccGroupTwoSelection') {
    //   const newRow = new TblHAllMasters()
    //   this.taxAccGroupTwoSelection.splice(index + 1, 0, newRow);

    // }

    //---------------------------------------------------------------------------

  }

  changeIndex(i) {
    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i
  }


  preSave(): boolean {
    if (this.TblHConfDocu.HCDocu_MiddValid_Code == null || this.TblHConfDocu.HCDocu_MiddValid_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Field Hide Display Code Cannot Be Null' });
      return false;
    }

    if (this.TblHConfDocu.HCDocu_MiddValid_Name == null || this.TblHConfDocu.HCDocu_MiddValid_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Field Hide Display Name Cannot Be Null' });
      return false;
    }



    return true;
  }


  save() {
    this.isSaving = true;
    this.progressValue = 0;

    const interval = setInterval(() => {
      if (this.progressValue < 90) {
        this.progressValue += 10;
      } else {
        clearInterval(interval);
      }
    }, 500);

    console.log("Save clicked");

    this.masterService.saveMasterData(apiUrl.SalesMiddleScreen, this.TblHConfDocu).then((res) => {
      clearInterval(interval);

      if (res.success === false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        this.progressValue = 0;
        this.isSaving = false;
        return;
      }

      if (res.success === false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
        this.progressValue = 0;
        this.isSaving = false;
        return;
      }

      this.progressValue = 100;

      setTimeout(() => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message
        });

        // this.showListButton = true;
        // this.TblHConfDocu = new TblHConfDocu();
        // this.TblHConfDocu.tblAuthorizer = [new TblAuthorizerDto()]

        // this.router.navigate(['screen-config/sales']);

        this.isSaving = false;
        this.progressValue = 0;
      }, 500);

    }).catch(() => {
      clearInterval(interval);
      this.progressValue = 0;
      this.isSaving = false;
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Save failed'
      });
    });
  }


  handleButtonClick(type, screen) {
    this.buttonSettings = true;
  }

  openPopup() {
    this.buttonSettings = true;
  }

  closePopup() {
    this.buttonSettings = false;
  }
  onRadioChange(field: string, value: string) {
    this.TblHConfDocu[field] = value;
    // Optionally handle logic
  }


  ConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Only delete if user confirms
      }
    });
  }


  toggleCheckbox(field: string, isChecked: boolean): void {
    this.TblHConfDocu[field] = isChecked ? 'Y' : 'N';
    console.log(`${field} updated to: ${this.TblHConfDocu[field]}`);

    if (field === 'HCDocu_load_BaseDoc' && !isChecked) {
      this.TblHConfDocu.HCDocu_load_NotExced = 'N';
      this.TblHConfDocu.HCDocu_Prev_CanotEdit = 'N';
      this.TblHConfDocu.HCDocu_Noload_CloseLink = 'N';
      this.TblHConfDocu.HCDocu_Link_Account = 'N';
      this.TblHConfDocu.HCDocu_Link_Product = 'N';
      this.TblHConfDocu.HCDocu_Link_ByQty = 'N';

      console.log('HCDocu_load_BaseDoc unchecked - all other options disabled');
    }
  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.getListData()

  }

  getListData() {
    this.listData = []
    this.masterService.getMasterData(apiUrl.SalesMiddleScreen).then((res) => {

      this.listData = res
      this.showList = true

      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HCDocu_MiddleMenu_Code || item.HCDocu_MiddleMenu_Name || item.HCDocu_MiddleMenu_SysID;
      const matchesQuery =
        (item.HCDocu_MiddleMenu_Code || '').toLowerCase().includes(query) ||
        (item.HCDocu_MiddleMenu_Name || '').toLowerCase().includes(query) ||
        item.HCDocu_MiddleMenu_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['screen-config/sales']);


  }
  editRow(rowData: any) {
    this.router.navigate(['screen-config/sales/' + rowData.HPOffLetter_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.SalesMiddleScreen, rowData.HPOffLetter_SysID).then((res) => {

          if (res.success == false) {
            this.showListButton = true;
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

            this.showListButton = true;

            this.getListData()
          }

        });
      }
    });
  }
}
function getlovdata() {
  throw new Error('Function not implemented.');
}

