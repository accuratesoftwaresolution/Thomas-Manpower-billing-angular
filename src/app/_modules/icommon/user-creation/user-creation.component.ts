import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { TblApplicableCoDto } from 'src/app/_dto/masters/tblapplicableco.dto';
import { UserCreationDto } from 'src/app/_dto/usercreation.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { TbldUserHeadCoDto } from 'src/app/_dto/TbldUserHeadCo.dto';
import { TblDResAccDto } from 'src/app/_dto/user-creation/TblDResAccDto.dto';
import { TblDCostCentDto } from 'src/app/_dto/user-creation/TblDCostCentDto.dto';
import { TblDProfCentDto } from 'src/app/_dto/user-creation/TblDProfCentDto.dto';
import { TblDdivsionDto } from 'src/app/_dto/user-creation/TblDdivsionDto.dto';
import { TblDdepartDto } from 'src/app/_dto/user-creation/TblDdepartDto.dto';
import { TblDOtherCentDto } from 'src/app/_dto/user-creation/TblDOtherCentDto.dto';
import { TblDSalesOrgDto } from 'src/app/_dto/user-creation/TblDSalesOrgDto.dto';
import { TblDdisChanelDto } from 'src/app/_dto/user-creation/TblDdisChanelDto.dto';
import { TblDSalesOfficeDto } from 'src/app/_dto/user-creation/TblDSalesOfficeDto.dto';
import { TblDSalesGroupDto } from 'src/app/_dto/user-creation/TblDSalesGroupDto.dto';
import { TblDJobDto } from 'src/app/_dto/user-creation/TblDJobDto.dto';
import { TblDLoginRetsriDto } from 'src/app/_dto/user-creation/TblDLoginRetsriDto.dto';
import { TblDRetsriDto } from 'src/app/_dto/user-creation/TblDRetsriDto.dto';
import { TblDLoginRightDto } from 'src/app/_dto/user-creation/TblDLoginRightDto.dto';
import { TblDVouType } from 'src/app/_dto/TblDVouType.dto';
import { MasterService } from 'src/app/_providers/master.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { ActivatedRoute, Router } from '@angular/router';
apiUrl
@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss'],

})
export class UserCreationComponent implements OnInit {

  userData: UserCreationDto = new UserCreationDto();


  tableIndex: any;
  activeState: boolean[] = [false, false, false];
  activeIndex: number = 0;
  display: boolean = false

  showuserCreationList: boolean = false
  listData = []

  filteredfilteredlistData = [...this.listData];

  searchText: string = '';




  /////////////////////////////////////////////////////////////////////////////////////////

  scrollableTabs: any[] = [
    { title: "User Creation ", content: "" },
    { title: "Restrict", content: "Content for Other Expenses" },
    { title: "Restrict Details", content: "Content for Other Expenses" },
    { title: "Accesss ", content: "Content for Other Expenses" },
  ];

  groupUserTree: TreeNode[] = [
    {
      label: 'Sales',
      children: [
        {
          label: 'SLMG',
          children: [
            { label: 'deptapproval', icon: 'pi pi-user' },
            { label: 'Ronald', icon: 'pi pi-user' },
            { label: 'Kiran', icon: 'pi pi-user' },
            { label: 'Karuna', icon: 'pi pi-user' },
            { label: 'Tanvir', icon: 'pi pi-user' },
            { label: 'Raznie', icon: 'pi pi-user' }
          ]
        },

      ]
    },
    {
      label: 'Purchase',

      children: [
        {
          label: 'STORES',
          children: [
            { label: 'Divesh', icon: 'pi pi-user' },
            { label: 'Denison1', icon: 'pi pi-user' },
            { label: 'Inder', icon: 'pi pi-user' },
            { label: 'Rakesh', icon: 'pi pi-user' },
            { label: 'Sudhakaran', icon: 'pi pi-user' },
            { label: 'Grace', icon: 'pi pi-user' },
            { label: '***denison', icon: 'pi pi-user' },
            { label: '***kgrewal', icon: 'pi pi-user' }
          ]
        }

      ]
    },
    {
      label: 'glenn', icon: 'pi pi-user'
    },
    {
      label: 'shyla', icon: 'pi pi-user'
    }
  ];



  selectedMenu: string;
  selectedNode: TreeNode;
  selectAllRights: boolean = false;
  TblDLoginRight: { [key: string]: TblDLoginRightDto } = {};

  menuTreeData: TreeNode[] = [
    {
      label: 'Transactions',
      children: [
        {
          label: 'Sales Module',
          children: [
            { label: 'Sales Enquiry' },
            { label: 'Sales Order' },
            { label: 'Inter Company Sales Order' },
            { label: 'Delivery Note' },
            { label: 'Sales Invoice' },
            { label: 'Sales Return' }
          ]
        },
        {
          label: 'Purchase Module',
          children: [
            { label: 'Purchase Requisition' },
            { label: 'Purchase Enquiry' },
            { label: 'Purchase Order' },
            { label: 'Inter Co Purchase Order' },
            { label: 'Material Receipt Voucher' }
          ]
        }
      ]
    }
  ];

  rightFields = [
    { label: 'Access', prop: 'DLogin_Access' },
    { label: 'Edit', prop: 'DLogin_Edit' },
    { label: 'Delete', prop: 'DLogin_Delete' },
    { label: 'Print', prop: 'DLogin_Print' },
    { label: 'Re Print Documents', prop: 'DLogin_Reprint' },
    { label: 'Edit Documents by Other Users', prop: 'DLogin_EditDoc_OtherUser' },
    { label: 'Edit Checked Documents', prop: 'DLogin_DocEdit_Checked' },
    { label: 'Edit Reconciled Documents', prop: 'DLogin_DocEdit_Recon' },
    { label: 'Edit Authorized by Higher Group', prop: 'DLogin_DocEdit_HighGroup' },
    { label: 'Exceed Credit Limit', prop: 'DLogin_CrLimit_Check' },
    { label: 'Exceed Transaction Limit', prop: 'DLogin_TransLimit_Check' },
    { label: 'Make Cash/Bank Negative', prop: 'DLogin_Cash_Check' },
    { label: 'Edit Pre-Printed', prop: 'DLogin_PrePrint' },
    { label: 'Access via API', prop: 'DLogin_API' },
    { label: 'Always Suspend on Save', prop: 'Dlogin_AlwSusp_Saving' },
    { label: 'Change Print Layout', prop: 'DLogin_PrintLayout_Change' },
    { label: 'Print Unauthorized', prop: 'DLogin_Print_UnAuth' },
    { label: 'Access Linked Report', prop: 'DLogin_Print_AcceLink' },
    { label: 'Make Cheque Void', prop: 'DLogin_CheqVoid' },
    { label: 'Close Link', prop: 'DLogin_CloseLink' },
    { label: 'Upload Data', prop: 'Dlogin_UploadData' },
    { label: 'Download Data', prop: 'Dlogin_DownLoadData' },
  ];
  activateAndDeactivate: any;
  singleCoMaster: any;
  showDeleteButton: boolean;
  HUser_SysID: number;

  constructor(
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    private _masterService: MasterService,
    private _messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    this.initializeEmptyArrays()

    this.getLovData()
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HUser_SysID = Number(id);
        this.userData.HUser_SysID = Number(id);
        this.getdata()
      }
    });
  }

  getdata() {
    if (this.userData.HUser_SysID || this.HUser_SysID) {
      this._masterService.getMasterDatabyId(apiUrl.userCreation, this.userData.HUser_SysID).then((res) => {
        this.userData = res
        this.showDeleteButton = true;

        this.initializeEmptyArrays()

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.initializeEmptyArrays()
        }
      })
    }
  }

  getLovData() {
    this._masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this._masterService.getMasterData(apiUrl.singleCoMaster).then((res) => {
      this.singleCoMaster = res
    })
  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activateAndDeactivate;
        break;
      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCoMaster;
        break;
      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  private initializeEmptyArrays() {
    if (!this.userData) {
      this.userData = new UserCreationDto()
    }

    if (!this.userData.TblDLoginRetsri) {
      this.userData.TblDLoginRetsri = new TblDLoginRetsriDto()
    }
    if (!this.userData.TblDRetstrict) {
      this.userData.TblDRetstrict = new TblDRetsriDto()
    }
    if (!this.userData.AccountSelection?.length) {
      this.userData.AccountSelection = [new TblDResAccDto()];
    }
    if (!this.userData.costCenterSelection?.length) {
      this.userData.costCenterSelection = [new TblDCostCentDto()];
    }
    if (!this.userData.profitCenterSelection?.length) {
      this.userData.profitCenterSelection = [new TblDProfCentDto()];
    }
    if (!this.userData.divisionSelection?.length) {
      this.userData.divisionSelection = [new TblDdivsionDto()];
    }
    if (!this.userData.departmentSelection?.length) {
      this.userData.departmentSelection = [new TblDdepartDto()];
    }
    if (!this.userData.jobSelection?.length) {
      this.userData.jobSelection = [new TblDJobDto()];
    }
    if (!this.userData.otherCenterSelection?.length) {
      this.userData.otherCenterSelection = [new TblDOtherCentDto()];
    }
    if (!this.userData.salesOrganizationSelection?.length) {
      this.userData.salesOrganizationSelection = [new TblDSalesOrgDto()];
    }
    if (!this.userData.distributionChannelSelection?.length) {
      this.userData.distributionChannelSelection = [new TblDdisChanelDto()];
    }
    if (!this.userData.salesOfficeSelection?.length) {
      this.userData.salesOfficeSelection = [new TblDSalesOfficeDto()];
    }
    if (!this.userData.salesGroupSelection?.length) {
      this.userData.salesGroupSelection = [new TblDSalesGroupDto()];
    }
    if (!this.userData.VoucherTypeRestriction?.length) {
      this.userData.VoucherTypeRestriction = [new TblDVouType()];
    }
    if (!this.userData.applicableCo?.length) {
      this.userData.applicableCo = [new TbldUserHeadCoDto()];
    }
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {

      case 'UsrRoleCode':
        this.userData.HUser_Role_Code = event.User_Code
        this.userData.HUser_Role_Name = event.User_Name
        break;
      case 'UsrLanguageCode':
        this.userData.HUser_Lang_Code = event.Language_Code
        this.userData.HUser_Lang_Name = event.Language_Name
        break;
      case 'UsrEmpCode':
        this.userData.HUser_Emp_Code = event.Employee_Code
        this.userData.HUser_Emp_Name = event.Employee_Name
        break;

      case 'ActAndDeactCode':
        this.userData.HUser_AcDe_SysID = event.HActDeactive_SysID
        this.userData.HUser_AcDe_Code = event.HActDeactive_Code
        this.userData.HUser_AcDe_Name = event.HActDeactive_Name
        break;
      case 'ApplicableCompanyCode':
        const selectedCode = event.SingleCo_Code
        const isExist = this.userData.applicableCo.some(item => item.DcUser_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for voucher-type Master' });
          return;
        }
        this.userData.applicableCo[this.tableIndex].DcUser_SingleCo_SysID = event.SingleCo_SysID
        this.userData.applicableCo[this.tableIndex].DcUser_SingleCo_Code = event.SingleCo_Code
        this.userData.applicableCo[this.tableIndex].DcUser_SingleCo_Name = event.SingleCo_Name
        break;


      case 'AccountCode':
        this.userData.AccountSelection[this.tableIndex].DResAcc_Code = event.accountCode
        this.userData.AccountSelection[this.tableIndex].DResAcc_Name = event.accountName
        break;
      case 'CostCenterCode':
        this.userData.costCenterSelection[this.tableIndex].DResCostCent_Code = event.costCentCode
        this.userData.costCenterSelection[this.tableIndex].DResCostCent_Name = event.costCentName
        break;
      case 'ProfitCenterCode':
        this.userData.profitCenterSelection[this.tableIndex].DProfCent_Code = event.profitCenterCode
        this.userData.profitCenterSelection[this.tableIndex].DProfCent_Name = event.profitCenterName
        break;
      case 'DivisionCode':
        this.userData.divisionSelection[this.tableIndex].Ddiv_Code = event.divisionCode
        this.userData.divisionSelection[this.tableIndex].Ddiv_Name = event.divisionName
        break;

      case 'DepartmentCode':
        this.userData.departmentSelection[this.tableIndex].Ddepart_Code = event.deptCode
        this.userData.departmentSelection[this.tableIndex].Ddepart_Name = event.deptName
        break;
      case 'JobCode':
        this.userData.jobSelection[this.tableIndex].DJob_Code = event.jobCode
        this.userData.jobSelection[this.tableIndex].DJob_Name = event.jobName
        break;
      case 'OtherCentreCode':
        this.userData.otherCenterSelection[this.tableIndex].DOtherCent_Code = event.otherCentreCode
        this.userData.otherCenterSelection[this.tableIndex].DOtherCent_Name = event.otherCentreName
        break;
      case 'SalesOrganizationCode':
        this.userData.salesOrganizationSelection[this.tableIndex].DSalesOrg_Code = event.salesOrganizationCode
        this.userData.salesOrganizationSelection[this.tableIndex].DSalesOrg_Name = event.salesOrganizationName
        break;

      case 'DistributionChannelCode':
        this.userData.distributionChannelSelection[this.tableIndex].DdisChanel_Code = event.distChanelCode
        this.userData.distributionChannelSelection[this.tableIndex].DdisChanel_Name = event.distChanelName
        break;
      case 'SalesOfficeCode':
        this.userData.salesOfficeSelection[this.tableIndex].DSoffice_Code = event.salesOfficeCode
        this.userData.salesOfficeSelection[this.tableIndex].DSoffice_Name = event.salesOfficeName
        break;
      case 'selectionSalesGroupCode':
        this.userData.salesGroupSelection[this.tableIndex].DSGroup_Code = event.code
        this.userData.salesGroupSelection[this.tableIndex].DSGroup_Name = event.name
        break;
      case 'VoucherTypeCode':
        this.userData.VoucherTypeRestriction[this.tableIndex].HVTypeRestr_Voucher_Code = event.voucherCode
        this.userData.VoucherTypeRestriction[this.tableIndex].HVTypeRestr_Voucher_Name = event.voucherName
        break;

      case 'VoucherTypeMenuCode':
        this.userData.VoucherTypeRestriction[this.tableIndex].HVTypeRestr_Menu_Code = event.voucherCode
        this.userData.VoucherTypeRestriction[this.tableIndex].HVTypeRestr_Menu_Name = event.voucherName
        break;
      default:
        break;
    }

  }

  changeIndex(i) {
    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i
  }

  deleteRow(table: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (table === 'applicableCo') {
          this.userData.applicableCo.splice(index, 1);
          if (this.userData.applicableCo.length === 0) {
            this.addRow('applicableCo', -1);
          }
        } else if (table === 'AccountSelection') {
          this.userData.AccountSelection.splice(index, 1);
          if (this.userData.AccountSelection.length === 0) {
            this.addRow('AccountSelection', -1);
          }

        } else if (table === 'costCenterSelection') {
          this.userData.costCenterSelection.splice(index, 1);
          if (this.userData.costCenterSelection.length === 0) {
            this.addRow('costCenterSelection', -1);
          }
        } else if (table === 'profitCenterSelection') {
          this.userData.profitCenterSelection.splice(index, 1);
          if (this.userData.profitCenterSelection.length === 0) {
            this.addRow('profitCenterSelection', -1);
          }
        } else if (table === 'divisionSelection') {
          this.userData.divisionSelection.splice(index, 1);
          if (this.userData.divisionSelection.length === 0) {
            this.addRow('divisionSelection', -1);
          }
        } else if (table === 'departmentSelection') {
          this.userData.departmentSelection.splice(index, 1);
          if (this.userData.departmentSelection.length === 0) {
            this.addRow('departmentSelection', -1);
          }
        } else if (table === 'jobSelection') {
          this.userData.jobSelection.splice(index, 1);
          if (this.userData.jobSelection.length === 0) {
            this.addRow('jobSelection', -1);
          }
        } else if (table === 'otherCenterSelection') {
          this.userData.otherCenterSelection.splice(index, 1);
          if (this.userData.otherCenterSelection.length === 0) {
            this.addRow('otherCenterSelection', -1);
          }
        } else if (table === 'salesOrganizationSelection') {
          this.userData.salesOrganizationSelection.splice(index, 1);
          if (this.userData.salesOrganizationSelection.length === 0) {
            this.addRow('salesOrganizationSelection', -1);
          }
        } else if (table === 'distributionChannelSelection') {
          this.userData.distributionChannelSelection.splice(index, 1);
          if (this.userData.distributionChannelSelection.length === 0) {
            this.addRow('distributionChannelSelection', -1);
          }
        } else if (table === 'salesOfficeSelection') {
          this.userData.salesOfficeSelection.splice(index, 1);
          if (this.userData.salesOfficeSelection.length === 0) {
            this.addRow('salesOfficeSelection', -1);
          }

        } else if (table === 'VoucherTypeRestriction') {
          this.userData.VoucherTypeRestriction.splice(index, 1);
          if (this.userData.VoucherTypeRestriction.length === 0) {
            this.addRow('VoucherTypeRestriction', -1);
          }
        } else if (table === 'salesGroupSelection') {
          this.userData.salesGroupSelection.splice(index, 1);
          if (this.userData.salesGroupSelection.length === 0) {
            this.addRow('salesGroupSelection', -1);
          }
        }
      }
    });
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

  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldUserHeadCoDto()
      this.userData.applicableCo.splice(index + 1, 0, newRow);
    }
    if (table == 'AccountSelection') {
      const newRow = new TblDResAccDto()
      this.userData.AccountSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'costCenterSelection') {
      const newRow = new TblDCostCentDto()
      this.userData.costCenterSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'profitCenterSelection') {
      const newRow = new TblDProfCentDto()
      this.userData.profitCenterSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'divisionSelection') {
      const newRow = new TblDdivsionDto()
      this.userData.divisionSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'departmentSelection') {
      const newRow = new TblDdepartDto()
      this.userData.departmentSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'jobSelection') {
      const newRow = new TblDJobDto()
      this.userData.jobSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'otherCenterSelection') {
      const newRow = new TblDOtherCentDto()
      this.userData.otherCenterSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesOrganizationSelection') {
      const newRow = new TblDSalesOrgDto()
      this.userData.salesOrganizationSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'distributionChannelSelection') {
      const newRow = new TblDdisChanelDto()
      this.userData.distributionChannelSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesOfficeSelection') {
      const newRow = new TblDSalesOfficeDto()
      this.userData.salesOfficeSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'salesGroupSelection') {
      const newRow = new TblDSalesGroupDto()
      this.userData.salesGroupSelection.splice(index + 1, 0, newRow);
    }
    if (table == 'VoucherTypeRestriction') {
      const newRow = new TblDVouType()
      this.userData.VoucherTypeRestriction.splice(index + 1, 0, newRow);
    }
  }

  onMenuSelect(node: TreeNode) {
    this.selectedNode = node;
    this.selectedMenu = node.label;

    if (!this.TblDLoginRight[this.selectedMenu]) {
      this.TblDLoginRight[this.selectedMenu] = new TblDLoginRightDto();
    }
  }

  toggleSelectAllRights() {
    if (this.selectedMenu) {
      this.rightFields.forEach(field => {
        this.TblDLoginRight[this.selectedMenu][field.prop] = this.selectAllRights;
      });
    }
  }

  updateSelectAllRights() {
    if (this.selectedMenu) {
      this.selectAllRights = this.rightFields.every(field => this.TblDLoginRight[this.selectedMenu][field.prop]);
    }
  }

  onRightChange(field: any) {
    if (this.selectedMenu) {
      this.TblDLoginRight[this.selectedMenu][field.prop] = field.selected;
      this.updateSelectAllRights();
    }
  }



  //****************************************SAVE****************************************


  preSave(): boolean {
    if (this.userData.HUser_Code == null || this.userData.HUser_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'User Code Cannot Be Null' });
      return false;
    }

    if (this.userData.HUser_Name == null || this.userData.HUser_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'User Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  async saveUserData() {

    if (!(await this.preSave())) {
      return;
    }
    this.userData.applicableCo = this.userData.applicableCo.filter(
      row => row.DcUser_SingleCo_Code && row.DcUser_SingleCo_Code.trim() !== ''
    );

    const body = { ...this.userData };

    // Remove unwanted properties 
    // Remove this when saving all the data, Currently only saving header and applicable co only, as suggested by thomas
    delete body.AccountSelection;
    delete body.costCenterSelection;
    delete body.profitCenterSelection;
    delete body.divisionSelection;
    delete body.departmentSelection;
    delete body.jobSelection;
    delete body.otherCenterSelection;
    delete body.salesOrganizationSelection;
    delete body.distributionChannelSelection;
    delete body.salesOfficeSelection;
    delete body.salesGroupSelection;
    delete body.VoucherTypeRestriction;
    delete body.TblDLoginRetsri;
    delete body.TblDRetstrict;


    this._masterService.saveMasterData(apiUrl.userCreation, body).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

        // this.userData = new (UserCreationDto)
        // this.userData.applicableCo = [new TbldUserHeadCoDto()]
        // this.userData.AccountSelection = [new TblDResAccDto()]
        // this.router.navigate(['/common/user-creation'])

      }


    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })

    // }
  }

  AddNew() {
    this.router.navigate(['/common/user-creation'])
  }

  editRow(rowData) {
    this.showuserCreationList = false
    this.router.navigate(['/common/user-creation/' + rowData.HUser_SysID])
    this.getdata()
  }

  Back() {
    this.showuserCreationList = false
    this.router.navigate(['common/user-creation']);
  }



  //*******************************************LIST***************************************** */


  displayusercreationlist() {
    this.getListData()
  }

  getListData() {
    this._masterService.getMasterData(apiUrl.userCreation).then((res) => {
      this.showuserCreationList = true
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HUser_Code || item.HUser_Name || item.HUser_SysID;
      const matchesQuery =
        (item.HUser_Code || '').toLowerCase().includes(query) ||
        (item.HUser_Name || '').toLowerCase().includes(query) ||
        item.HUser_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }


  //***************************************DELETE******************************************** */

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.userCreation, this.userData.HUser_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Refresh()
            setTimeout(() => {
              this.router.navigate(['common/user-creation']);
            }, 1000);
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
    this.userData = new UserCreationDto()
  }

}
