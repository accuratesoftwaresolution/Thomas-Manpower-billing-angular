import { InterfaceObjectService } from './../../../_providers/interface-object.service';
import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { TblHGroupCoDto } from 'src/app/_dto/masters/tblHGroupCo.dto';
import { TblDocAttachDto } from 'src/app/_dto/tbldocattch.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-group-company',
  templateUrl: './group-company.component.html',
  styleUrls: ['./group-company.component.scss']
})
export class GroupCompanyComponent implements OnInit {

  showDelete :boolean =false;

  updatedata: boolean = false;

  showGroupList: boolean = false;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  GroupCo_Code: string;

  activeIndex: number = 0;

  display: boolean = false;

  DigiLockerFields: any[] = [];

  groupCompanyData: TblHGroupCoDto = new TblHGroupCoDto()

  tableIndex: any;

  areaMaster: any[] = []

  groupCompany: any[] = []

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
    { id: 0, title: "Main", content: "", visible: true },
    { id: 1, title: "Document Attachment", content: "Content for Document Attachment", visible: true },
  ];


  constructor(
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
    private _masterService: MasterService,
    private lookupService: LookupDialogService,
    private _messageService: MessageService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    // this.groupCompanyData = new TblHGroupCoDto()

    this.route.paramMap.subscribe(async (param: ParamMap) => {
      if (param.get('id') && param.get('id')) {
        const idParam = param.get('id');
        this.groupCompanyData.GroupCo_SysID = idParam ? Number(idParam) : 0;
        this.getdata()
      }
      else {
        this.getdata()
      }

    });
    // this.getLovMasters()
  }


  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'AreaCode':
        break;
      case 'ActAndDeactCode':
        break;
      case 'CityCode':
        break;
      case 'CountryCode':
        break;


      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {
    let Type = this.popUpService.selectedPopUp
    console.log(event);

    switch (Type) {

      case 'AreaCode':
        this.groupCompanyData.GroupCo_Area_SysID = event.sysId
        this.groupCompanyData.GroupCo_Area_Code = event.areaCode
        this.groupCompanyData.GroupCo_Area_Name = event.areaName
        break;
      case 'ActAndDeactCode':
        this.groupCompanyData.GroupCo_AcDe_Code = event.code
        this.groupCompanyData.GroupCo_AcDe_Name = event.name
        this.groupCompanyData.GroupCo_AcDe_SysID = event.sysId
        break;
      case 'CityCode':
        this.groupCompanyData.GroupCo_City_SysID = event.sysId
        this.groupCompanyData.GroupCo_City_Code = event.cityCode
        this.groupCompanyData.GroupCo_City_Name = event.cityName
        break;
      case 'CountryCode':
        this.groupCompanyData.GroupCo_Count_SysID = event.sysId
        this.groupCompanyData.GroupCo_Count_Code = event.countryCode
        this.groupCompanyData.GroupCo_Count_Name = event.countryName
        break;

      default:
        break;
    }

  }

  getLovMasters() {
    this._salesService.getMasterData(apiUrl.areaMaster).then((res) => {
      this.areaMaster = res
    })

    this._salesService.getMasterData(apiUrl.groupCompany).then((res) => {
      this.groupCompany = res.data
    })


  }




  async SavegroupCompanyData() {

    if (!(await this.preSave())) {
      return;
    }


    else {
      this._masterService.saveMasterData(apiUrl.groupCompany, this.groupCompanyData).then((res) => {
        console.log("res", res);
        this._messageService.add({ severity: 'success', summary: 'Date Saved', detail: 'Data Saved Successfully' });
        this.groupCompanyData = new TblHGroupCoDto()
        this.router.navigate(['/common/group-company'])
      },
        err => {
          this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
        })
    }
  }


  funcSearch() {
    this.getdata()
  }

  getdata() {
    if (this.groupCompanyData.GroupCo_SysID) {
      this._masterService.getMasterDatabyId(apiUrl.groupCompany, this.groupCompanyData.GroupCo_SysID).then((res) => {
        this.groupCompanyData = res
      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.groupCompanyData = new TblHGroupCoDto()

        }
      })
    }
  }



  async preSave(): Promise<boolean> {

    if (!this.groupCompanyData.GroupCo_Code || this.groupCompanyData.GroupCo_Code.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: "Group Company Code Cannot be Null" });
      return false;
    }
    if (!this.groupCompanyData.GroupCo_Name || this.groupCompanyData.GroupCo_Name.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: "Group Company Name Cannot be Null" });
      return false;
    }
    return true;
  }


  AddgroupCompanyData() {
    this.groupCompanyData = new TblHGroupCoDto()
    this.router.navigate(['/common/group-company'])
  }

  showgroupcolist() {
    this.showGroupList = true
    this.getListData()
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.groupCompany, this.groupCompanyData.GroupCo_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Refresh()
            this.router.navigate(['/common/group-company'])

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
    this.groupCompanyData = new TblHGroupCoDto()
    

  }

  onDateChange(field: string, value: any) {
    this.groupCompanyData[field] = value;
  }


  ////////////////////////////////////////////////////////////



  filterTable() {
    this.filteredfilteredlistData = this.listData.filter(item =>
      item.GroupCo_Code.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.GroupCo_Name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.GroupCo_SysID.toString().includes(this.searchText)
    );
  }

  getListData() {
    this._masterService.getMasterData(apiUrl.groupCompany).then((res) => {
      this.listData = res
      this.filterTable()
      this.showDelete =true
    })
  }

  editRow(rowData: any) {
    this.router.navigate(['common/group-company/' + rowData.GroupCo_SysID]);
    this.showGroupList = false
  }


Back(){
  this.showGroupList = false
}



///////////////////////////////////////////////////////////





}
