import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldBomJobCo } from 'src/app/_dto/masters/bom-job-creation/TbldBomJobCo.dto';
import { TblHBomJob } from 'src/app/_dto/masters/bom-job-creation/TblHBomJob.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-bom-job-creation',
  templateUrl: './bom-job-creation.component.html',
  styleUrls: ['./bom-job-creation.component.scss']
})
export class BomJobCreationComponent implements OnInit {

   TblHBomJob: TblHBomJob = new TblHBomJob()

    listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showBomJobCreationList :boolean = false

  tableIndex: any;

  HBJob_SysID: any;

  showDeleteButton: boolean = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHBomJob.applicableCo = [new TbldBomJobCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HBJob_SysID = Number(id);
        this.TblHBomJob.HBJob_SysID = Number(id);
        this.getdata()
      }
    });
  }


  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ApplicableCompanyCode':
        break;
      case 'AccDirectExpCode':
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

        const selectedCode = event.code
        const isExist = this.TblHBomJob.applicableCo.some(item => item.DcBJob_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for BOM Job Creation Master' });
          return;
        }
        this.TblHBomJob.applicableCo[this.tableIndex].DcBJob_SingleCo_SysID = event.sysId
        this.TblHBomJob.applicableCo[this.tableIndex].DcBJob_SingleCo_Code = event.code
        this.TblHBomJob.applicableCo[this.tableIndex].DcBJob_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHBomJob.HBJob_AcDe_Code = event.code
        this.TblHBomJob.HBJob_AcDe_Name = event.name
        break;


      default:
        break;
    }

  }

  deleteRow(table: any, index: number, rowData) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        if (this.TblHBomJob.HBJob_SysID && rowData.DcBJob_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.suppliercategory, `company?where[DcBJob_SysID]=${this.TblHBomJob.applicableCo[0].DcBJob_SysID}&where[DcBJob_SingleCo_SysID]=${rowData.DcBJob_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'applicableCo') {
                this.TblHBomJob.applicableCo.splice(index, 1);
                if (this.TblHBomJob.applicableCo.length === 0) {
                  this.addRow('applicableCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'applicableCo') {
            this.TblHBomJob.applicableCo.splice(index, 1);
            if (this.TblHBomJob.applicableCo.length === 0) {
              this.addRow('applicableCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldBomJobCo()
      this.TblHBomJob.applicableCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHBomJob.HBJob_Code == null || this.TblHBomJob.HBJob_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'BOM Job Creation Code Cannot Be Null' });
      return false;
    }

    if (this.TblHBomJob.HBJob_Name == null || this.TblHBomJob.HBJob_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'BOM Job Creation Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHBomJob.applicableCo = this.TblHBomJob.applicableCo.filter(
      row => row.DcBJob_SingleCo_Code && row.DcBJob_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.suppliercategory, this.TblHBomJob).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHBomJob = new TblHBomJob()
        this.TblHBomJob.applicableCo = [new TbldBomJobCo()]

      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHBomJob.HBJob_SysID || this.HBJob_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.suppliercategory, this.TblHBomJob.HBJob_SysID).then((res) => {
        this.TblHBomJob = res
        this.showDeleteButton = true;

        if (this.TblHBomJob.applicableCo.length == 0) {
          this.TblHBomJob.applicableCo = [new TbldBomJobCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHBomJob = new TblHBomJob()
          this.TblHBomJob.applicableCo = [new TbldBomJobCo()]
        }
      })
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.suppliercategory, this.TblHBomJob.HBJob_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Refresh()


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
    this.TblHBomJob = new TblHBomJob()
    this.TblHBomJob.applicableCo = [new TbldBomJobCo()]
    this.router.navigate(['prod-masters/bom-job-creation/']);

  }
  cancel(){
    this.TblHBomJob = new TblHBomJob()
          this.TblHBomJob.applicableCo = [new TbldBomJobCo()]
  }

   //***************************************LIST********************************
  displayBOMJobcreationList() {
    this.showBomJobCreationList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData('account-module').then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HBJob_Code || item.HBJob_Name || item.HBJob_SysID;
      const matchesQuery =
        (item.HBJob_Code || '').toLowerCase().includes(query) ||
        (item.HBJob_Name || '').toLowerCase().includes(query) ||
        item.HBJob_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showBomJobCreationList = false
    this.router.navigate(['prod-masters/bom-job-creation']);


  }
    editRow(rowData: any) {
    this.router.navigate(['prod-masters/bom-job-creation/' + rowData.HBJob_SysID]);
  }





}
