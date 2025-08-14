import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldNarraMastCo } from 'src/app/_dto/masters/narration/TbldNarraMastCo.dto';
import { TblHNarraMast } from 'src/app/_dto/masters/narration/TblHNarraMast.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { apiUrl } from 'src/app/_resources/api-url.properties';



import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { MasterService } from 'src/app/_providers/master.service';

@Component({
  selector: 'app-narration',
  templateUrl: './narration.component.html',
  styleUrls: ['./narration.component.scss']
})
export class NarrationComponent implements OnInit {

  activatedeactivate:any;

  singleCompany: any;

  isSaving: boolean = false;

  progressValue: number = 0;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showNarrationList: boolean = false


  TblHNarraMast: TblHNarraMast = new TblHNarraMast()

  tableIndex: any;

  HNarraMast_SysID: any;

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
    this.TblHNarraMast.TbldNarraMastCo = [new TbldNarraMastCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HNarraMast_SysID = Number(id);
        this.TblHNarraMast.HNarraMast_SysID = Number(id);
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

        const selectedCode = event.code
        const isExist = this.TblHNarraMast.TbldNarraMastCo.some(item => item.DcNarraMast_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Narration Master' });
          return;
        }
        this.TblHNarraMast.TbldNarraMastCo[this.tableIndex].DcNarraMast_SingleCo_SysID = event.SingleCo_SysID
        this.TblHNarraMast.TbldNarraMastCo[this.tableIndex].DcNarraMast_SingleCo_Code = event.SingleCo_Code
        this.TblHNarraMast.TbldNarraMastCo[this.tableIndex].DcNarraMast_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHNarraMast.HNarraMast_AcDe_Code = event.HActDeactive_Code
        this.TblHNarraMast.HNarraMast_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHNarraMast.HNarraMast_SysID && rowData.DcNarraMast_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.narration, `company?where[DcNarraMast_SysID]=${this.TblHNarraMast.TbldNarraMastCo[0].DcNarraMast_SysID}&where[DcNarraMast_SingleCo_SysID]=${rowData.DcNarraMast_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldNarraMastCo') {
                this.TblHNarraMast.TbldNarraMastCo.splice(index, 1);
                if (this.TblHNarraMast.TbldNarraMastCo.length === 0) {
                  this.addRow('TbldNarraMastCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldNarraMastCo') {
            this.TblHNarraMast.TbldNarraMastCo.splice(index, 1);
            if (this.TblHNarraMast.TbldNarraMastCo.length === 0) {
              this.addRow('TbldNarraMastCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldNarraMastCo') {
      const newRow = new TbldNarraMastCo()
      this.TblHNarraMast.TbldNarraMastCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHNarraMast.HNarraMast_Code == null || this.TblHNarraMast.HNarraMast_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Narration Code Cannot Be Null' });
      return false;
    }

    if (this.TblHNarraMast.HNarraMast_Name == null || this.TblHNarraMast.HNarraMast_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Narration Name Cannot Be Null' });
      return false;
    }

     if (this.TblHNarraMast.TbldNarraMastCo[0].DcNarraMast_SingleCo_Code == null || this.TblHNarraMast.TbldNarraMastCo[0].DcNarraMast_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Narration Single Company Code Cannot Be Null' });
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
    this.TblHNarraMast.TbldNarraMastCo = this.TblHNarraMast.TbldNarraMastCo.filter(
      row => row.DcNarraMast_SingleCo_Code && row.DcNarraMast_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.narration, this.TblHNarraMast).then((res) => {
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
        this.TblHNarraMast = new TblHNarraMast();
        this.TblHNarraMast.TbldNarraMastCo = [new TbldNarraMastCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/narration/']);

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
    if (this.TblHNarraMast.HNarraMast_SysID || this.HNarraMast_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.narration, this.TblHNarraMast.HNarraMast_SysID).then((res) => {
        this.TblHNarraMast = res
        this.showDeleteButton = true;

        if (this.TblHNarraMast.TbldNarraMastCo.length == 0) {
          this.TblHNarraMast.TbldNarraMastCo = [new TbldNarraMastCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHNarraMast = new TblHNarraMast()
          this.TblHNarraMast.TbldNarraMastCo = [new TbldNarraMastCo()]
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
        this.masterService.deleteData(apiUrl.narration, this.TblHNarraMast.HNarraMast_SysID).then((res) => {

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
    this.TblHNarraMast = new TblHNarraMast()
    this.TblHNarraMast.TbldNarraMastCo = [new TbldNarraMastCo()]
    this.router.navigate(['l-master/narration/']);

  }
  cancel() {
    this.TblHNarraMast = new TblHNarraMast()
    this.TblHNarraMast.TbldNarraMastCo = [new TbldNarraMastCo()]
    this.router.navigate(['l-master/narration']);

  }

  //  Excel 

  downloadTemplate() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      { "Narration SysId": '', "Narration Code": '', "Narration Name": '' }
    ]);
    const workbook: XLSX.WorkBook = { Sheets: { 'Template': worksheet }, SheetNames: ['Template'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blobData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blobData, 'Narration_Template_Download.xlsx');
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

        // Map to narration fields
        this.TblHNarraMast[0].HNarraMast_SysID = headerRow['Narration SysId'];
        this.TblHNarraMast[0].HNarraMast_Code = headerRow['Narration Code'];
        this.TblHNarraMast[0].HNarraMast_Name = headerRow['Narration Name'];
        this.TblHNarraMast[0].HNarraMast_AcDe_Yn = headerRow['Activation & Deactivation Y/N'] === 'Y';
        this.TblHNarraMast[0].HNarraMast_AcDe_Code = headerRow['Activation & Deactivation Code'];
        this.TblHNarraMast[0].HNarraMast_AcDe_Name = headerRow['Activation & Deactivation Name'];

        // Clear and populate applicableCo if there are more rows
        this.TblHNarraMast.TbldNarraMastCo = [];

        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          this.TblHNarraMast.TbldNarraMastCo.push({
            DcNarraMast_SingleCo_SysID: row['SysID'],
            DcNarraMast_SingleCo_Code: row['Applicable Company Code'],
            DcNarraMast_SingleCo_Name: row['Applicable Company Name'],
            DcNarraMast_SysID: 0
          });
        }

        // Ensure at least one row exists
        if (this.TblHNarraMast.TbldNarraMastCo.length === 0) {
          this.TblHNarraMast.TbldNarraMastCo.push(new TbldNarraMastCo());
        }
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }


 // ---------------------------------------------------------------------List--------------------------
  displayNarrationList() {
    this.showNarrationList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.narration).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HNarraMast_Code || item.HNarraMast_Name || item.HNarraMast_SysID;
      const matchesQuery =
        (item.HNarraMast_Code || '').toLowerCase().includes(query) ||
        (item.HNarraMast_Name || '').toLowerCase().includes(query) ||
        item.HNarraMast_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showNarrationList = false
    this.router.navigate(['l-master/narration']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/narration/' + rowData.HNarraMast_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.narration, rowData.HNarraMast_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showNarrationList = false

            this.getListData()
          }

        });
      }
    });
  }


}