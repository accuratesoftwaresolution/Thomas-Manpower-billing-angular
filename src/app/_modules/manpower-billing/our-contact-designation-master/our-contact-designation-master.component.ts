import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPOurCDesigCo } from 'src/app/_dto/our-contact-designation-master/TbldPOurCDesigCo.dto';
import { TblHPOurCDesig } from 'src/app/_dto/our-contact-designation-master/TblHPOurCDesig.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-our-contact-designation-master',
  templateUrl: './our-contact-designation-master.component.html',
  styleUrls: ['./our-contact-designation-master.component.scss']
})
export class OurContactDesignationMasterComponent implements OnInit {

 showListButton: boolean = true;

  TblHPOurCDesig: TblHPOurCDesig = new TblHPOurCDesig()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPOurCDesig_SysID: any;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHPOurCDesig.TbldPOurCDesigCo = [new TbldPOurCDesigCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPOurCDesig_SysID = Number(id);
        this.TblHPOurCDesig.HPOurCDesig_SysID = Number(id);
        this.getdata()
      }
    });
    this.getlovdata()
  }
  getlovdata() {
    this.masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activatedeactivate = res
    })
    this.masterService.getMasterData(apiUrl.singleCompany).then((res) => {
      this.singleCompany = res
    })
  }


  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCompany;
        break;
      case 'AccDirectExpCode':
        break;
      default:
        break;
      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activatedeactivate;
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {


      case 'ApplicableCompanyCode':
        const selectedCode = event.SingleCo_Code;
        const isExist = this.TblHPOurCDesig.TbldPOurCDesigCo.some(item => item.DcpOurCDesig_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Our Contact Designation Master' });
          return;
        }
        this.TblHPOurCDesig.TbldPOurCDesigCo[this.tableIndex].DcpOurCDesig_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPOurCDesig.TbldPOurCDesigCo[this.tableIndex].DcpOurCDesig_SingleCo_Code = event.SingleCo_Code;
        this.TblHPOurCDesig.TbldPOurCDesigCo[this.tableIndex].DcpOurCDesig_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPOurCDesig.HPOurCDesig_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPOurCDesig.HPOurCDesig_AcDe_Code = event.HActDeactive_Code
        this.TblHPOurCDesig.HPOurCDesig_AcDe_Name = event.HActDeactive_Name
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
        this.showListButton = true;

        if (this.TblHPOurCDesig.HPOurCDesig_SysID && rowData.DcpOurCDesig_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.OurContactDesignationMaster, `company?where[DcpOurCDesig_GridSysID]=${this.TblHPOurCDesig.TbldPOurCDesigCo[0].DcpOurCDesig_GridSysID}&where[DcpOurCDesig_SingleCo_SysID]=${rowData.DcpOurCDesig_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPOurCDesigCo') {
                this.TblHPOurCDesig.TbldPOurCDesigCo.splice(index, 1);
                if (this.TblHPOurCDesig.TbldPOurCDesigCo.length === 0) {
                  this.addRow('TbldPOurCDesigCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPOurCDesigCo') {
            this.TblHPOurCDesig.TbldPOurCDesigCo.splice(index, 1);
            if (this.TblHPOurCDesig.TbldPOurCDesigCo.length === 0) {
              this.addRow('TbldPOurCDesigCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPOurCDesigCo') {
      const newRow = new TbldPOurCDesigCo()
      this.TblHPOurCDesig.TbldPOurCDesigCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPOurCDesig.HPOurCDesig_Code == null || this.TblHPOurCDesig.HPOurCDesig_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Our Contact Designation Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPOurCDesig.HPOurCDesig_Name == null || this.TblHPOurCDesig.HPOurCDesig_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Our Contact Designation Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPOurCDesig.TbldPOurCDesigCo[0].DcpOurCDesig_SingleCo_Code == null || this.TblHPOurCDesig.TbldPOurCDesigCo[0].DcpOurCDesig_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Our Contact Designation Master Single Company Code Cannot Be Null' });
      return false;
    }

    return true;
  }

  save() {
    if (!this.preSave()) return;

    this.isSaving = true;
    this.progressValue = 0;

    const interval = setInterval(() => {
      if (this.progressValue < 90) {
        this.progressValue += 10;
      } else {
        clearInterval(interval);
      }
    }, 500);

    // Trim empty rows
    this.TblHPOurCDesig.TbldPOurCDesigCo = this.TblHPOurCDesig.TbldPOurCDesigCo.filter(
      row => row.DcpOurCDesig_SingleCo_Code && row.DcpOurCDesig_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.OurContactDesignationMaster, this.TblHPOurCDesig).then((res) => {
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

      // If success
      this.progressValue = 100;

      // Delay for smooth progress bar animation
      setTimeout(() => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message
        });

        this.showListButton = true;

        // Reset form
        this.TblHPOurCDesig = new TblHPOurCDesig();
        this.TblHPOurCDesig.TbldPOurCDesigCo = [new TbldPOurCDesigCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/our-contact-deisgnation-master/']);

        // Finally reset flags
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





  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHPOurCDesig.HPOurCDesig_SysID || this.HPOurCDesig_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.OurContactDesignationMaster, this.TblHPOurCDesig.HPOurCDesig_SysID).then((res) => {
        this.TblHPOurCDesig = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPOurCDesig.TbldPOurCDesigCo.length == 0) {
          this.TblHPOurCDesig.TbldPOurCDesigCo = [new TbldPOurCDesigCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPOurCDesig = new TblHPOurCDesig()
          this.TblHPOurCDesig.TbldPOurCDesigCo = [new TbldPOurCDesigCo()]
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
        this.masterService.deleteData(apiUrl.OurContactDesignationMaster, this.TblHPOurCDesig.HPOurCDesig_SysID).then((res) => {

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
    this.TblHPOurCDesig = new TblHPOurCDesig()
    this.TblHPOurCDesig.TbldPOurCDesigCo = [new TbldPOurCDesigCo()]
    this.router.navigate(['Manpower/our-contact-deisgnation-master/']);

  }
  cancel() {
    this.TblHPOurCDesig = new TblHPOurCDesig()
    this.TblHPOurCDesig.TbldPOurCDesigCo = [new TbldPOurCDesigCo()]
    this.router.navigate(['Manpower/our-contact-deisgnation-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.OurContactDesignationMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPOurCDesig_Code || item.HPOurCDesig_Name || item.HPOurCDesig_SysID;
      const matchesQuery =
        (item.HPOurCDesig_Code || '').toLowerCase().includes(query) ||
        (item.HPOurCDesig_Name || '').toLowerCase().includes(query) ||
        item.HPOurCDesig_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/our-contact-deisgnation-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/our-contact-deisgnation-master/' + rowData.HPOurCDesig_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.OurContactDesignationMaster, rowData.HPOurCDesig_SysID).then((res) => {

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
