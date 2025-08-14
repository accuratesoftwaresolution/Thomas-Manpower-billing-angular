import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccCommDto } from 'src/app/_dto/masters/tblAccComm.dto';
import { TbldProdMasterCo } from 'src/app/_dto/masters/TbldProdMasterCo.dto';
import { TblDProdUnit } from 'src/app/_dto/masters/TblDProdUnit.dto';
import { TblHProdGroup } from 'src/app/_dto/masters/TblHProdGroup.dto';
import { TblHProdMasterDto } from 'src/app/_dto/masters/TblHProdMaster.dto';
import { TblHProdUnit } from 'src/app/_dto/masters/TblHProdUnit.dto';
import { ProdComm } from 'src/app/_dto/ProdComm.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {

  TblHProdGroup: TblHProdGroup = new TblHProdGroup()

  listData = []

  filteredfilteredlistData = [...this.listData];

  searchText: string = '';

  showProductMasterList: boolean = false

  activeState: boolean[] = [false, false, false];

  activeIndex: number = 0;

  display: boolean = false;

  showCompany: boolean = false;

  showAmendment: boolean = false;

  tableIndex: any;

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
    { title: "Product Group Details", content: "" },
    { title: "Company Wise Details", content: "" },
    { title: "Document Attachment", content: "" },

  ];


  accountMaster: any;

  menuCode: any;

  singleCoMaster: any;

  activateAndDeactivate: any;

  unitmaster: any;

  ProductModule: any;

  productGroup: any;


  // --------------------costing dropdown-----------------

  dummyCostingData = [
    { name: 'Weighted Average', code: '1001', sysid: 101 },
    { name: 'FIFO', code: '1002', sysid: 102 },
    { name: 'LIFO', code: '1003', sysid: 103 },
    { name: 'Average Costing', code: '1004', sysid: 104 }
  ];

  costingMethodOptions = this.dummyCostingData.map(item => ({
    label: `${item.code} - ${item.name}`,
    value: item
  }));

  selectedCostingMethod: any = null;


  // -----------------------Product Dropdown---------------

  dummyProductionData = [
    { name: 'Finished Goods', code: '1001', sysid: 100 },
    { name: 'Service Product', code: '1002', sysid: 101 }
  ];

  ProductionMethodOptions = this.dummyProductionData.map(item => ({
    label: `${item.code} - ${item.name}`,
    value: item
  }));

  selectedProductionMethod: any = null;

  //-----------------------BOM Product Options------------


  dummybomProductOptions = [
    { name: 'BOM Finished Goods', code: '1001', sysid: 201 },
    { name: 'BOM Raw Materials', code: '1002', sysid: 202 },
    { name: 'BOM Scrap', code: '1003', sysid: 203 },
    { name: 'Packing Material', code: '1004', sysid: 204 },
    { name: 'Service Materials', code: '1005', sysid: 205 },
    { name: 'Finished Materials', code: '1006', sysid: 206 }
  ];

  BOMProductionMethodOptions = this.dummybomProductOptions.map(item => ({
    label: `${item.code} - ${item.name}`,
    value: item
  }));

  selectedBOMProductionMethod: any = null;

  //--------------Production classifications Dropdown----------

  dummyproductClassification = [
    { name: 'Import', code: '1001', sysid: 301 },
    { name: 'Local Purchase', code: '1002', sysid: 302 }
  ];

  classificationOptions = this.dummyproductClassification.map(item => ({
    label: `${item.code} - ${item.name}`,
    value: item
  }));

  selectedclassification: any = null;

  //----------Product Grade wise options dropdown---------------

  dummyproductGradeValueWiseOptions = [
    { name: 'High Value', code: '1001', sysid: 401 },
    { name: 'Medium Value', code: '1002', sysid: 402 },
    { name: 'Low Value', code: '1003', sysid: 403 },
    { name: 'One-Time Stock', code: '1004', sysid: 404 }
  ];

  productGradeValueOptions = this.dummyproductGradeValueWiseOptions.map(item => ({
    label: `${item.code} - ${item.name}`,
    value: item
  }));

  selectedproductGradeValue: any = null;

  //----------------Product Category Options---------------------

  dummyproductCategoryOptions = [
    { name: 'Category A', code: '1001', sysid: 501 },
    { name: 'Category B', code: '1002', sysid: 502 },
    { name: 'Category C', code: '1003', sysid: 503 },
    { name: 'Category D', code: '1004', sysid: 504 }
  ];
  productCategroyOptions = this.dummyproductCategoryOptions.map(item => ({
    label: `${item.code} - ${item.name}`,
    value: item
  }));

  selectedproductCategory: any = null;
  showDeleteButton: boolean = false
  HProd_SysID: number;
  isLoading: boolean;

  //


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
    this.TblHProdGroup.TblHProdMaster = [new TblHProdMasterDto()]
    this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit.push(new TblHProdUnit());
    this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit.push(new TblDProdUnit());
    this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust.push(new ProdComm());
    this.TblHProdGroup.TblHProdMaster[0].applicableCustomers.push(new ProdComm());
    this.TblHProdGroup.TblHProdMaster[0].applicableCo.push(new TbldProdMasterCo());

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HProd_SysID = Number(id);
        this.TblHProdGroup.TblHProdMaster[0].HProd_SysID = Number(id);
        this.getdata()
      }
    });


    this.getLovData()

  }

  // Data Fetching //

  getdata() {
    if (this.TblHProdGroup.TblHProdMaster[0].HProd_SysID || this.HProd_SysID) {
      this._masterService.getMasterDatabyId(apiUrl.productmaster, this.TblHProdGroup.TblHProdMaster[0].HProd_SysID).then((res) => {


        this.TblHProdGroup = res
        this.showDeleteButton = true;

        this.selectedCostingMethod = this.dummyCostingData.find(opt => opt.code === this.TblHProdGroup.TblHProdMaster[0].HProd_CostMeth_Code);
        this.selectedProductionMethod = this.dummyProductionData.find(opt => opt.code === this.TblHProdGroup.TblHProdMaster[0].HProd_Type_Code);
        this.selectedBOMProductionMethod = this.dummybomProductOptions.find(opt => opt.code === this.TblHProdGroup.TblHProdMaster[0].HProd_BOMModu_Code);
        this.selectedclassification = this.dummyproductClassification.find(opt => opt.code === this.TblHProdGroup.TblHProdMaster[0].HProd_SuplClass_Code);
        this.selectedproductGradeValue = this.dummyproductGradeValueWiseOptions.find(opt => opt.code === this.TblHProdGroup.TblHProdMaster[0].HProd_ValueWise_Code);
        this.selectedproductCategory = this.dummyproductCategoryOptions.find(opt => opt.code === this.TblHProdGroup.TblHProdMaster[0].HProd_ProdCate_Code);
        if (this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit.length === 0) {
          this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit.push(new TblHProdUnit());
        }

        if (this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit.length === 0) {
          this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit.push(new TblDProdUnit());
        }

        if (this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust.length === 0) {
          this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust.push(new ProdComm());
        }

        if (this.TblHProdGroup.TblHProdMaster[0].applicableCustomers.length === 0) {
          this.TblHProdGroup.TblHProdMaster[0].applicableCustomers.push(new ProdComm());
        }

        if (this.TblHProdGroup.TblHProdMaster[0].applicableCo.length === 0) {
          this.TblHProdGroup.TblHProdMaster[0].applicableCo.push(new TbldProdMasterCo());
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHProdGroup = new TblHProdGroup()
          this.TblHProdGroup.TblHProdMaster = [new TblHProdMasterDto()]
          this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit.push(new TblHProdUnit());
          this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit.push(new TblDProdUnit());
          this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust.push(new ProdComm());
          this.TblHProdGroup.TblHProdMaster[0].applicableCustomers.push(new ProdComm());
          this.TblHProdGroup.TblHProdMaster[0].applicableCo.push(new TbldProdMasterCo());
        }
      })
    }
  }

  getLovData() {

    this._salesService.getMasterData(apiUrl.unitmaster).then((res) => {
      this.unitmaster = res
    })
    this._salesService.getMasterData(apiUrl.ProductModule).then((res) => {
      this.ProductModule = res
    })
    this._salesService.getMasterData(apiUrl.productGroup).then((res) => {
      this.productGroup = res
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


  }

  getListData() {
    this._masterService.getMasterData(apiUrl.productmaster).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  // Data Fetching Ends //

  // Popup and Its Functions //

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ProductModuleCode':
        this.popUpService.popUpData = this.ProductModule;
        break;
      case 'ProductGroupCode':
        this.popUpService.popUpData = this.productGroup;
        break;

      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activateAndDeactivate;
        break;
      case 'MenuCode':
        this.popUpService.popUpData = this.menuCode;
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

      case 'ProductUnit':
        this.popUpService.popUpData = this.unitmaster;
        break;
      case 'ProductUnit2':
        this.popUpService.popUpData = this.unitmaster;
        break;

      case 'CustomerCode':
        this.popUpService.popUpData = this.accountMaster;
        break;
      case 'SupplierCode':
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


      case 'InventoryAccCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_InvAcc_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_InvAcc_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_InvAcc_Name = event.HAccOne_Name
        break;
      case 'CostOfSalesAccCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_CogsAcc_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_CogsAcc_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_CogsAcc_Name = event.HAccOne_Name
        break;
      case 'SalesAccCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_SalAcc_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_SalAcc_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_SalAcc_Name = event.HAccOne_Name
        break;
      case 'PurcahseAccCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_PurAcc_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_PurAcc_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_PurAcc_Name = event.HAccOne_Name
        break;
      case 'VatInputAccCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_TaxInPut_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_TaxInPut_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_TaxInPut_Name = event.HAccOne_Name
        break;
      case 'VatOutputAccCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_TaxOutPut_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_TaxOutPut_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_TaxOutPut_Name = event.HAccOne_Name
        break;
      case 'VatAdvAccCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_TaxAdvPut_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_TaxAdvPut_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_TaxAdvPut_Name = event.HAccOne_Name
        break;
      case 'OtherTaxInputAccCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_OtaxInPut_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_OtaxInPut_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_OtaxInPut_Name = event.HAccOne_Name
        break;
      case 'OtherTaxOutputAccCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_OtaxOutPut_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_OtaxOutPut_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_OtaxOutPut_Name = event.HAccOne_Name
        break;

      case 'ApplicableCompanyCode':
        this.TblHProdGroup.TblHProdMaster[0].applicableCo[0].DcProd_SingleCo_SysID = event.SingleCo_SysID
        this.TblHProdGroup.TblHProdMaster[0].applicableCo[0].DcProd_SingleCo_Code = event.SingleCo_Code
        this.TblHProdGroup.TblHProdMaster[0].applicableCo[0].DcProd_SingleCo_Name = event.SingleCo_Name
        break;

      case 'ProductGroupCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_Group_SysID = event.HProdGroup_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_Group_Code = event.HProdGroup_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_Group_Name = event.HProdGroup_Short_Name
        break;
      case 'ProductModuleCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_Module_SysID = event.HProdModule_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_Module_Code = event.HProdModule_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_Module_Name = event.HProdModule_Name
        break;
      case 'ActAndDeactCode':
        this.TblHProdGroup.TblHProdMaster[0].HProd_AcDe_SysID = event.HActDeactive_SysID
        this.TblHProdGroup.TblHProdMaster[0].HProd_AcDe_Code = event.HActDeactive_Code
        this.TblHProdGroup.TblHProdMaster[0].HProd_AcDe_Name = event.HActDeactive_Name
        break;

      case 'ProductUnit':
        this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit[this.tableIndex].HProd_Unit_SysID = event.HFirstUnit_SysID
        this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit[this.tableIndex].HProd_Base_Unit = event.HFirstUnit_Base_Unit
        this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit[this.tableIndex].HProd_Unit_Frac = event.HFirstUnit_Unit_Frac
        break;
      case 'ProductUnit2':
        this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit[this.tableIndex].DProd_Unit_SysID = event.HFirstUnit_SysID
        this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit[this.tableIndex].DProd_Base_Unit = event.HFirstUnit_Base_Unit
        this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit[this.tableIndex].DProd_Unit_Frac = event.HFirstUnit_Unit_Frac
        break;

      case 'CustomerCode':
        this.TblHProdGroup.TblHProdMaster[0].applicableCustomers[this.tableIndex].HProd_CommTbl_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].applicableCustomers[this.tableIndex].HProd_CommTbl_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].applicableCustomers[this.tableIndex].HProd_CommTbl_Name = event.HAccOne_Name
        break;
      case 'SupplierCode':
        this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust[this.tableIndex].HProd_CommTbl_SysID = event.HAccOne_SysID
        this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust[this.tableIndex].HProd_CommTbl_Code = event.HAccOne_Code
        this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust[this.tableIndex].HProd_CommTbl_Name = event.HAccOne_Name
        break;
      default:
        break;
    }

  }

  // Ends //

  onCostingMethodChange(selected: any) {
    if (selected) {
      this.TblHProdGroup.TblHProdMaster[0].HProd_CostMeth_SysID = selected.sysid;
      this.TblHProdGroup.TblHProdMaster[0].HProd_CostMeth_Code = selected.code;
      this.TblHProdGroup.TblHProdMaster[0].HProd_CostMeth_Name = selected.name;
    }
  }

  onProductionMethodChange(selected: any) {
    if (selected) {
      this.TblHProdGroup.TblHProdMaster[0].HProd_Type_SysID = selected.sysid;
      this.TblHProdGroup.TblHProdMaster[0].HProd_Type_Code = selected.code;
      this.TblHProdGroup.TblHProdMaster[0].HProd_Type_Name = selected.name;
    }
  }

  onBOMProductionMethodChange(selected: any) {
    if (selected) {
      this.TblHProdGroup.TblHProdMaster[0].HProd_BOMModu_SysID = selected.sysid;
      this.TblHProdGroup.TblHProdMaster[0].HProd_BOMModu_Code = selected.code;
      this.TblHProdGroup.TblHProdMaster[0].HProd_BOMModu_Name = selected.name;
    }
  }

  onClassificationMethodChange(selected: any) {
    if (selected) {
      this.TblHProdGroup.TblHProdMaster[0].HProd_SuplClass_SysID = selected.sysid;
      this.TblHProdGroup.TblHProdMaster[0].HProd_SuplClass_Code = selected.code;
      this.TblHProdGroup.TblHProdMaster[0].HProd_SuplClass_Name = selected.name;
    }
  }

  onproductGradeValueMethodChange(selected: any) {
    if (selected) {
      this.TblHProdGroup.TblHProdMaster[0].HProd_ValueWise_SysID = selected.sysid;
      this.TblHProdGroup.TblHProdMaster[0].HProd_ValueWise_Code = selected.code;
      this.TblHProdGroup.TblHProdMaster[0].HProd_ValueWise_Name = selected.name;
    }
  }

  onproductCategoryMethodChange(selected: any) {
    if (selected) {
      this.TblHProdGroup.TblHProdMaster[0].HProd_ProdCate_SysID = selected.sysid;
      this.TblHProdGroup.TblHProdMaster[0].HProd_ProdCate_Code = selected.code;
      this.TblHProdGroup.TblHProdMaster[0].HProd_ProdCate_Name = selected.name;
    }
  }

  //

  deleteRow(table: any, index: number, rowData) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',


      accept: () => {

        if (table === 'TblHProdUnit') {

          this._masterService.deleteData(apiUrl.productmaster, `hprodunit?where[HProd_SysID]=${rowData.HProd_SysID}&where[HProd_Unit_SysID]=${rowData.HProd_Unit_SysID}`).then((res) => {
            if (res.success == false) {
              this.isLoading = false
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            } else {
              this.isLoading = false
              this._messageService.add({ severity: 'success', summary: 'Row Deleted', detail: res.message });
              this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit.splice(index, 1);
              if (this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit.length === 0) {
                this.addRow('TblHProdUnit', -1);
              }
            }
          }, err => {
            if (err.error.statusCode == 409) {
              this.isLoading = false
              this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            }
          });

        }
        if (table === 'TblDProdUnit') {

          this._masterService.deleteData(apiUrl.productmaster, `dprodunit?where[DProd_SysID]=${rowData.DProd_SysID}&where[DProd_Unit_SysID]=${rowData.DProd_Unit_SysID}`).then((res) => {
            if (res.success == false) {
              this.isLoading = false
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            } else {
              this.isLoading = false
              this._messageService.add({ severity: 'success', summary: 'Row Deleted', detail: res.message });
              this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit.splice(index, 1);
              if (this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit.length === 0) {
                this.addRow('TblDProdUnit', -1);
              }
            }
          }, err => {
            if (err.error.statusCode == 409) {
              this.isLoading = false
              this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            }
          });
        }
        if (table === 'applicableSupplierAndCust') {


          this._masterService.deleteData(apiUrl.productmaster, `prodcomm?where[HProd_SysID]=${rowData.HProd_SysID}&where[HProd_CommTbl_SysID]=${rowData.HProd_CommTbl_SysID}`).then((res) => {
            if (res.success == false) {
              this.isLoading = false
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            } else {
              this.isLoading = false
              this._messageService.add({ severity: 'success', summary: 'Row Deleted', detail: res.message });
              this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust.splice(index, 1);
              if (this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust.length === 0) {
                this.addRow('applicableSupplierAndCust', -1);
              }
            }
          }, err => {
            if (err.error.statusCode == 409) {
              this.isLoading = false
              this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            }
          });
        }
        if (table === 'applicableCustomers') {

          this._masterService.deleteData(apiUrl.productmaster, `acccomm?where[HProd_SysID]=${rowData.HProd_SysID}&where[HProd_CommTbl_SysID]=${rowData.HProd_CommTbl_SysID}`).then((res) => {
            if (res.success == false) {
              this.isLoading = false
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            } else {
              this.isLoading = false
              this._messageService.add({ severity: 'success', summary: 'Row Deleted', detail: res.message });
              this.TblHProdGroup.TblHProdMaster[0].applicableCustomers.splice(index, 1);
              if (this.TblHProdGroup.TblHProdMaster[0].applicableCustomers.length === 0) {
                this.addRow('applicableCustomers', -1);
              }
            }
          }, err => {
            if (err.error.statusCode == 409) {
              this.isLoading = false
              this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            }
          });

        }
        if (table === 'applicableCo') {

          this._masterService.deleteData(apiUrl.productmaster, `company?where[DcProd_SysID]=${rowData.DcProd_SysID}&where[DcProd_SingleCo_SysID]=${rowData.DcProd_SingleCo_SysID}`).then((res) => {
            if (res.success == false) {
              this.isLoading = false
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
            } else {
              this.isLoading = false
              this._messageService.add({ severity: 'success', summary: 'Row Deleted', detail: res.message });
              this.TblHProdGroup.TblHProdMaster[0].applicableCo.splice(index, 1);
              if (this.TblHProdGroup.TblHProdMaster[0].applicableCo.length === 0) {
                this.addRow('applicableCo', -1);
              }
            }
          }, err => {
            if (err.error.statusCode == 409) {
              this.isLoading = false
              this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            }
          });
        }

      }
    });

  }

  addRow(table: any, index: number) {

    if (table == 'TblHProdUnit') {
      const newRow = new TblHProdUnit()
      this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit.splice(index + 1, 0, newRow);
    }

    if (table == 'TblDProdUnit') {
      const newRow = new TblDProdUnit()
      this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit.splice(index + 1, 0, newRow);
    }

    if (table == 'applicableSupplierAndCust') {
      const newRow = new ProdComm()
      this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust.splice(index + 1, 0, newRow);
    }

    if (table == 'applicableCustomers') {
      const newRow = new ProdComm()
      this.TblHProdGroup.TblHProdMaster[0].applicableCustomers.splice(index + 1, 0, newRow);
    }

    if (table == 'applicableCo') {
      const newRow = new TbldProdMasterCo()
      this.TblHProdGroup.TblHProdMaster[0].applicableCo.splice(index + 1, 0, newRow);
    }


  }

  //

  ConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      }
    });
  }

  changeIndex(i) {
    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i
  }

  // Data Save and Delete //

  async saveproductmaster() {

    // if (!(await this.preSave())) {
    //   return;
    // }

    // else {


    this._masterService.saveMasterData(apiUrl.productmaster, this.TblHProdGroup).then((res) => {

      if (res.success == false) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.Refresh()
        this.router.navigate(['/l-master/product-master'])

      }

    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })

    // }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.productmaster, this.TblHProdGroup.TblHProdMaster[0].HProd_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Refresh()
            this.router.navigate(['/l-master/product-master'])
          }
        }, err => {
          if (err.error.statusCode == 409) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        });
      }
    });
  }

  // Ends //

  // Data Listing //

  displayProductList() {
    this.showProductMasterList = true
    this.getListData()
  }

  AddNew(){
    this.router.navigate(['/l-master/product-master'])
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HProd_Code || item.HProd_Short_Name || item.HProd_Long_Name || item.HProd_SysID;
      const matchesQuery =
        (item.HProd_Code || '').toLowerCase().includes(query) ||
        (item.HProd_Short_Name || '').toLowerCase().includes(query) ||
        (item.HProd_Long_Name || '').toLowerCase().includes(query) ||
        item.HProd_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showProductMasterList = false
    this.router.navigate(['l-master/product-master']);
  }

  routeTo(screen) {
    this.router.navigate([screen]);
  }

  editRow(data) {
    this.showProductMasterList = true
    this.router.navigate(['l-master/product-master/' + data.HProd_SysID]);
  }

  Refresh() {
    this.TblHProdGroup = new TblHProdGroup()
    this.TblHProdGroup.TblHProdMaster = [new TblHProdMasterDto()]
    this.TblHProdGroup.TblHProdMaster[0].TblHProdUnit.push(new TblHProdUnit());
    this.TblHProdGroup.TblHProdMaster[0].TblDProdUnit.push(new TblDProdUnit());
    this.TblHProdGroup.TblHProdMaster[0].applicableSupplierAndCust.push(new ProdComm());
    this.TblHProdGroup.TblHProdMaster[0].applicableCustomers.push(new ProdComm());
    this.TblHProdGroup.TblHProdMaster[0].applicableCo.push(new TbldProdMasterCo());
  }

}

