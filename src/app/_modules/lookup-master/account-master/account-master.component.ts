// import { apiUrl } from '@accurate/providers';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccCommDto } from 'src/app/_dto/masters/tblAccComm.dto';
import { TblHAccGroupDto } from 'src/app/_dto/masters/tblAccGroup.dto';
import { TblHAccOneDto } from 'src/app/_dto/masters/tblhAccOne.dto';
import { TbldAccOneCodtoapplicable } from 'src/app/_dto/TbldAccOneCodto';
import { TblHFirstTax } from 'src/app/_dto/TblHFirstTax.dto';
import { TblmDocAttach } from 'src/app/_dto/TblmDocAttach.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-account-master',
  templateUrl: './account-master.component.html',
  styleUrls: ['./account-master.component.scss']
})
export class AccountMasterComponent implements OnInit {

  TblHAccGroupDto: TblHAccGroupDto = new TblHAccGroupDto()

  activeState: boolean[] = [false, false, false];

  activeIndex: number = 0;

  display: boolean = false;

  showCompany: boolean = false;

  showAmendment: boolean = false;

  listData = []

  filteredfilteredlistData = [...this.listData];

  searchText: string = '';

  showAccountMasterList: boolean = false

  HAccGroup_SysID: any;


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

  scrollableTabs: any[] = [
    { title: "Account Group Details", content: "" },
    { title: "Company Wise Details", content: "" },
    { title: "Masters Details", content: "" },
    { title: "Document Attachment", content: "" },

  ];
  showDeleteButton: boolean = false;


  tableIndex: any;

  TaxSelection: AccCommDto[] = [new AccCommDto()]
  costCenterSelection: AccCommDto[] = [new AccCommDto()]
  profitCenterSelection: AccCommDto[] = [new AccCommDto()]
  salesmanSelection: AccCommDto[] = [new AccCommDto()]
  divisionSelection: AccCommDto[] = [new AccCommDto()]
  departmentSelection: AccCommDto[] = [new AccCommDto()]
  jobSelection: AccCommDto[] = [new AccCommDto()]
  otherCenterSelection: AccCommDto[] = [new AccCommDto()]
  salesOrganizationSelection: AccCommDto[] = [new AccCommDto()]
  distributionChannelSelection: AccCommDto[] = [new AccCommDto()]
  salesOfficeSelection: AccCommDto[] = [new AccCommDto()]
  salesGroupSelection: AccCommDto[] = [new AccCommDto()]
  placeOfSupplySelection: AccCommDto[] = [new AccCommDto()]
  jurisdictionChannelSelection: AccCommDto[] = [new AccCommDto()]
  PaymentTermsSelection: AccCommDto[] = [new AccCommDto()]
  InterCoPurchaseAcc: AccCommDto[] = [new AccCommDto()]
  InterCoSalesAcc: AccCommDto[] = [new AccCommDto()]
  InterCoExpenses: AccCommDto[] = [new AccCommDto()]
  CompanyExpense: AccCommDto[] = [new AccCommDto()]
  supplierAndCustCategory: AccCommDto[] = [new AccCommDto()]
  supplierAndCustGrouping: AccCommDto[] = [new AccCommDto()]
  TblHFirstTax: TblHFirstTax[] = [new TblHFirstTax()]


  area: any;
  city: any;
  country: any;
  accType: any;
  accModule: any;
  accGroup: any;
  activateAndDeactivate: any;
  accOne: any;
  menuCode: any;
  singleCoMaster: any;
  accountMaster: any;
  jurisdiction: any;
  placeOfsupply: any;
  salesGroup: any;
  salesOffice: any;
  costCenter: any;
  profitCenter: any;
  salesMan: any;
  division: any;
  department: any;
  job: any;
  otherCentre: any;
  salesOrganization: any;
  distributionChannel: any;
  tax: any;
  paymentTerms: any;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    private _masterService: MasterService,
    private _messageService: MessageService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    if (!this.TblHAccGroupDto.TblHAccOne) {
      this.TblHAccGroupDto.TblHAccOne = [new TblHAccOneDto()];
    }

    if (!this.TblHAccGroupDto.TblHAccOne[0]) {
      this.TblHAccGroupDto.TblHAccOne[0] = new TblHAccOneDto();
    }

    if (!this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo) {
      this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo = [];
    }

    this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo.push(new TbldAccOneCodtoapplicable());

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HAccGroup_SysID = Number(id);
        this.TblHAccGroupDto.HAccGroup_SysID = Number(id);
        this.getdata()
      }
    });

    this.getLovData()
    // this.TaxSelection = [new AccCommDto()]
    // this.costCenterSelection = [new AccCommDto()]
    // this.profitCenterSelection = [new AccCommDto()]
    // this.salesmanSelection = [new AccCommDto()]
    // this.divisionSelection = [new AccCommDto()]
    // this.departmentSelection = [new AccCommDto()]
    // this.jobSelection = [new AccCommDto()]
    // this.otherCenterSelection = [new AccCommDto()]
    // this.salesOrganizationSelection = [new AccCommDto()]
    // this.distributionChannelSelection = [new AccCommDto()]
    // this.salesOfficeSelection = [new AccCommDto()]
    // this.salesGroupSelection = [new AccCommDto()]
    // this.placeOfSupplySelection = [new AccCommDto()]
    // this.jurisdictionChannelSelection = [new AccCommDto()]
    // this.PaymentTermsSelection = [new AccCommDto()]
    // this.InterCoPurchaseAcc = [new AccCommDto()]
    // this.InterCoSalesAcc = [new AccCommDto()]
    // this.InterCoExpenses = [new AccCommDto()]
    // this.CompanyExpense = [new AccCommDto()]
    // this.supplierAndCustCategory = [new AccCommDto()]
    // this.supplierAndCustGrouping = [new AccCommDto()]
    // this.TblHFirstTax = [new TblHFirstTax()]

  }


  getLovData() {
    this._salesService.getMasterData(apiUrl.area).then((res) => {
      this.area = res
    })
    this._salesService.getMasterData(apiUrl.city).then((res) => {
      this.city = res
    })
    this._salesService.getMasterData(apiUrl.country).then((res) => {
      this.country = res
    })
    this._salesService.getMasterData(apiUrl.accType).then((res) => {
      this.accType = res
    })
    this._salesService.getMasterData(apiUrl.accModule).then((res) => {
      this.accModule = res
    })
    this._salesService.getMasterData(apiUrl.accGroup).then((res) => {
      this.accGroup = res
    })
    this._salesService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this._salesService.getMasterData(apiUrl.singleCoMaster).then((res) => {
      this.singleCoMaster = res
    })
    this._salesService.getMasterData(apiUrl.menuCode).then((res) => {
      this.menuCode = res
    })
    this._salesService.getMasterData(apiUrl.accountMaster).then((res) => {
      this.accountMaster = res
    })
     this._salesService.getMasterData(apiUrl.paymentTermsMaster).then((res) => {
      this.paymentTerms = res
    })

    ///


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
    this._salesService.getMasterData(apiUrl.tax).then((res) => {
      this.tax = res
    })

  }



  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {
      case 'AreaCode':
        this.popUpService.popUpData = this.area;
        break;
      case 'CityCode':
        this.popUpService.popUpData = this.city;
        break;
      case 'CountryCode':
        this.popUpService.popUpData = this.country;
        break;

      case 'AreaCode2':
        this.popUpService.popUpData = this.area;
        break;
      case 'CityCode2':
        this.popUpService.popUpData = this.city;
        break;
      case 'CountryCode2':
        this.popUpService.popUpData = this.country;
        break;
      case 'AccModuleCode':
        this.popUpService.popUpData = this.accModule;
        break;
      case 'AccGroupCodeData':
        this.popUpService.popUpData = this.accGroup;
        break;
      case 'CompGrpWiseAccTypeCode':
        this.popUpService.popUpData = this.accType;
        break;


      case 'CompWiseAccModule':
        this.popUpService.popUpData = this.accModule;
        break;
      case 'CompWiseGroupCode':
        this.popUpService.popUpData = this.accGroup;
        break;
      case 'CompWiseAccTypeCode':
        this.popUpService.popUpData = this.accType;
        break;

      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activateAndDeactivate;
        break;

      case 'ActAndDeactCodeCompany':
        this.popUpService.popUpData = this.activateAndDeactivate;
        break;
      case 'MenuCode':
        this.popUpService.popUpData = this.menuCode;
        break;
      case 'PaymentTerms':
        this.popUpService.popUpData = this.paymentTerms;
        break;





      case 'InventoryAccCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'CostOfSalesAccCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'SalesAccCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'PurcahseAccCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'VatInputAccCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'VatOutputAccCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'VatAdvAccCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'OtherTaxInputAccCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'OtherTaxOutputAccCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCoMaster;
        break;

      case 'GroupCoCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
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



      case 'TaxCode':
        this.popUpService.popUpData = this.tax;
        break;
      case 'PurchaseAccountCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'CompanySalesCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'CompanyExpenseCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'SupplierCustomerCode':
        this.popUpService.popUpData = this.accountMaster;
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

      case 'AreaCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Area_SysID = event.HAreaCode_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Area_Code = event.HAreaCode_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Area_Name = event.HAreaCode_Name
        break;
      case 'CityCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_City_SysID = event.HCity_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_City_Code = event.HCity_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_City_Name = event.HCity_Name
        break;
      case 'CountryCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Count_SysID = event.HCountry_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Count_Code = event.HCountry_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Count_Name = event.HCountry_Name
        break;



      case 'ActAndDeactCode':
        this.TblHAccGroupDto.HAccGroup_AcDe_SysID = event.HActDeactive_SysID
        this.TblHAccGroupDto.HAccGroup_AcDe_Code = event.HActDeactive_Code
        this.TblHAccGroupDto.HAccGroup_AcDe_Name = event.HActDeactive_Name
        break;

      // sec tab
      case 'MenuCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Menu_SysID = event.HMenu_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Menu_Code = event.HMenu_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Menu_Name = event.HMenu_Name
        break;
      case 'AreaCode2':
        this.TblHAccGroupDto.HAccGroup_Area_SysID = event.HAreaCode_SysID
        this.TblHAccGroupDto.HAccGroup_Area_Code = event.HAreaCode_Code
        this.TblHAccGroupDto.HAccGroup_Area_Name = event.HAreaCode_Name
        break;
      case 'CityCode2':
        this.TblHAccGroupDto.HAccGroup_City_SysID = event.HCity_SysID
        this.TblHAccGroupDto.HAccGroup_City_Code = event.HCity_Code
        this.TblHAccGroupDto.HAccGroup_City_Name = event.HCity_Name
        break;
      case 'CountryCode2':
        this.TblHAccGroupDto.HAccGroup_Count_SysID = event.HCountry_SysID
        this.TblHAccGroupDto.HAccGroup_Count_Code = event.HCountry_Code
        this.TblHAccGroupDto.HAccGroup_Count_Name = event.HCountry_Name
        break;

      case 'InventoryAccCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_InvAcc_SysID = event.HAccOne_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_InvAcc_Code = event.HAccOne_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_InvAcc_Name = event.HAccOne_Name
        break;
      case 'CostOfSalesAccCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_COSAcc_SysID = event.HAccOne_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_COSAcc_Code = event.HAccOne_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_COSAcc_Name = event.HAccOne_Name
        break;
      case 'SalesAccCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_SalAcc_SysID = event.HAccOne_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_SalAcc_Code = event.HAccOne_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_SalAcc_Name = event.HAccOne_Name
        break;
      case 'PurcahseAccCode':
        this.TblHAccGroupDto.TblHAccOne[0].HProd_PurAcc_SysID = event.HAccOne_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HProd_PurAcc_Code = event.HAccOne_Code
        this.TblHAccGroupDto.TblHAccOne[0].HProd_PurAcc_Name = event.HAccOne_Name
        break;
      case 'VatInputAccCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_TaxInPut_SysID = event.HAccOne_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_TaxInPut_Code = event.HAccOne_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_TaxInPut_Name = event.HAccOne_Name
        break;
      case 'VatOutputAccCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_TaxOutPut_SysID = event.HAccOne_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_TaxOutPut_Code = event.HAccOne_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_TaxOutPut_Name = event.HAccOne_Name
        break;
      case 'VatAdvAccCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_TaxAdvPut_SysID = event.HAccOne_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_TaxAdvPut_Code = event.HAccOne_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_TaxAdvPut_Name = event.HAccOne_Name
        break;
      case 'OtherTaxInputAccCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_OtaxInPut_SysID = event.HAccOne_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_OtaxInPut_Code = event.HAccOne_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_OtaxInPut_Name = event.HAccOne_Name
        break;
      case 'OtherTaxOutputAccCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_OtaxOutPut_SysID = event.HAccOne_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_OtaxOutPut_Code = event.HAccOne_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_OtaxOutPut_Name = event.HAccOne_Name
        break;

      case 'ActAndDeactCodeCompany':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_AcDe_SysID = event.HActDeactive_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_AcDe_Code = event.HActDeactive_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_AcDe_Name = event.HActDeactive_Name
        break;

      // Company Group Wise

      case 'AccModuleCode':
        this.TblHAccGroupDto.HAccGroup_Module_SysID = event.HAccModule_SysID
        this.TblHAccGroupDto.HAccGroup_Module_Code = event.HAccModule_Code
        this.TblHAccGroupDto.HAccGroup_Module_Name = event.HAccModule_Name
        break;

      case 'AccGroupCodeData':
        this.TblHAccGroupDto.HAccGroup_Group_SysID = event.HMAccGroup_SysID
        this.TblHAccGroupDto.HAccGroup_Group_Code = event.HMAccGroup_Code
        this.TblHAccGroupDto.HAccGroup_Group_Name = event.HMAccGroup_Name
        break;
      case 'CompGrpWiseAccTypeCode':
        this.TblHAccGroupDto.HAccGroup_Type_SysID = event.HAccType_SysID
        this.TblHAccGroupDto.HAccGroup_Type_Code = event.HAccType_Code
        this.TblHAccGroupDto.HAccGroup_Type_Name = event.HAccType_Name
        break;


      // Company  Wise Details

      case 'CompWiseAccModule':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Module_SysID = event.HAccModule_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Module_Code = event.HAccModule_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Module_Name = event.HAccModule_Name
        break;

      case 'CompWiseGroupCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Group_SysID = event.HMAccGroup_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Group_Code = event.HMAccGroup_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Group_Name = event.HMAccGroup_Name
        break;
      case 'CompWiseAccTypeCode':
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Type_SysID = event.HAccType_SysID
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Type_Code = event.HAccType_Code
        this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Type_Name = event.HAccType_Name
        break;
      case 'ApplicableCompanyCode':

        const selectedCode = event.SingleCo_Code
        const isExist = this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo.some(item => item.DcAccOne_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for area Master' });
          return;
        }
        this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo[this.tableIndex].DcAccOne_SingleCo_SysID = event.SingleCo_SysID
        this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo[this.tableIndex].DcAccOne_SingleCo_Code = event.SingleCo_Code
        this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo[this.tableIndex].DcAccOne_SingleCo_Name = event.SingleCo_Name
        break;


      case 'CostCenterCode':
        this.costCenterSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HCostCent_SysID
        this.costCenterSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HCostCent_Code
        this.costCenterSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HCostCent_Name
        this.costCenterSelection[this.tableIndex].DcAccOne_Grid_Number = 102
        break;
      case 'ProfitCenterCode':
        this.profitCenterSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HProfCent_SysID
        this.profitCenterSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HProfCent_Code
        this.profitCenterSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HProfCent_Name
        this.profitCenterSelection[this.tableIndex].DcAccOne_Grid_Number = 103
        break;
      case 'SalesmanCode':
        this.salesmanSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HSman_SysID
        this.salesmanSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HSman_Code
        this.salesmanSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HSman_Name
        this.salesmanSelection[this.tableIndex].DcAccOne_Grid_Number = 104
        break;
      case 'DivisionCode':
        this.divisionSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HDivision_SysID
        this.divisionSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HDivision_Code
        this.divisionSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HDivision_Name
        this.divisionSelection[this.tableIndex].DcAccOne_Grid_Number = 105
        break;

      case 'DepartmentCode':
        this.departmentSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HDept_SysID
        this.departmentSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HDept_Code
        this.departmentSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HDept_Name
        this.departmentSelection[this.tableIndex].DcAccOne_Grid_Number = 106
        break;
      case 'JobCode':
        this.jobSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HJob_SysID
        this.jobSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HJob_Code
        this.jobSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HJob_Name
        this.jobSelection[this.tableIndex].DcAccOne_Grid_Number = 107
        break;
      case 'OtherCentreCode':
        this.otherCenterSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HOthCentre_SysID
        this.otherCenterSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HOthCentre_Code
        this.otherCenterSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HOthCentre_Name
        this.otherCenterSelection[this.tableIndex].DcAccOne_Grid_Number = 108
        break;
      case 'SalesOrganizationCode':
        this.salesOrganizationSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HSalesOrg_SysID
        this.salesOrganizationSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HSalesOrg_Code
        this.salesOrganizationSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HSalesOrg_Name
        this.salesOrganizationSelection[this.tableIndex].DcAccOne_Grid_Number = 109
        break;

      case 'DistributionChannelCode':
        this.distributionChannelSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HDistChanel_SysID
        this.distributionChannelSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HDistChanel_Code
        this.distributionChannelSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HDistChanel_Name
        this.distributionChannelSelection[this.tableIndex].DcAccOne_Grid_Number = 110
        break;
      case 'SalesOfficeCode':
        this.salesOfficeSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HSoffice_SysID
        this.salesOfficeSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HSoffice_Code
        this.salesOfficeSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HSoffice_Name
        this.salesOfficeSelection[this.tableIndex].DcAccOne_Grid_Number = 111
        break;
      case 'SalesGroupCode':
        this.salesGroupSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HSalGroup_SysID
        this.salesGroupSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HSalGroup_Code
        this.salesGroupSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HSalGroup_Name
        this.salesGroupSelection[this.tableIndex].DcAccOne_Grid_Number = 112
        break;
      case 'PlaceOfSupplyCode':
        this.placeOfSupplySelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HPlaceSupply_SysID
        this.placeOfSupplySelection[this.tableIndex].DcAccOne_AccComm_Code = event.HPlaceSupply_Code
        this.placeOfSupplySelection[this.tableIndex].DcAccOne_AccComm_Name = event.HPlaceSupply_Name
        this.placeOfSupplySelection[this.tableIndex].DcAccOne_Grid_Number = 113
        break;
      case 'JurisdictionCode':
        this.jurisdictionChannelSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HJurisd_SysID
        this.jurisdictionChannelSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HJurisd_Code
        this.jurisdictionChannelSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HJurisd_Name
        this.jurisdictionChannelSelection[this.tableIndex].DcAccOne_Grid_Number = 114
        break;
      case 'PaymentTerms':
        this.PaymentTermsSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HPayTerm_SysID
        this.PaymentTermsSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HPayTerm_Code
        this.PaymentTermsSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HPayTerm_Name
        this.PaymentTermsSelection[this.tableIndex].DcAccOne_AccComm_Days = event.HPayTerm_Days
        this.PaymentTermsSelection[this.tableIndex].DcAccOne_Grid_Number = 115
        break;

      case 'GroupCoCode':
        this.supplierAndCustGrouping[this.tableIndex].DcAccOne_AccComm_SysID = event.HAccOne_SysID
        this.supplierAndCustGrouping[this.tableIndex].DcAccOne_AccComm_Code = event.HAccOne_Code
        this.supplierAndCustGrouping[this.tableIndex].DcAccOne_AccComm_Name = event.HAccOne_Name
        this.supplierAndCustGrouping[this.tableIndex].DcAccOne_Grid_Number = 101

        break;

      case 'PurchaseAccountCode':
        this.InterCoPurchaseAcc[this.tableIndex].DcAccOne_AccComm_SysID = event.HAccOne_SysID
        this.InterCoPurchaseAcc[this.tableIndex].DcAccOne_AccComm_Code = event.HAccOne_Code
        this.InterCoPurchaseAcc[this.tableIndex].DcAccOne_AccComm_Name = event.HAccOne_Name
        this.InterCoPurchaseAcc[this.tableIndex].DcAccOne_Grid_Number = 117
        break;
      case 'TaxCode':
        this.TaxSelection[this.tableIndex].DcAccOne_AccComm_SysID = event.HFirstRateTax_SysID
        this.TaxSelection[this.tableIndex].DcAccOne_AccComm_Code = event.HFirstRateTax_Code
        this.TaxSelection[this.tableIndex].DcAccOne_AccComm_Name = event.HFirstRateTax_Name
        this.TaxSelection[this.tableIndex].DcAccOne_TaxInPut_Prce = event.HFirstRateTax_InputPerc
        this.TaxSelection[this.tableIndex].DcAccOne_TaxOutPut_Prce = event.HFirstRateTax_OutputPerc
        this.TaxSelection[this.tableIndex].DcAccOne_Grid_Number = 116
        break;
      case 'CompanySalesCode':
        this.InterCoSalesAcc[this.tableIndex].DcAccOne_AccComm_SysID = event.HAccOne_SysID
        this.InterCoSalesAcc[this.tableIndex].DcAccOne_AccComm_Code = event.HAccOne_Code
        this.InterCoSalesAcc[this.tableIndex].DcAccOne_AccComm_Name = event.HAccOne_Name
        this.InterCoSalesAcc[this.tableIndex].DcAccOne_Grid_Number = 118
        break;
      case 'CompanyExpenseCode':
        this.InterCoExpenses[this.tableIndex].DcAccOne_AccComm_SysID = event.HAccOne_SysID
        this.InterCoExpenses[this.tableIndex].DcAccOne_AccComm_Code = event.HAccOne_Code
        this.InterCoExpenses[this.tableIndex].DcAccOne_AccComm_Name = event.HAccOne_Name
        this.InterCoExpenses[this.tableIndex].DcAccOne_Grid_Number = 119
        break;
      case 'SupplierCustomerCode':
        this.supplierAndCustCategory[this.tableIndex].DcAccOne_AccComm_SysID = event.HAccOne_SysID
        this.supplierAndCustCategory[this.tableIndex].DcAccOne_AccComm_Code = event.HAccOne_Code
        this.supplierAndCustCategory[this.tableIndex].DcAccOne_AccComm_Name = event.HAccOne_Name
        this.supplierAndCustCategory[this.tableIndex].DcAccOne_Grid_Number = 120
        break;

      default:
        break;
    }

  }

  routeTo(screen) {
    this.router.navigate([screen]);
  }

  deleteRow(table: any, index: number, rowData) {

    if (table == 'TaxSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // if (table === 'TaxSelection') {
          //   this.TaxSelection.splice(index, 1);
          //   if (this.TaxSelection.length === 0) {
          //     this.addRow('TaxSelection', -1);
          //   }
          // }


          if (this.TblHAccGroupDto.HAccGroup_SysID && rowData.DcAccOne_AccComm_SysID) {
            this._masterService.deleteData(apiUrl.accountGroupMaster, `master?where[DcAccOne_SysID]=${this.TblHAccGroupDto.TblHAccCom[0].DcAccOne_SysID}&where[DcAccOne_AccComm_SysID]=${rowData.DcAccOne_AccComm_SysID}`).then((res) => {

              if (res.success == false) {
                this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

              } else {
                this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                if (table === 'TaxSelection') {
                  this.TblHAccGroupDto.TblHAccCom.splice(index, 1);
                  if (this.TblHAccGroupDto.TblHAccCom.length === 0) {
                    this.addRow('TblHAccCom', -1);
                  }
                }

              }

            });
          } else {
            if (table === 'TaxSelection') {
              this.TblHAccGroupDto.TblHAccCom.splice(index, 1);
              if (this.TblHAccGroupDto.TblHAccCom.length === 0) {
                this.addRow('TblHAccCom', -1);
              }
            }
          }

        }
      });
    }

    if (table == 'profitCenterSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'profitCenterSelection') {
            this.profitCenterSelection.splice(index, 1);
            if (this.profitCenterSelection.length === 0) {
              this.addRow('profitCenterSelection', -1);
            }
          }
        }
      });

    }
    if (table == 'salesmanSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'salesmanSelection') {
            this.salesmanSelection.splice(index, 1);
            if (this.salesmanSelection.length === 0) {
              this.addRow('salesmanSelection', -1);
            }
          }
        }
      });
    }
    if (table == 'divisionSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'divisionSelection') {
            this.divisionSelection.splice(index, 1);
            if (this.divisionSelection.length === 0) {
              this.addRow('divisionSelection', -1);
            }
          }
        }
      });
    }

    if (table == 'departmentSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'departmentSelection') {
            this.departmentSelection.splice(index, 1);
            if (this.departmentSelection.length === 0) {
              this.addRow('departmentSelection', -1);
            }
          }
        }
      });
    }
    if (table == 'jobSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'jobSelection') {
            this.jobSelection.splice(index, 1);
            if (this.jobSelection.length === 0) {
              this.addRow('jobSelection', -1);
            }
          }
        }
      });
    }
    if (table == 'otherCenterSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'otherCenterSelection') {
            this.otherCenterSelection.splice(index, 1);
            if (this.otherCenterSelection.length === 0) {
              this.addRow('otherCenterSelection', -1);
            }
          }
        }
      });

    }
    if (table == 'salesOrganizationSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'salesOrganizationSelection') {
            this.salesOrganizationSelection.splice(index, 1);
            if (this.salesOrganizationSelection.length === 0) {
              this.addRow('salesOrganizationSelection', -1);
            }
          }
        }
      });
    }

    if (table == 'distributionChannelSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'distributionChannelSelection') {
            this.distributionChannelSelection.splice(index, 1);
            if (this.distributionChannelSelection.length === 0) {
              this.addRow('distributionChannelSelection', -1);
            }
          }
        }
      });

    }
    if (table == 'salesOfficeSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'salesOfficeSelection') {
            this.salesOfficeSelection.splice(index, 1);
            if (this.salesOfficeSelection.length === 0) {
              this.addRow('salesOfficeSelection', -1);
            }
          }
        }
      });

    }
    if (table == 'salesGroupSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'salesGroupSelection') {
            this.salesGroupSelection.splice(index, 1);
            if (this.salesGroupSelection.length === 0) {
              this.addRow('salesGroupSelection', -1);
            }
          }
        }
      });
    }
    if (table == 'placeOfSupplySelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'placeOfSupplySelection') {
            this.placeOfSupplySelection.splice(index, 1);
            if (this.placeOfSupplySelection.length === 0) {
              this.addRow('placeOfSupplySelection', -1);
            }
          }
        }
      });
    }
    if (table == 'jurisdictionChannelSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'jurisdictionChannelSelection') {
            this.jurisdictionChannelSelection.splice(index, 1);
            if (this.jurisdictionChannelSelection.length === 0) {
              this.addRow('jurisdictionChannelSelection', -1);
            }
          }
        }
      });
    }
    if (table == 'PaymentTermsSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'PaymentTermsSelection') {
            this.PaymentTermsSelection.splice(index, 1);
            if (this.PaymentTermsSelection.length === 0) {
              this.addRow('PaymentTermsSelection', -1);
            }
          }
        }
      });
    }
    //

    if (table == 'InterCoPurchaseAcc') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'InterCoPurchaseAcc') {
            this.InterCoPurchaseAcc.splice(index, 1);
            if (this.InterCoPurchaseAcc.length === 0) {
              this.addRow('InterCoPurchaseAcc', -1);
            }
          }
        }
      });
    }
    if (table == 'InterCoSalesAcc') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'InterCoSalesAcc') {
            this.InterCoSalesAcc.splice(index, 1);
            if (this.InterCoSalesAcc.length === 0) {
              this.addRow('InterCoSalesAcc', -1);
            }
          }
        }
      });
    }
    if (table == 'InterCoExpenses') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'InterCoExpenses') {
            this.InterCoExpenses.splice(index, 1);
            if (this.InterCoExpenses.length === 0) {
              this.addRow('InterCoExpenses', -1);
            }
          }
        }
      });
    }
    if (table == 'supplierAndCustCategory') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'supplierAndCustCategory') {
            this.supplierAndCustCategory.splice(index, 1);
            if (this.supplierAndCustCategory.length === 0) {
              this.addRow('supplierAndCustCategory', -1);
            }
          }
        }
      });
    }
    if (table == 'CompanyExpense') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'CompanyExpense') {
            this.CompanyExpense.splice(index, 1);
            if (this.CompanyExpense.length === 0) {
              this.addRow('CompanyExpense', -1);
            }
          }
        }
      });
    }
    if (table == 'supplierAndCustGrouping') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'supplierAndCustGrouping') {
            this.supplierAndCustGrouping.splice(index, 1);
            if (this.supplierAndCustGrouping.length === 0) {
              this.addRow('supplierAndCustGrouping', -1);
            }
          }
        }
      });
    }

    if (table == 'costCenterSelection') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'costCenterSelection') {
            this.costCenterSelection.splice(index, 1);
            if (this.costCenterSelection.length === 0) {
              this.addRow('costCenterSelection', -1);
            }
          }
        }
      });
    }

    if (table == 'TbldAccOneCo') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'TbldAccOneCo') {
            this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo.splice(index, 1);
            if (this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo.length === 0) {
              this.addRow('TbldAccOneCo', -1);
            }
          }
        }
      });
    }



  }

  addRow(table: any, index: number) {

    if (table == 'costCenterSelection') {
      const newRow = new AccCommDto()
      this.costCenterSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'profitCenterSelection') {
      const newRow = new AccCommDto()
      this.profitCenterSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesmanSelection') {
      const newRow = new AccCommDto()
      this.salesmanSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'divisionSelection') {
      const newRow = new AccCommDto()
      this.divisionSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'CompanyExpense') {
      const newRow = new AccCommDto()
      this.CompanyExpense.splice(index + 1, 0, newRow);
    }

    if (table == 'departmentSelection') {
      const newRow = new AccCommDto()
      this.departmentSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'jobSelection') {
      const newRow = new AccCommDto()
      this.jobSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'otherCenterSelection') {
      const newRow = new AccCommDto()
      this.otherCenterSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesOrganizationSelection') {
      const newRow = new AccCommDto()
      this.salesOrganizationSelection.splice(index + 1, 0, newRow);
    }

    if (table == 'distributionChannelSelection') {
      const newRow = new AccCommDto()
      this.distributionChannelSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesOfficeSelection') {
      const newRow = new AccCommDto()
      this.salesOfficeSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesGroupSelection') {
      const newRow = new AccCommDto()
      this.salesGroupSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'placeOfSupplySelection') {
      const newRow = new AccCommDto()
      this.placeOfSupplySelection.splice(index + 1, 0, newRow);
    }
    if (table == 'jurisdictionChannelSelection') {
      const newRow = new AccCommDto()
      this.jurisdictionChannelSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'TaxSelection') {
      const newRow = new AccCommDto()
      this.TaxSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'PaymentTermsSelection') {
      const newRow = new AccCommDto()
      this.PaymentTermsSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'InterCoPurchaseAcc') {
      const newRow = new AccCommDto()
      this.InterCoPurchaseAcc.splice(index + 1, 0, newRow);
    }
    if (table == 'InterCoSalesAcc') {
      const newRow = new AccCommDto()
      this.InterCoSalesAcc.splice(index + 1, 0, newRow);
    }
    if (table == 'InterCoExpenses') {
      const newRow = new AccCommDto()
      this.InterCoExpenses.splice(index + 1, 0, newRow);
    }
    if (table == 'supplierAndCustCategory') {
      const newRow = new AccCommDto()
      this.supplierAndCustCategory.splice(index + 1, 0, newRow);
    }

    if (table == 'supplierAndCustGrouping') {
      const newRow = new AccCommDto()
      this.supplierAndCustGrouping.splice(index + 1, 0, newRow);
    }

    if (table == 'TbldAccOneCo') {
      const newRow = new TbldAccOneCodtoapplicable()
      this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo.splice(index + 1, 0, newRow);

    }





  }

  changeIndex(i) {

    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }




  // ---------------------------------------Main group and Company dropdown-----------------------

  mainGroupOptions = [
    { name: 'Assets & Liabilities', code: '1001', sysid: 1001 },
    { name: 'Income and Expenses', code: '1002', sysid: 1002 }
  ];

  selectedMainGroup: any = null;
  onMainGroupChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.HAccGroup_MainAssLiab_SysID = selected.sysid;
      this.TblHAccGroupDto.HAccGroup_MainAssLiab_Code = selected.code;
      this.TblHAccGroupDto.HAccGroup_MainAssLiab_Name = selected.name;

    }
  }

  mainGroupcompanyOptions = [
    { name: 'Assets & Liabilities', code: '1001', sysid: 1001 },
    { name: 'Income and Expenses', code: '1002', sysid: 1002 }
  ];
  selectedcompanyMainGroup: any = null

  onMainGroupcompanyChange(selected: any) {
    if (selected) {

      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_MainAssLiab_SysID = selected.sysid;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_MainAssLiab_Code = selected.code;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_MainAssLiab_Name = selected.name;


    }
  }

  // ---------------------------------------Sub group and Company dropdown-----------------------

  subGroupOptions = [
    { code: '1001', name: 'Account Receivable and Payable (For Allocation)', sysid: 1001 },
    { code: '1002', name: 'Indirect Tax (VAT, GST Etc)', sysid: 1002 },
    { code: '1003', name: 'Direct Tax (Income Tax)', sysid: 1003 },
    { code: '1004', name: 'Tax Advance (For Allocation)', sysid: 1004 },
    { code: '1005', name: 'Profit and Loss Account', sysid: 1005 },
    { code: '1006', name: 'Direct Expenses', sysid: 1006 },
    { code: '1007', name: 'Indirect Expenses', sysid: 1007 },
    { code: '1008', name: 'Control Account', sysid: 1008 }
  ];


  selectedSubGroup: any = null;

  onSubGroupChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.HAccGroup_SubAssLiab_SysID = selected.sysid;
      this.TblHAccGroupDto.HAccGroup_SubAssLiab_Code = selected.code;
      this.TblHAccGroupDto.HAccGroup_SubAssLiab_Name = selected.name;
    }
  }


  subGroupCompanyOptions = [
    { code: '1001', name: 'Account Receivable and Payable (For Allocation)', sysid: 1001 },
    { code: '1002', name: 'Indirect Tax (VAT, GST Etc)', sysid: 1002 },
    { code: '1003', name: 'Direct Tax (Income Tax)', sysid: 1003 },
    { code: '1004', name: 'Tax Advance (For Allocation)', sysid: 1004 },
    { code: '1005', name: 'Profit and Loss Account', sysid: 1005 },
    { code: '1006', name: 'Direct Expenses', sysid: 1006 },
    { code: '1007', name: 'Indirect Expenses', sysid: 1007 },
    { code: '1008', name: 'Control Account', sysid: 1008 }
  ];

  selectedSubcompanyGroup: any = null;

  onSubGroupcompanyChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_SubAssLiab_SysID = selected.sysid;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_SubAssLiab_Code = selected.code;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_SubAssLiab_Name = selected.name;
    }
  }

  // ---------------------------------------Fixed group and Company dropdown-----------------------

  fixedAssetsOptions = [
    { name: 'Fixed Assets', code: '1001', sysid: 201 },
    { name: 'Accumulated Depreciation', code: '1002', sysid: 202, },
    { name: 'Not Applicable', code: '1003', sysid: 203 }
  ];

  selectedFixedGroup: any = null;
  onFixedGroupChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.HAccGroup_FA_SysID = selected.sysid;
      this.TblHAccGroupDto.HAccGroup_FA_Code = selected.code;
      this.TblHAccGroupDto.HAccGroup_FA_Name = selected.name;
    }
  }

  fixedAssetscompanyOptions = [
    { name: 'Fixed Assets', code: '1001', sysid: 201 },
    { name: 'Accumulated Depreciation', code: '1002', sysid: 202, },
    { name: 'Not Applicable', code: '1003', sysid: 203 }
  ];

  selectedFixedcompanyGroup: any = null;
  onFixedGroupcompanyChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_FA_SysID = selected.sysid;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_FA_Code = selected.code;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_FA_Name = selected.name;
    }
  }

  // --------------------------Main and sub employee Dropdown-----------------------------------------------

  employeeOptions = [
    { name: 'Employee Account', code: '1001', sysid: 301 },
    { name: 'Not Applicable', code: '1002', sysid: 302 }
  ];

  selectedEmployeeGroup: any = null;

  onEmployeeGroupChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.HAccGroup_Emp_SysID = selected.sysid;
      this.TblHAccGroupDto.HAccGroup_Emp_Code = selected.code;
      this.TblHAccGroupDto.HAccGroup_Emp_Name = selected.name;
    }
  }

  employeeCompanyOptions = [
    { name: 'Employee Account', code: '1001', sysid: 301 },
    { name: 'Not Applicable', code: '1002', sysid: 302 }
  ];

  selectedEmployeeCompanyGroup: any = null;

  onEmployeeGroupCompanyChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Emp_SysID = selected.sysid;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Emp_Code = selected.code;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Emp_Name = selected.name;
    }
  }

  // --------------------------------------main and sub production dropdown----------------------------

  productionOptions = [
    { name: 'Bill of Material Account', code: '1001', sysid: 401 },
    { name: 'Not Applicable', code: '1002', sysid: 402 }
  ];

  selectedProductionGroup: any = null;

  onProductionGroupChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.HAccGroup_Prod_SysID = selected.sysid;
      this.TblHAccGroupDto.HAccGroup_Prod_Code = selected.code;
      this.TblHAccGroupDto.HAccGroup_Prod_Name = selected.name;
    }
  }
  productionCompanyOptions = [
    { name: 'Bill of Material Account', code: '1001', sysid: 401 },
    { name: 'Not Applicable', code: '1002', sysid: 402 }
  ];

  selectedProductioncompanyGroup: any = null;

  onProductionGroupcompanyChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Prod_SysID = selected.sysid;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Prod_Code = selected.code;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_Prod_Name = selected.name;
    }
  }
  // ------------------------------main and sub accrual dropdown--------------------------------

  accrualPrepaidOptions = [
    { name: 'Accruals', code: '1001', sysid: 501 },
    { name: 'Prepaid', code: '1002', sysid: 502 },
    { name: 'Not Applicable', code: '1003', sysid: 503 }
  ];

  selectedAccrualGroup: any = null;

  onAccrualGroupChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.HAccGroup_AccPre_SysID = selected.sysid;
      this.TblHAccGroupDto.HAccGroup_AccPre_Code = selected.code;
      this.TblHAccGroupDto.HAccGroup_AccPre_Name = selected.name;
    }
  }
  accrualPrepaidCompanyOptions = [
    { name: 'Accruals', code: '1001', sysid: 501 },
    { name: 'Prepaid', code: '1002', sysid: 502 },
    { name: 'Not Applicable', code: '1003', sysid: 503 }
  ];

  selectedAccrualCompanyGroup: any = null;

  onAccrualGroupCompanyChange(selected: any) {
    if (selected) {
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_AccPre_SysID = selected.sysid;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_AccPre_Code = selected.code;
      this.TblHAccGroupDto.TblHAccOne[0].HAccOne_AccPre_Name = selected.name;
    }
  }




  getdata() {
    const groupId = this.TblHAccGroupDto?.HAccGroup_SysID || this.HAccGroup_SysID;

    if (groupId) {
      this._masterService.getMasterDatabyId(apiUrl.accountGroupMaster, groupId).then((res) => {
        this.TblHAccGroupDto = res;
        this.showDeleteButton = true;

        // Initialize TblHAccOne and nested TbldAccOneCo
        if (!this.TblHAccGroupDto.TblHAccOne || this.TblHAccGroupDto.TblHAccOne.length === 0) {
          this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo = [new TbldAccOneCodtoapplicable()];
        } else if (!this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo || this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo.length === 0) {
          this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo = [new TbldAccOneCodtoapplicable()];
        }


        // Main Group
        this.selectedMainGroup = this.mainGroupOptions.find(opt => opt.code === this.TblHAccGroupDto.HAccGroup_MainAssLiab_Code);
        this.selectedcompanyMainGroup = this.mainGroupcompanyOptions.find(opt => opt.code === this.TblHAccGroupDto.TblHAccOne[0]?.HAccOne_MainAssLiab_Code);

        // Sub Group
        this.selectedSubGroup = this.subGroupOptions.find(opt => opt.code === this.TblHAccGroupDto.HAccGroup_SubAssLiab_Code);
        this.selectedSubcompanyGroup = this.subGroupCompanyOptions.find(opt => opt.code === this.TblHAccGroupDto.TblHAccOne[0]?.HAccOne_SubAssLiab_Code);

        // Fixed Assets
        this.selectedFixedGroup = this.fixedAssetsOptions.find(opt => opt.code === this.TblHAccGroupDto.HAccGroup_FA_Code);
        this.selectedFixedcompanyGroup = this.fixedAssetscompanyOptions.find(opt => opt.code === this.TblHAccGroupDto.TblHAccOne[0]?.HAccOne_FA_Code);

        // Employee
        this.selectedEmployeeGroup = this.employeeOptions.find(opt => opt.code === this.TblHAccGroupDto.HAccGroup_Emp_Code);
        this.selectedEmployeeCompanyGroup = this.employeeCompanyOptions.find(opt => opt.code === this.TblHAccGroupDto.TblHAccOne[0]?.HAccOne_Emp_Code);

        // Production
        this.selectedProductionGroup = this.productionOptions.find(opt => opt.code === this.TblHAccGroupDto.HAccGroup_Prod_Code);
        this.selectedProductioncompanyGroup = this.productionCompanyOptions.find(opt => opt.code === this.TblHAccGroupDto.TblHAccOne[0]?.HAccOne_Prod_Code);

        // Accrual/Prepaid
        this.selectedAccrualGroup = this.accrualPrepaidOptions.find(opt => opt.code === this.TblHAccGroupDto.HAccGroup_AccPre_Code);
        this.selectedAccrualCompanyGroup = this.accrualPrepaidCompanyOptions.find(opt => opt.code === this.TblHAccGroupDto.TblHAccOne[0]?.HAccOne_AccPre_Code);






        // Initialize TblmDocAttach and TblHAccCom
        this.TblHAccGroupDto.TblmDocAttach ??= [];
        
        this.TblHAccGroupDto.TblHAccCom ??= [];

        const comList = this.TblHAccGroupDto.TblHAccCom;



        // this.supplierAndCustGrouping = comList.filter(x => x.DcAccOne_Grid_Number === 101);
        
        // this.costCenterSelection = comList.filter(x => x.DcAccOne_Grid_Number === 102);

        // this.profitCenterSelection = comList.filter(x => x.DcAccOne_Grid_Number === 103);
        // this.salesmanSelection = comList.filter(x => x.DcAccOne_Grid_Number === 104);
        // this.divisionSelection = comList.filter(x => x.DcAccOne_Grid_Number === 105);
        // this.departmentSelection = comList.filter(x => x.DcAccOne_Grid_Number === 106);
        // this.jobSelection = comList.filter(x => x.DcAccOne_Grid_Number === 107);
        // this.otherCenterSelection = comList.filter(x => x.DcAccOne_Grid_Number === 108);
        // this.salesOrganizationSelection = comList.filter(x => x.DcAccOne_Grid_Number === 109);
        // this.distributionChannelSelection = comList.filter(x => x.DcAccOne_Grid_Number === 110);
        // this.salesOfficeSelection = comList.filter(x => x.DcAccOne_Grid_Number === 111);
        // this.salesGroupSelection = comList.filter(x => x.DcAccOne_Grid_Number === 112);
        // this.placeOfSupplySelection = comList.filter(x => x.DcAccOne_Grid_Number === 113);
        // this.jurisdictionChannelSelection = comList.filter(x => x.DcAccOne_Grid_Number === 114);
        // this.PaymentTermsSelection = comList.filter(x => x.DcAccOne_Grid_Number === 115);
        // this.TaxSelection = comList.filter(x => x.DcAccOne_Grid_Number === 116);
        // this.InterCoPurchaseAcc = comList.filter(x => x.DcAccOne_Grid_Number === 117);
        // this.InterCoSalesAcc = comList.filter(x => x.DcAccOne_Grid_Number === 118);
        // this.InterCoExpenses = comList.filter(x => x.DcAccOne_Grid_Number === 119);
        // this.supplierAndCustCategory = comList.filter(x => x.DcAccOne_Grid_Number === 120);

        this.supplierAndCustGrouping = comList.filter(x => x.DcAccOne_Grid_Number === 101);
      if (this.supplierAndCustGrouping.length === 0) {
        this.supplierAndCustGrouping = [new AccCommDto()];
      }

      this.costCenterSelection = comList.filter(x => x.DcAccOne_Grid_Number === 102);
      if (this.costCenterSelection.length === 0) {
        this.costCenterSelection = [new AccCommDto()];
      }

      this.profitCenterSelection = comList.filter(x => x.DcAccOne_Grid_Number === 103);
      if (this.profitCenterSelection.length === 0) {
        this.profitCenterSelection = [new AccCommDto()];
      }

      this.salesmanSelection = comList.filter(x => x.DcAccOne_Grid_Number === 104);
      if (this.salesmanSelection.length === 0) {
        this.salesmanSelection = [new AccCommDto()];
      }

      this.divisionSelection = comList.filter(x => x.DcAccOne_Grid_Number === 105);
      if (this.divisionSelection.length === 0) {
        this.divisionSelection = [new AccCommDto()];
      }

      this.departmentSelection = comList.filter(x => x.DcAccOne_Grid_Number === 106);
      if (this.departmentSelection.length === 0) {
        this.departmentSelection = [new AccCommDto()];
      }

      this.jobSelection = comList.filter(x => x.DcAccOne_Grid_Number === 107);
      if (this.jobSelection.length === 0) {
        this.jobSelection = [new AccCommDto()];
      }

      this.otherCenterSelection = comList.filter(x => x.DcAccOne_Grid_Number === 108);
      if (this.otherCenterSelection.length === 0) {
        this.otherCenterSelection = [new AccCommDto()];
      }

      this.salesOrganizationSelection = comList.filter(x => x.DcAccOne_Grid_Number === 109);
      if (this.salesOrganizationSelection.length === 0) {
        this.salesOrganizationSelection = [new AccCommDto()];
      }

      this.distributionChannelSelection = comList.filter(x => x.DcAccOne_Grid_Number === 110);
      if (this.distributionChannelSelection.length === 0) {
        this.distributionChannelSelection = [new AccCommDto()];
      }

      this.salesOfficeSelection = comList.filter(x => x.DcAccOne_Grid_Number === 111);
      if (this.salesOfficeSelection.length === 0) {
        this.salesOfficeSelection = [new AccCommDto()];
      }

      this.salesGroupSelection = comList.filter(x => x.DcAccOne_Grid_Number === 112);
      if (this.salesGroupSelection.length === 0) {
        this.salesGroupSelection = [new AccCommDto()];
      }

      this.placeOfSupplySelection = comList.filter(x => x.DcAccOne_Grid_Number === 113);
      if (this.placeOfSupplySelection.length === 0) {
        this.placeOfSupplySelection = [new AccCommDto()];
      }

      this.jurisdictionChannelSelection = comList.filter(x => x.DcAccOne_Grid_Number === 114);
      if (this.jurisdictionChannelSelection.length === 0) {
        this.jurisdictionChannelSelection = [new AccCommDto()];
      }

      this.PaymentTermsSelection = comList.filter(x => x.DcAccOne_Grid_Number === 115);
      if (this.PaymentTermsSelection.length === 0) {
        this.PaymentTermsSelection = [new AccCommDto()];
      }

      this.TaxSelection = comList.filter(x => x.DcAccOne_Grid_Number === 116);
      if (this.TaxSelection.length === 0) {
        this.TaxSelection = [new AccCommDto()];
      }

      this.InterCoPurchaseAcc = comList.filter(x => x.DcAccOne_Grid_Number === 117);
      if (this.InterCoPurchaseAcc.length === 0) {
        this.InterCoPurchaseAcc = [new AccCommDto()];
      }

      this.InterCoSalesAcc = comList.filter(x => x.DcAccOne_Grid_Number === 118);
      if (this.InterCoSalesAcc.length === 0) {
        this.InterCoSalesAcc = [new AccCommDto()];
      }

      this.InterCoExpenses = comList.filter(x => x.DcAccOne_Grid_Number === 119);
      if (this.InterCoExpenses.length === 0) {
        this.InterCoExpenses = [new AccCommDto()];
      }

      this.supplierAndCustCategory = comList.filter(x => x.DcAccOne_Grid_Number === 120);
      if (this.supplierAndCustCategory.length === 0) {
        this.supplierAndCustCategory = [new AccCommDto()];
      }


        console.log('Fetched Data:', this.TblHAccGroupDto);

      }, err => {
        if (err.error?.statusCode === 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });

          // Reset default DTO structure
          this.TblHAccGroupDto = new TblHAccGroupDto();
          this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo = [new TbldAccOneCodtoapplicable()];

          this.TblHAccGroupDto.TblHAccCom = [];
          this.TblHAccGroupDto.TblmDocAttach = [];

          // Reset all selections
          this.TaxSelection = [new AccCommDto()];
          this.costCenterSelection = [new AccCommDto()];
          this.profitCenterSelection = [new AccCommDto()];
          this.salesmanSelection = [new AccCommDto()];
          this.divisionSelection = [new AccCommDto()];
          this.departmentSelection = [new AccCommDto()];
          this.jobSelection = [new AccCommDto()];
          this.otherCenterSelection = [new AccCommDto()];
          this.salesOrganizationSelection = [new AccCommDto()];
          this.distributionChannelSelection = [new AccCommDto()];
          this.salesOfficeSelection = [new AccCommDto()];
          this.salesGroupSelection = [new AccCommDto()];
          this.placeOfSupplySelection = [new AccCommDto()];
          this.jurisdictionChannelSelection = [new AccCommDto()];
          this.PaymentTermsSelection = [new AccCommDto()];
          this.InterCoPurchaseAcc = [new AccCommDto()];
          this.InterCoSalesAcc = [new AccCommDto()];
          this.InterCoExpenses = [new AccCommDto()];
          this.CompanyExpense = [new AccCommDto()];
          this.supplierAndCustGrouping = [new AccCommDto()];
          this.supplierAndCustCategory = [new AccCommDto()];

        }
      });
    }
  }


  //=================SAVE===============================

  async saveaccountmaster() {


    const arrays = [
      { name: 'costCenterSelection', data: this.costCenterSelection },
      { name: 'profitCenterSelection', data: this.profitCenterSelection },
      { name: 'salesmanSelection', data: this.salesmanSelection },
      { name: 'departmentSelection', data: this.departmentSelection },
      { name: 'divisionSelection', data: this.divisionSelection },
      { name: 'jobSelection', data: this.jobSelection },
      { name: 'otherCenterSelection', data: this.otherCenterSelection },
      { name: 'salesOrganizationSelection', data: this.salesOrganizationSelection },
      { name: 'distributionChannelSelection', data: this.distributionChannelSelection },
      { name: 'salesOfficeSelection', data: this.salesOfficeSelection },
      { name: 'salesGroupSelection', data: this.salesGroupSelection },
      { name: 'placeOfSupplySelection', data: this.placeOfSupplySelection },
      { name: 'jurisdictionChannelSelection', data: this.jurisdictionChannelSelection },
      { name: 'PaymentTermsSelection', data: this.PaymentTermsSelection },
      { name: 'TaxSelection', data: this.TaxSelection },
      { name: 'InterCoPurchaseAcc', data: this.InterCoPurchaseAcc },
      { name: 'InterCoSalesAcc', data: this.InterCoSalesAcc },
      { name: 'InterCoExpenses', data: this.InterCoExpenses },
      { name: 'supplierAndCustCategory', data: this.supplierAndCustCategory },
      { name: 'supplierAndCustGrouping', data: this.supplierAndCustGrouping }
    ];

    // Log each array's content
    arrays.forEach(arr => {
      console.log(`${arr.name}:`, arr.data);
      if (arr.data && arr.data.length > 0) {
        console.log(`  - Length: ${arr.data.length}`);
        console.log(`  - First item:`, arr.data[0]);
      }
    });

    // Combine all selection arrays
    const combined = [
      ...this.costCenterSelection,
      ...this.profitCenterSelection,
      ...this.salesmanSelection,
      ...this.departmentSelection,
      ...this.divisionSelection,
      ...this.jobSelection,
      ...this.otherCenterSelection,
      ...this.salesOrganizationSelection,
      ...this.distributionChannelSelection,
      ...this.salesOfficeSelection,
      ...this.salesGroupSelection,
      ...this.placeOfSupplySelection,
      ...this.jurisdictionChannelSelection,
      ...this.PaymentTermsSelection,
      ...this.TaxSelection,
      ...this.InterCoPurchaseAcc,
      ...this.InterCoSalesAcc,
      ...this.InterCoExpenses,
      ...this.supplierAndCustCategory,
      ...this.supplierAndCustGrouping
    ];

    console.log('Combined array length:', combined.length);
    console.log('Combined array:', combined);

    // Enhanced filtering with better validation
    const filteredCombined = combined.filter(item => {
      if (!item) {
        console.log('Filtered out: null/undefined item');
        return false;
      }

      const code = (item.DcAccOne_AccComm_Code || '').toString().trim();
      const grid = (item.DcAccOne_Grid_Number || '').toString().trim();
      const name = (item.DcAccOne_AccComm_Name || '').toString().trim();
      const sysId = item.DcAccOne_AccComm_SysID;


      // More lenient validation - keep if any meaningful data exists
      const hasCode = code && code !== '0' && code !== '';
      const hasName = name && name !== '';
      const hasGrid = grid && grid !== '0' && grid !== '';
      const hasSysId = sysId && sysId > 0;

      const isValid = hasCode || hasName || hasSysId || hasGrid;

      if (!isValid) {
        console.log('Filtered out item:', { code, grid, name, sysId });
      }

      return isValid;
    });



    // Remove duplicates (by code + grid)
    const seen = new Set();
    const uniqueCombined = filteredCombined.filter(item => {
      const code = (item.DcAccOne_AccComm_Code || '').toString().trim();
      const grid = (item.DcAccOne_Grid_Number || '').toString().trim();
      const key = `${code}_${grid}`;

      if (seen.has(key) && key !== '_') { // Allow empty keys (new items)
        console.log('Filtered out duplicate:', key);
        return false;
      }
      seen.add(key);
      return true;
    });

    console.log('Unique combined length:', uniqueCombined.length);
    console.log('Unique combined:', uniqueCombined);

    // Debug: Let's see what's in the unique combined items
    console.log('Checking SysID values:');
    uniqueCombined.forEach((item, index) => {
      console.log(`Item ${index}:`, {
        code: item.DcAccOne_AccComm_Code,
        name: item.DcAccOne_AccComm_Name,
        sysId: item.DcAccOne_AccComm_SysID,
        gridNumber: item.DcAccOne_Grid_Number,
        hasSysId: !!item.DcAccOne_AccComm_SysID
      });
    });

    // For UPDATE operations, include existing items with SysID
    // For CREATE operations, only include new items
    let finalData;
    if (this.TblHAccGroupDto.HAccGroup_SysID) {
      // Update mode - include all valid items
      finalData = uniqueCombined;
      console.log('UPDATE MODE: Including all items');
    } else {
      // Create mode - include items that have actual data (code, name, or grid number)
      // Don't filter by SysID since new items won't have it
      finalData = uniqueCombined.filter(item => {
        const hasCode = item.DcAccOne_AccComm_Code && item.DcAccOne_AccComm_Code.toString().trim() !== '';
        const hasName = item.DcAccOne_AccComm_Name && item.DcAccOne_AccComm_Name.toString().trim() !== '';
        const hasGrid = item.DcAccOne_Grid_Number && item.DcAccOne_Grid_Number.toString().trim() !== '' && item.DcAccOne_Grid_Number.toString().trim() !== '0';

        const isValid = hasCode || hasName || hasGrid;
        console.log(`Item validation:`, { hasCode, hasName, hasGrid, isValid, item });
        return isValid;
      });
    }

    console.log('Final data length:', finalData.length);
    console.log('Final data:', finalData);

    // Set the final data
    this.TblHAccGroupDto.TblHAccCom = finalData;

    console.log('TblHAccGroupDto before save:', this.TblHAccGroupDto);

    // If still empty, check if user actually selected any data
    if (finalData.length === 0) {
      console.warn('No valid data to save in TblHAccCom');
      // You might want to show a warning to user or allow saving with empty array
      // this._messageService.add({ 
      //   severity: 'warn', 
      //   summary: 'Warning', 
      //   detail: 'No additional details selected' 
      // });
    }

    // Save the full object
    try {
      const res = await this._masterService.saveMasterData(apiUrl.accountGroupMaster, this.TblHAccGroupDto);

      if (res) {

        if (res.success == false) {
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message || 'Data Save Failed'
          });
        } else {

          this._messageService.add({
            severity: 'success',
            summary: 'Data Saved',
            detail: 'Data Saved Successfully'
          });

          // Refresh account master data
          this._salesService.getMasterData(apiUrl.accountMaster).then((res) => {
            this.accountMaster = res;
          });

          // Clear form and navigate
          this.resetForm();
          this.router.navigate(['/l-master/account-master']);

        }
      }

    } catch (err) {
      console.error('Save error:', err);
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err.message || 'Save failed'
      });
    }
  }

  private resetForm(): void {
    this.TblHAccGroupDto = new TblHAccGroupDto();
    this.TblHAccGroupDto.TblHAccOne = [new TblHAccOneDto()];
    this.TblHAccGroupDto.TblmDocAttach = [new TblmDocAttach()];

    // Reset selection arrays to default state
    this.TaxSelection = [new AccCommDto()];
    this.costCenterSelection = [new AccCommDto()];
    this.profitCenterSelection = [new AccCommDto()];
    this.salesmanSelection = [new AccCommDto()];
    this.divisionSelection = [new AccCommDto()];
    this.departmentSelection = [new AccCommDto()];
    this.jobSelection = [new AccCommDto()];
    this.otherCenterSelection = [new AccCommDto()];
    this.salesOrganizationSelection = [new AccCommDto()];
    this.distributionChannelSelection = [new AccCommDto()];
    this.salesOfficeSelection = [new AccCommDto()];
    this.salesGroupSelection = [new AccCommDto()];
    this.placeOfSupplySelection = [new AccCommDto()];
    this.jurisdictionChannelSelection = [new AccCommDto()];
    this.PaymentTermsSelection = [new AccCommDto()];
    this.InterCoPurchaseAcc = [new AccCommDto()];
    this.InterCoSalesAcc = [new AccCommDto()];
    this.InterCoExpenses = [new AccCommDto()];
    this.CompanyExpense = [new AccCommDto()];
    this.supplierAndCustCategory = [new AccCommDto()];
    this.supplierAndCustGrouping = [new AccCommDto()];
  }

  //***********************************************DELETE*******************************************
  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.accountGroupMaster, this.TblHAccGroupDto.HAccGroup_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Refresh()
            this.router.navigate(['/l-master/account-master'])
            this.TblHAccGroupDto.TblmDocAttach = [new TblmDocAttach()]

          }


        }, err => {
          if (err.error.statusCode == 409) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        });
      }

    });
  }

  Refresh() {
    this.TblHAccGroupDto = new TblHAccGroupDto()
    // this.TblHAccGroupDto.TblmDocAttachDto = []

  }

  //===============================LIST=========================================
  displayaccountlist() {
    this.getListData()
  }

  getListData() {
    this.listData = []
    this._masterService.getMasterData(apiUrl.accountGroupMaster).then((res) => {
      this.listData = res
      this.showAccountMasterList = true
      this.filterTable()
      // this.TblHAccGroupDto.TblHAccOne = [new TblHAccOneDto()]

      // this.TblHAccGroupDto.TblHAccOne[0].TbldAccOneCo.push(new TbldAccOneCodtoapplicable());

      this.TblHAccGroupDto.TblHAccCom = [new AccCommDto()]

    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HAccOne_Code || item.HAccOne_Name || item.HAccOne_SysID;
      const matchesQuery =
        (item.HAccOne_Code || '').toLowerCase().includes(query) ||
        (item.HAccOne_Name || '').toLowerCase().includes(query) ||
        item.HAccOne_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showAccountMasterList = false
    this.router.navigate(['l-master/account-master']);
  }

  editRow(rowData: any) {
    this.router.navigate(['l-master/account-master/' + rowData.HAccOne_SysID]);
  }



  funcSearch() {
    this.getdata()
  }
  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.accountGroupMaster, rowData.HAccOne_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showAccountMasterList = true

            this.getListData()
          }

        });
      }
    });
  }

  add() {
    this.TblHAccGroupDto = new TblHAccGroupDto()
    this.router.navigate(['l-master/account-master']);

  }
}
