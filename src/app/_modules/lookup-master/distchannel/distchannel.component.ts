import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldDistChanelCo } from 'src/app/_dto/masters/distribution-channel/TbldDistChanelCo.dto';
import { TblHDistChanel } from 'src/app/_dto/masters/distribution-channel/TblHDistChanel.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-distchannel',
  templateUrl: './distchannel.component.html',
  styleUrls: ['./distchannel.component.scss']
})
export class DistchannelComponent implements OnInit {


  TblHDistChanel: TblHDistChanel = new TblHDistChanel()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showdistributionChannelList: boolean = false

  tableIndex: any;

  HDistChanel_SysID: any;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;
  activateAndDeactivate: any;
  singleCoMaster: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHDistChanel.TbldDistChanelCo = [new TbldDistChanelCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HDistChanel_SysID = Number(id);
        this.TblHDistChanel.HDistChanel_SysID = Number(id);
        this.getdata()
      }
    });
  this.getLovData()
  }

  getLovData() {
    this.masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this.masterService.getMasterData(apiUrl.singleCoMaster).then((res) => {
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

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {

      case 'ApplicableCompanyCode':

        const selectedCode = event.SingleCo_Code
        const isExist = this.TblHDistChanel.TbldDistChanelCo.some(item => item.DcDistChanel_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Sales man Master' });
          return;
        }
        this.TblHDistChanel.TbldDistChanelCo[this.tableIndex].DcDistChanel_SingleCo_SysID = event.SingleCo_SysID
        this.TblHDistChanel.TbldDistChanelCo[this.tableIndex].DcDistChanel_SingleCo_Code = event.SingleCo_Code
        this.TblHDistChanel.TbldDistChanelCo[this.tableIndex].DcDistChanel_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHDistChanel.HDistChanel_AcDe_Code = event.HActDeactive_SysID
        this.TblHDistChanel.HDistChanel_AcDe_Code = event.HActDeactive_Code
        this.TblHDistChanel.HDistChanel_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHDistChanel.HDistChanel_SysID && rowData.DcDistChanel_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.distributionChannel, `company?where[DcDistChanel_SysID]=${this.TblHDistChanel.TbldDistChanelCo[0].DcDistChanel_SysID}&where[DcDistChanel_SingleCo_SysID]=${rowData.DcDistChanel_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldDistChanelCo') {
                this.TblHDistChanel.TbldDistChanelCo.splice(index, 1);
                if (this.TblHDistChanel.TbldDistChanelCo.length === 0) {
                  this.addRow('TbldDistChanelCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldDistChanelCo') {
            this.TblHDistChanel.TbldDistChanelCo.splice(index, 1);
            if (this.TblHDistChanel.TbldDistChanelCo.length === 0) {
              this.addRow('TbldDistChanelCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldDistChanelCo') {
      const newRow = new TbldDistChanelCo()
      this.TblHDistChanel.TbldDistChanelCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHDistChanel.HDistChanel_Code == null || this.TblHDistChanel.HDistChanel_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Distribution Channel Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHDistChanel.HDistChanel_Name == null || this.TblHDistChanel.HDistChanel_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Distribution Channel Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHDistChanel.TbldDistChanelCo[0].DcDistChanel_SingleCo_Code == null || this.TblHDistChanel.TbldDistChanelCo[0].DcDistChanel_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Distribution Channel Single Company Code Cannot Be Null' });
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
    this.TblHDistChanel.TbldDistChanelCo = this.TblHDistChanel.TbldDistChanelCo.filter(
      row => row.DcDistChanel_SingleCo_Code && row.DcDistChanel_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.distributionChannel, this.TblHDistChanel).then((res) => {
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
        this.TblHDistChanel = new TblHDistChanel();
        this.TblHDistChanel.TbldDistChanelCo = [new TbldDistChanelCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/distribution-channel/']);

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
    if (this.TblHDistChanel.HDistChanel_SysID || this.HDistChanel_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.distributionChannel, this.TblHDistChanel.HDistChanel_SysID).then((res) => {
        this.TblHDistChanel = res
        this.showDeleteButton = true;

        if (this.TblHDistChanel.TbldDistChanelCo.length == 0) {
          this.TblHDistChanel.TbldDistChanelCo = [new TbldDistChanelCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHDistChanel = new TblHDistChanel()
          this.TblHDistChanel.TbldDistChanelCo = [new TbldDistChanelCo()]
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
        this.masterService.deleteData(apiUrl.distributionChannel, this.TblHDistChanel.HDistChanel_SysID).then((res) => {

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
    this.TblHDistChanel = new TblHDistChanel()
    this.TblHDistChanel.TbldDistChanelCo = [new TbldDistChanelCo()]
    this.router.navigate(['l-master/distribution-channel/']);

  }
  cancel() {
    this.TblHDistChanel = new TblHDistChanel()
    this.TblHDistChanel.TbldDistChanelCo = [new TbldDistChanelCo()]
    this.router.navigate(['l-master/distribution-channel']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displaydistributionChannelList() {
    this.showdistributionChannelList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.distributionChannel).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HDistChanel_Code || item.HDistChanel_Name || item.HDistChanel_SysID;
      const matchesQuery =
        (item.HDistChanel_Code || '').toLowerCase().includes(query) ||
        (item.HDistChanel_Name || '').toLowerCase().includes(query) ||
        item.HDistChanel_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showdistributionChannelList = false
    this.router.navigate(['l-master/distribution-channel']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/distribution-channel/' + rowData.HDistChanel_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.distributionChannel, rowData.HDistChanel_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showdistributionChannelList = false

            this.getListData()
          }

        });
      }
    });
  }
}