import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldMenuCoDto } from 'src/app/_dto/TbldMenuCoDto.dto';
import { TblHMenu } from 'src/app/_dto/TblHMenu.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-menu-master',
  templateUrl: './menu-master.component.html',
  styleUrls: ['./menu-master.component.scss']
})
export class MenuMasterComponent implements OnInit {
  activatedeactivate: any

  singleCompany: any

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  menuList: boolean = false

  TblHMenu: TblHMenu = new TblHMenu()

  tableIndex: any;

  HMenu_SysID: any;

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
    this.TblHMenu.TbldMenuCo = [new TbldMenuCoDto()]


    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HMenu_SysID = Number(id);
        this.TblHMenu.HMenu_SysID = Number(id);
        this.getData()
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
        this.popUpService.popUpData = this.singleCompany
        break;
      case 'AccDirectExpCode':
        break;
        case 'ActAndDeactCode':
          this.popUpService.popUpData = this.activatedeactivate
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
        const isExist = this.TblHMenu.TbldMenuCo.some(item => item.DcMenu_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Menu Master' });
          return;
        }
        this.TblHMenu.TbldMenuCo[this.tableIndex].DcMenu_SingleCo_SysID = event.SingleCo_SysID

        this.TblHMenu.TbldMenuCo[this.tableIndex].DcMenu_SingleCo_Code = event.SingleCo_Code
        this.TblHMenu.TbldMenuCo[this.tableIndex].DcMenu_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHMenu.HMenu_AcDe_SysID = event.HActDeactive_SysID
        this.TblHMenu.HMenu_AcDe_Code = event.HActDeactive_Code
        this.TblHMenu.HMenu_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHMenu.HMenu_SysID && rowData.DcMenu_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.menuCode, `company?where[DcMenu_SysID]=${this.TblHMenu.TbldMenuCo[0].DcMenu_SysID}&where[DcMenu_SingleCo_SysID]=${rowData.DcMenu_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldMenuCo') {
                this.TblHMenu.TbldMenuCo.splice(index, 1);
                if (this.TblHMenu.TbldMenuCo.length === 0) {
                  this.addRow('TbldMenuCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldMenuCo') {
            this.TblHMenu.TbldMenuCo.splice(index, 1);
            if (this.TblHMenu.TbldMenuCo.length === 0) {
              this.addRow('TbldMenuCo', -1);
            }
          }
        }




      }
    });


  }

  addRow(table: any, index: number) {
    if (table == 'TbldMenuCo') {
      const newRow = new TbldMenuCoDto()
      this.TblHMenu.TbldMenuCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHMenu.HMenu_Code == null || this.TblHMenu.HMenu_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Menu Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHMenu.HMenu_Name == null || this.TblHMenu.HMenu_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Menu Master Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHMenu.TbldMenuCo = this.TblHMenu.TbldMenuCo.filter(
      row => row.DcMenu_SingleCo_Code && row.DcMenu_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.menuCode, this.TblHMenu).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHMenu = new TblHMenu()
        this.TblHMenu.TbldMenuCo = [new TbldMenuCoDto()]
        this.router.navigate(['l-master/menu-master']);



      }

    })
  }

  funcSearch() {
    this.getData()
  }


  getData() {
    if (this.TblHMenu.HMenu_SysID || this.HMenu_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.menuCode, this.TblHMenu.HMenu_SysID).then((res) => {
        this.TblHMenu = res
        this.showDeleteButton = true;

        if (this.TblHMenu.TbldMenuCo.length == 0) {
          this.TblHMenu.TbldMenuCo = [new TbldMenuCoDto()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHMenu = new TblHMenu()
          this.TblHMenu.TbldMenuCo = [new TbldMenuCoDto()]
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
        this.masterService.deleteData(apiUrl.menuCode, this.TblHMenu.HMenu_SysID).then((res) => {

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
    this.TblHMenu = new TblHMenu()
    this.TblHMenu.TbldMenuCo = [new TbldMenuCoDto()]
    this.router.navigate(['l-master/menu-master']);
  }

  cancel() {
    this.TblHMenu = new TblHMenu()
    this.TblHMenu.TbldMenuCo = [new TbldMenuCoDto()]
    this.router.navigate(['l-master/menu-master']);

  }

  //***************************************LIST********************************
  menumasterList() {
    this.menuList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.menuCode).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HMenu_Code || item.HAccModule_Short_Name || item.HAccModule_Long_Name || item.HMenu_SysID;
      const matchesQuery =
        (item.HMenu_Code || '').toLowerCase().includes(query) ||
        (item.HAccModule_Short_Name || '').toLowerCase().includes(query) ||
        (item.HAccModule_Long_Name || '').toLowerCase().includes(query) ||
        item.HMenu_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.menuList = false
    this.router.navigate(['l-master/menu-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/menu-master/' + rowData.HMenu_SysID]);
  }
  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.menuCode, rowData.HMenu_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.menuList = false

            this.getListData()
          }

        });
      }
    });
  }

  downloadTemplate() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      { "Menu Code": '', "Menu Name": '', "Activation & Deactivation Y/N": '', "Applicable Company Code": '', "Applicable Company Name": '' }
    ]);
    const workbook: XLSX.WorkBook = { Sheets: { 'Template': worksheet }, SheetNames: ['Template'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blobData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blobData, 'Menu_Template_Download.xlsx');
  }

  // Upload
  uploadTemplate(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) return;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

      if (jsonData.length > 0) {
        const headerRow = jsonData[0];

        // Map to Menu fields (assign directly to TblHMenu)
        // this.TblHMenu.HMenu_SysID = headerRow['Menu SysId'] || '';
        this.TblHMenu.HMenu_Code = headerRow['Menu Code'] || '';
        this.TblHMenu.HMenu_Name = headerRow['Menu Name'] || '';
        this.TblHMenu.HMenu_AcDe_Yn = (headerRow['Activation & Deactivation Y/N'] === 'Y') ? 'Y' : 'N';
        this.TblHMenu.HMenu_AcDe_Code = headerRow['Activation & Deactivation Code'] || '';
        this.TblHMenu.HMenu_AcDe_Name = headerRow['Activation & Deactivation Name'] || '';

        // Clear and populate applicableCo if there are more rows
        this.TblHMenu.TbldMenuCo = [];

        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          this.TblHMenu.TbldMenuCo.push({
            DcMenu_SingleCo_SysID: row['SysID'] || '',
            DcMenu_SingleCo_Code: row['Applicable Company Code'] || '',
            DcMenu_SingleCo_Name: row['Applicable Company Name'] || '',
            DcMenu_SysID: 0
          });
        }

        // Ensure at least one row exists
        if (this.TblHMenu.TbldMenuCo.length === 0) {
          this.TblHMenu.TbldMenuCo.push(new TbldMenuCoDto());
        }
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }
}

