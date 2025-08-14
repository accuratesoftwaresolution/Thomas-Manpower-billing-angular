import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldTermsCo } from 'src/app/_dto/TbldTermsCo.dto';
import { TblHTerms } from 'src/app/_dto/TblHTerms.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-terms-and-conditions-master',
  templateUrl: './terms-and-conditions-master.component.html',
  styleUrls: ['./terms-and-conditions-master.component.scss']
})
export class TermsAndConditionsMasterComponent implements OnInit {

  TblHTerms: TblHTerms = new TblHTerms()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showTermsConditionsList: boolean = false

  tableIndex: any;

  HTerms_SysID: any;

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
    this.TblHTerms.TbldTermsCo = [new TbldTermsCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HTerms_SysID = Number(id);
        this.TblHTerms.HTerms_SysID = Number(id);
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
        const isExist = this.TblHTerms.TbldTermsCo.some(item => item.DcTerms_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Terms and Condition Master' });
          return;
        }
        this.TblHTerms.TbldTermsCo[this.tableIndex].DcTerms_SingleCo_SysID = event.sysId
        this.TblHTerms.TbldTermsCo[this.tableIndex].DcTerms_SingleCo_Code = event.code
        this.TblHTerms.TbldTermsCo[this.tableIndex].DcTerms_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHTerms.HTerms_AcDe_SysID = event.sysId
        this.TblHTerms.HTerms_AcDe_Code = event.code
        this.TblHTerms.HTerms_AcDe_Name = event.name
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


        if (this.TblHTerms.HTerms_SysID && rowData.DcTerms_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.termandConditions, `company?where[DcTerms_SysID]=${this.TblHTerms.TbldTermsCo[0].DcTerms_SysID}&where[DcTerms_SingleCo_SysID]=${rowData.DcTerms_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldTermsCo') {
                this.TblHTerms.TbldTermsCo.splice(index, 1);
                if (this.TblHTerms.TbldTermsCo.length === 0) {
                  this.addRow('TbldTermsCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldTermsCo') {
            this.TblHTerms.TbldTermsCo.splice(index, 1);
            if (this.TblHTerms.TbldTermsCo.length === 0) {
              this.addRow('TbldTermsCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldTermsCo') {
      const newRow = new TbldTermsCo()
      this.TblHTerms.TbldTermsCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHTerms.HTerms_Code == null || this.TblHTerms.HTerms_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Terms and Conditions master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHTerms.HTerms_Name == null || this.TblHTerms.HTerms_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Terms and Conditions master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHTerms.TbldTermsCo[0].DcTerms_SingleCo_Code == null || this.TblHTerms.TbldTermsCo[0].DcTerms_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Terms and Conditions master Single Company Code Cannot Be Null' });
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
    this.TblHTerms.TbldTermsCo = this.TblHTerms.TbldTermsCo.filter(
      row => row.DcTerms_SingleCo_Code && row.DcTerms_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.termandConditions, this.TblHTerms).then((res) => {
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

        // Reset form
        this.TblHTerms = new TblHTerms();
        this.TblHTerms.TbldTermsCo = [new TbldTermsCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/terms-and-conditions-master/']);

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
    if (this.TblHTerms.HTerms_SysID || this.HTerms_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.termandConditions, this.TblHTerms.HTerms_SysID).then((res) => {
        this.TblHTerms = res
        this.showDeleteButton = true;

        if (this.TblHTerms.TbldTermsCo.length == 0) {
          this.TblHTerms.TbldTermsCo = [new TbldTermsCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHTerms = new TblHTerms()
          this.TblHTerms.TbldTermsCo = [new TbldTermsCo()]
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
        this.masterService.deleteData(apiUrl.termandConditions, this.TblHTerms.HTerms_SysID).then((res) => {

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
    this.TblHTerms = new TblHTerms()
    this.TblHTerms.TbldTermsCo = [new TbldTermsCo()]
    this.router.navigate(['l-master/terms-and-conditions-master/']);

  }
  cancel() {
    this.TblHTerms = new TblHTerms()
    this.TblHTerms.TbldTermsCo = [new TbldTermsCo()]
    this.router.navigate(['l-master/terms-and-conditions-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayTermsConditionsList() {
    this.showTermsConditionsList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.termandConditions).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HTerms_Code || item.HTerms_Name || item.HTerms_SysID;
      const matchesQuery =
        (item.HTerms_Code || '').toLowerCase().includes(query) ||
        (item.HTerms_Name || '').toLowerCase().includes(query) ||
        item.HTerms_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showTermsConditionsList = false
    this.router.navigate(['l-master/terms-and-conditions-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/terms-and-conditions-master/' + rowData.HTerms_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.termandConditions, rowData.HTerms_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showTermsConditionsList = false

            this.getListData()
          }

        });
      }
    });
  }

}
