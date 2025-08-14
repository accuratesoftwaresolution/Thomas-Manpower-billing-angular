import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldMessageCo } from 'src/app/_dto/TbldMessageCo.dto';
import { TblHMessage } from 'src/app/_dto/TblHMessage.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-message-master',
  templateUrl: './message-master.component.html',
  styleUrls: ['./message-master.component.scss']
})
export class MessageMasterComponent implements OnInit {

  isSaving: boolean = false;

  progressValue: number = 0;

  TblHMessage: TblHMessage = new TblHMessage()

  tableIndex: any;

  HMessage_SysID: any;

  showDeleteButton: boolean = false;

  add: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showMesageList: boolean = false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHMessage.TbldMessageCo = [new TbldMessageCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HMessage_SysID = Number(id);
        this.TblHMessage.HMessage_SysID = Number(id);
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
        const isExist = this.TblHMessage.TbldMessageCo.some(item => item.DcMessage_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Message Master' });
          return;
        }
        this.TblHMessage.TbldMessageCo[this.tableIndex].DcMessage_SingleCo_SysID = event.sysId
        this.TblHMessage.TbldMessageCo[this.tableIndex].DcMessage_SingleCo_Code = event.code
        this.TblHMessage.TbldMessageCo[this.tableIndex].DcMessage_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHMessage.HMessage_AcDe_Code = event.code
        this.TblHMessage.HMessage_AcDe_Name = event.name
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


        if (this.TblHMessage.HMessage_SysID && rowData.DcMessage_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.messageMaster, `company?where[DcMessage_SysID]=${this.TblHMessage.TbldMessageCo[0].DcMessage_SysID}&where[DcMessage_SingleCo_SysID]=${rowData.DcMessage_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldMessageCo') {
                this.TblHMessage.TbldMessageCo.splice(index, 1);
                if (this.TblHMessage.TbldMessageCo.length === 0) {
                  this.addRow('TbldMessageCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldMessageCo') {
            this.TblHMessage.TbldMessageCo.splice(index, 1);
            if (this.TblHMessage.TbldMessageCo.length === 0) {
              this.addRow('TbldMessageCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldMessageCo') {
      const newRow = new TbldMessageCo()
      this.TblHMessage.TbldMessageCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHMessage.HMessage_Code == null || this.TblHMessage.HMessage_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Message Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHMessage.HMessage_Name == null || this.TblHMessage.HMessage_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Message Master Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) return;

    this.isSaving = true;
    this.progressValue = 0;

    const interval = setInterval(() => {
      this.progressValue += 10;
      if (this.progressValue >= 90) clearInterval(interval);
    }, 200);
    this.TblHMessage.TbldMessageCo = this.TblHMessage.TbldMessageCo.filter(
      row => row.DcMessage_SingleCo_Code && row.DcMessage_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.messageMaster, this.TblHMessage).then((res) => {
      clearInterval(interval);

      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHMessage = (new TblHMessage())
        this.TblHMessage.TbldMessageCo = [new TbldMessageCo()]
        this.router.navigate(['l-master/message-master/']);
        this.progressValue += 100;


      }

      setTimeout(() => {
        this.isSaving = false;
        this.progressValue = 50;
      }, 800);
    }).catch(() => {
      clearInterval(interval);
      this.progressValue = 50;
      this.isSaving = false;
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Save failed' });
    });
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHMessage.HMessage_SysID || this.HMessage_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.messageMaster, this.TblHMessage.HMessage_SysID).then((res) => {
        this.TblHMessage = res
        this.showDeleteButton = true;

        if (this.TblHMessage.TbldMessageCo.length == 0) {
          this.TblHMessage.TbldMessageCo = [new TbldMessageCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHMessage = new TblHMessage()
          this.TblHMessage.TbldMessageCo = [new TbldMessageCo()]
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
        this.masterService.deleteData(apiUrl.messageMaster, this.TblHMessage.HMessage_SysID).then((res) => {

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
    this.TblHMessage = new TblHMessage()
    this.TblHMessage.TbldMessageCo = [new TbldMessageCo()]
    this.router.navigate(['l-master/message-master/']);

  }
  cancel() {
    this.TblHMessage = new TblHMessage()
    this.TblHMessage.TbldMessageCo = [new TbldMessageCo()]
    this.router.navigate(['l-master/message-master/']);

  }
  // ---------------------------------------------------------------------List--------------------------
  displayMessageList() {
    this.showMesageList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.messageMaster).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HMessage_Code || item.HMessage_Name || item.HMessage_SysID;
      const matchesQuery =
        (item.HMessage_Code || '').toLowerCase().includes(query) ||
        (item.HMessage_Name || '').toLowerCase().includes(query) ||
        item.HMessage_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showMesageList = false
    this.router.navigate(['l-master/message-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/message-master/' + rowData.HMessage_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.messageMaster, rowData.HMessage_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showMesageList = false

            this.getListData()
          }

        });
      }
    });
  }



}
