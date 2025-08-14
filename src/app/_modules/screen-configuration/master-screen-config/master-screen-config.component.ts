import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldHMastDigiLock } from 'src/app/_dto/TbldHMastDigiLock.dto';
import { TblDMastDigiLock } from 'src/app/_dto/TblDMastDigiLock.dto';
import { TblHConfMastDocu } from 'src/app/_dto/TblHConfMastDocu.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-master-screen-config',
  templateUrl: './master-screen-config.component.html',
  styleUrls: ['./master-screen-config.component.scss']
})
export class MasterScreenConfigComponent implements OnInit {

  showDeleteButton = false;

  HMaster_SysID: any;

  HMaster_Name: any;

  activeIndex: number = 0;

  tableIndex: any;
  
  HCMastDocu_Midd_SysID: any

  TblHConfMastDocu: TblHConfMastDocu = new TblHConfMastDocu()

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showMasterConfigList: boolean = false


  scrollableTabs: any[] =
    [
      { title: "Main", content: "" },
      { title: "Select Query", content: "" },
      { title: "Insert Query", content: "" },
      { title: "Update Query", content: "" },
      { title: "Delete Query", content: "" },
      { title: "DigiLock", content: "" },
    ]

  changeIndex(i) {
    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    public masterService: MasterService,
    private confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private activatedRoute: ActivatedRoute,


  ) { }


  ngOnInit(): void {
    this.TblHConfMastDocu.TbldHMastDigiLock = [new TbldHMastDigiLock()]
    this.TblHConfMastDocu.TblDMastDigiLock = [new TblDMastDigiLock(), new TblDMastDigiLock(), new TblDMastDigiLock()]


    if (this.TblHConfMastDocu.TblDMastDigiLock.length < 1) {
      const number = 4 - this.TblHConfMastDocu.TblDMastDigiLock.length
      for (let index = 0; index < number; index++) {
        this.TblHConfMastDocu.TblDMastDigiLock.push(new TblDMastDigiLock());
      }
    }

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HCMastDocu_Midd_SysID = Number(id);
        this.TblHConfMastDocu.HCMastDocu_Midd_SysID = Number(id);
        this.getData()
      }
    });
  }

  ShowPopUp(Type, i?) {
    this.tableIndex = i;
    switch (Type) {
      case 'MidValidationMenuCode':
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  routeTo(screen) {
    this.router.navigate([screen]);
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {
      case 'MidValidationMenuCode':
        this.TblHConfMastDocu.HCMastDocu_MiddValid_SysID = event.MiddValid_SysID
        this.TblHConfMastDocu.HCMastDocu_MiddValid_Code = event.MiddValid_Code
        this.TblHConfMastDocu.HCMastDocu_MiddValid_Name = event.MiddValid_Name
        break;
      case 'MidTransactionMenuCode':
        this.TblHConfMastDocu.HCMastDocu_TransMenu_SysID = event.MiddValid_SysID
        this.TblHConfMastDocu.HCMastDocu_TransMenu_Code = event.MiddValid_Code
        this.TblHConfMastDocu.HCMastDocu_TransMenu_Name = event.MiddValid_Name
        break;
      default:
        break;
    }

  }

  funcSearch() {
    this.getData()
    this.showDeleteButton = true;
  }

  getData() {
    this.masterService.getMasterDatabyId('master-screen-validation', this.TblHConfMastDocu.HCMastDocu_Midd_SysID).then((res) => {
      console.log("res");

      this.TblHConfMastDocu = res
      const digiLock = this.TblHConfMastDocu.TbldHMastDigiLock[0];

      // Convert both date fields from string to Date objects
      digiLock.DigiMast_Vou_Date = digiLock.DigiMast_Vou_Date ? new Date(digiLock.DigiMast_Vou_Date) : null;
      digiLock.DigiMast_Log_Date = digiLock.DigiMast_Log_Date ? new Date(digiLock.DigiMast_Log_Date) : null;

    })
  }

  onDateChange(type: 'vou' | 'log', value: string) {
    const dateObj = value ? new Date(value) : null;
    const digiLock = this.TblHConfMastDocu.TbldHMastDigiLock[0];

    if (type === 'vou') {
      digiLock.DigiMast_Vou_Date = dateObj;
    } else if (type === 'log') {
      digiLock.DigiMast_Log_Date = dateObj;
    }
  }


  save() {
    console.log(this.TblHConfMastDocu);
    this.masterService.saveMasterData('master-screen-validation', this.TblHConfMastDocu).then((res) => {

      if (res.success == false) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

        this.TblHConfMastDocu = new TblHConfMastDocu()
        this.TblHConfMastDocu.TbldHMastDigiLock = [new TbldHMastDigiLock()]
        this.TblHConfMastDocu.TblDMastDigiLock = [new TblDMastDigiLock(), new TblDMastDigiLock(), new TblDMastDigiLock()]
         this.router.navigate(['screen-config/master']);
      }

    })
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData('master-screen-validation', this.TblHConfMastDocu.HCMastDocu_Midd_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showDeleteButton = false;
            this.TblHConfMastDocu = new TblHConfMastDocu()
            this.TblHConfMastDocu.TbldHMastDigiLock = [new TbldHMastDigiLock()]
            this.TblHConfMastDocu.TblDMastDigiLock = [new TblDMastDigiLock(), new TblDMastDigiLock(), new TblDMastDigiLock()]
          }

        });
      }
    });
  }

  updateCheckbox(event: any, field) {
    field = event.target.checked ? 'Y' : 'N';
  }



  displaymasterconfig() {
    this.showMasterConfigList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData('master-screen-validation').then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HCMastDocu_MiddValid_Code || item.HCMastDocu_MiddValid_Name || item.HCMastDocu_MiddValid_SysID;
      const matchesQuery =
        (item.HCMastDocu_MiddValid_Code || '').toLowerCase().includes(query) ||
        (item.HCMastDocu_MiddValid_Name || '').toLowerCase().includes(query) ||
        item.HCMastDocu_MiddValid_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showMasterConfigList = false
    this.router.navigate(['screen-config/master']);



  }
  editRow(rowData: any) {
    this.router.navigate(['screen-config/master/', rowData.HCMastDocu_Midd_SysID]);

  }

   deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData('master-screen-validation', rowData.HCMastDocu_Midd_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showMasterConfigList = false

            this.getListData()
          }

        });
      }
    });
  }
}
