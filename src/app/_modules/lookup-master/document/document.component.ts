import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldDocMasterCoDto } from 'src/app/_dto/masters/tbldDocMasterCo.dto';
import { TblHDocMasterDto } from 'src/app/_dto/masters/tblHDocMaster.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  
  TblHDocMasterDto: TblHDocMasterDto = new TblHDocMasterDto()

  tableIndex: any;

  HDocMaster_SysID: any; 

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  ShowDocumentList: boolean = false

  showDeleteButton: boolean = false;
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
    this.TblHDocMasterDto.TbldDocMasterCo = [new TbldDocMasterCoDto()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HDocMaster_SysID = Number(id);
        this.TblHDocMasterDto.HDocMaster_SysID = Number(id);
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

        const selectedCode = event.code
        const isExist = this.TblHDocMasterDto.TbldDocMasterCo.some(item => item.DcDocMaster_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for document Master' });
          return;
        }
        this.TblHDocMasterDto.TbldDocMasterCo[this.tableIndex].DcDocMaster_SingleCo_SysID = event.SingleCo_SysID
        this.TblHDocMasterDto.TbldDocMasterCo[this.tableIndex].DcDocMaster_SingleCo_Code = event.SingleCo_Code
        this.TblHDocMasterDto.TbldDocMasterCo[this.tableIndex].DcDocMastert_SingleCo_Name = event.SingleCo_Name;

        break;


      case 'ActAndDeactCode':
        this.TblHDocMasterDto.HDocMaster_AcDe_SysID = event.HActDeactive_SysID
        this.TblHDocMasterDto.HDocMaster_AcDe_Code = event.HActDeactive_Code
        this.TblHDocMasterDto.HDocMaster_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHDocMasterDto.HDocMaster_SysID && rowData.DcDocMaster_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.document, `company?where[DcDocMaster_SysID]=${this.TblHDocMasterDto.TbldDocMasterCo[0].DcDocMaster_SysID}&where[DcDocMaster_SingleCo_SysID]=${rowData.DcDocMaster_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldDocMasterCo') {
                this.TblHDocMasterDto.TbldDocMasterCo.splice(index, 1);
                if (this.TblHDocMasterDto.TbldDocMasterCo.length === 0) {
                  this.addRow('TbldDocMasterCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldDocMasterCo') {
            this.TblHDocMasterDto.TbldDocMasterCo.splice(index, 1);
            if (this.TblHDocMasterDto.TbldDocMasterCo.length === 0) {
              this.addRow('TbldDocMasterCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldDocMasterCo') {
      const newRow = new TbldDocMasterCoDto()
      this.TblHDocMasterDto.TbldDocMasterCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHDocMasterDto.HDocMaster_Code == null || this.TblHDocMasterDto.HDocMaster_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'document Code Cannot Be Null' });
      return false;
    }

    if (this.TblHDocMasterDto.HDocMaster_Name == null || this.TblHDocMasterDto.HDocMaster_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'document Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHDocMasterDto.TbldDocMasterCo = this.TblHDocMasterDto.TbldDocMasterCo.filter(
      row => row.DcDocMaster_SingleCo_Code && row.DcDocMaster_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.document, this.TblHDocMasterDto).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHDocMasterDto = new TblHDocMasterDto()
        this.TblHDocMasterDto.TbldDocMasterCo = [new TbldDocMasterCoDto()]
        this.router.navigate(['l-master/document']);


      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHDocMasterDto.HDocMaster_SysID || this.HDocMaster_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.document, this.TblHDocMasterDto.HDocMaster_SysID).then((res) => {
        this.TblHDocMasterDto = res
        this.showDeleteButton = true;

        if (this.TblHDocMasterDto.TbldDocMasterCo.length == 0) {
          this.TblHDocMasterDto.TbldDocMasterCo = [new TbldDocMasterCoDto()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHDocMasterDto = new TblHDocMasterDto()
          this.TblHDocMasterDto.TbldDocMasterCo = [new TbldDocMasterCoDto()]
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
        this.masterService.deleteData(apiUrl.area, this.TblHDocMasterDto.HDocMaster_SysID).then((res) => {

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
    this.TblHDocMasterDto = new TblHDocMasterDto()
    this.TblHDocMasterDto.TbldDocMasterCo = [new TbldDocMasterCoDto()]
    this.router.navigate(['l-master/document/']);

  }
  cancel() {
    this.TblHDocMasterDto = new TblHDocMasterDto()
    this.TblHDocMasterDto.TbldDocMasterCo = [new TbldDocMasterCoDto()]
    this.router.navigate(['l-master/document/']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayDocumentList() {
    this.ShowDocumentList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.document).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HDocMaster_Code || item.HDocMaster_Name || item.HDocMaster_SysID;
      const matchesQuery =
        (item.HDocMaster_Code || '').toLowerCase().includes(query) ||
        (item.HDocMaster_Name || '').toLowerCase().includes(query) ||
        item.HDocMaster_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.ShowDocumentList = false
    this.router.navigate(['l-master/document']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/document/' + rowData.HDocMaster_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.document, rowData.HDocMaster_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.ShowDocumentList = false

            this.getListData()
          }

        });
      }
    });
  }

}


