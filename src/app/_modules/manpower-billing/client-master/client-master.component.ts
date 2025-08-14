import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPClientCo } from 'src/app/_dto/client-master/TbldPClientCo.dto';
import { TblHPClient } from 'src/app/_dto/client-master/TblHPClient.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-client-master',
  templateUrl: './client-master.component.html',
  styleUrls: ['./client-master.component.scss']
})
export class ClientMasterComponent implements OnInit {

 showListButton: boolean = true;

  TblHPClient: TblHPClient = new TblHPClient()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPClient_SysID: any;

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
    this.TblHPClient.TbldPClientCo = [new TbldPClientCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPClient_SysID = Number(id);
        this.TblHPClient.HPClient_SysID = Number(id);
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
        const isExist = this.TblHPClient.TbldPClientCo.some(item => item.DcpClient_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Client Master' });
          return;
        }
        this.TblHPClient.TbldPClientCo[this.tableIndex].DcpClient_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPClient.TbldPClientCo[this.tableIndex].DcpClient_SingleCo_Code = event.SingleCo_Code;
        this.TblHPClient.TbldPClientCo[this.tableIndex].DcpClient_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPClient.HPClient_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPClient.HPClient_AcDe_Code = event.HActDeactive_Code
        this.TblHPClient.HPClient_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPClient.HPClient_SysID && rowData.DcpClient_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.clientMaster, `company?where[DcpClient_GridSysID]=${this.TblHPClient.TbldPClientCo[0].DcpClient_GridSysID}&where[DcpClient_SingleCo_SysID]=${rowData.DcpClient_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPClientCo') {
                this.TblHPClient.TbldPClientCo.splice(index, 1);
                if (this.TblHPClient.TbldPClientCo.length === 0) {
                  this.addRow('TbldPClientCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPClientCo') {
            this.TblHPClient.TbldPClientCo.splice(index, 1);
            if (this.TblHPClient.TbldPClientCo.length === 0) {
              this.addRow('TbldPClientCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPClientCo') {
      const newRow = new TbldPClientCo()
      this.TblHPClient.TbldPClientCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPClient.HPClient_Code == null || this.TblHPClient.HPClient_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Client  Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPClient.HPClient_Name == null || this.TblHPClient.HPClient_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Client  Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPClient.TbldPClientCo[0].DcpClient_SingleCo_Code == null || this.TblHPClient.TbldPClientCo[0].DcpClient_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Client  Master Single Company Code Cannot Be Null' });
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
    this.TblHPClient.TbldPClientCo = this.TblHPClient.TbldPClientCo.filter(
      row => row.DcpClient_SingleCo_Code && row.DcpClient_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.clientMaster, this.TblHPClient).then((res) => {
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
        this.TblHPClient = new TblHPClient();
        this.TblHPClient.TbldPClientCo = [new TbldPClientCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/client-master/']);

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
    if (this.TblHPClient.HPClient_SysID || this.HPClient_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.clientMaster, this.TblHPClient.HPClient_SysID).then((res) => {
        this.TblHPClient = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPClient.TbldPClientCo.length == 0) {
          this.TblHPClient.TbldPClientCo = [new TbldPClientCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPClient = new TblHPClient()
          this.TblHPClient.TbldPClientCo = [new TbldPClientCo()]
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
        this.masterService.deleteData(apiUrl.clientMaster, this.TblHPClient.HPClient_SysID).then((res) => {

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
    this.TblHPClient = new TblHPClient()
    this.TblHPClient.TbldPClientCo = [new TbldPClientCo()]
    this.router.navigate(['Manpower/client-master/']);

  }
  cancel() {
    this.TblHPClient = new TblHPClient()
    this.TblHPClient.TbldPClientCo = [new TbldPClientCo()]
    this.router.navigate(['Manpower/client-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.clientMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPClient_Code || item.HPClient_Name || item.HPClient_SysID;
      const matchesQuery =
        (item.HPClient_Code || '').toLowerCase().includes(query) ||
        (item.HPClient_Name || '').toLowerCase().includes(query) ||
        item.HPClient_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/client-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/client-master/' + rowData.HPClient_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.clientMaster, rowData.HPClient_SysID).then((res) => {

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
