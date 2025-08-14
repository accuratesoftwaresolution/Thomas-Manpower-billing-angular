import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblHTaxMasterDto } from 'src/app/_dto/masters/tblHTaxMaster.dto';
import { TbldFirstTaxCo } from 'src/app/_dto/TbldFirstTaxCo.dto';
import { TblHFirstTax } from 'src/app/_dto/TblHFirstTax.dto';
import { TblHTax } from 'src/app/_dto/TblHTax.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { LookupDialogService } from 'src/app/_providers/popup.service';

@Component({
  selector: 'app-tax-master',
  templateUrl: './tax-master.component.html',
  styleUrls: ['./tax-master.component.scss']
})
export class TaxMasterComponent implements OnInit {

  TblHFirstTax: TblHTax = new TblHTax();
  // TblDPurRateAgree: any[] = [new TblDPurRateAgree()];
  tableIndex: any;
  showDeleteButton: boolean = false;
  listData = []

  searchText: string = '';

  HFirstRateTax_SysID:any;
  filteredfilteredlistData = [...this.listData];

  showtaxmasterList: boolean = false


  constructor(

    public popUpService: CommonPopupService,
    private confirmationService: ConfirmationService,
    private activatedRoute: ActivatedRoute,

    private lookupService: LookupDialogService,
    private _masterService: MasterService,
    private _messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.TblHFirstTax.TbldFirstTaxCo.push(new TbldFirstTaxCo())
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HFirstRateTax_SysID = Number(id);
        this.TblHFirstTax.HFirstRateTax_SysID = Number(id);
        this.getdata()
      }
    });
  }

 getdata() {
    if (this.TblHFirstTax.HFirstRateTax_SysID || this.HFirstRateTax_SysID) {
      this._masterService.getMasterDatabyId(apiUrl.TaxMaster, this.TblHFirstTax.HFirstRateTax_SysID).then((res) => {
        this.TblHFirstTax = res
        this.showDeleteButton = true;

        if (this.TblHFirstTax.TbldFirstTaxCo.length == 0) {
          this.TblHFirstTax.TbldFirstTaxCo = [new TbldFirstTaxCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHFirstTax = new TblHTax()
          this.TblHFirstTax.TbldFirstTaxCo = [new TbldFirstTaxCo()]
        }
      })
    }
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
        const isExist = this.TblHFirstTax.TbldFirstTaxCo.some(item => item.DcFirstTax_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Tax Master Master' });
          return;
        }
        this.TblHFirstTax.TbldFirstTaxCo[this.tableIndex].DcFirstTax_SingleCo_SysID = event.sysId
        this.TblHFirstTax.TbldFirstTaxCo[this.tableIndex].DcFirstTax_SingleCo_Code = event.code
        this.TblHFirstTax.TbldFirstTaxCo[this.tableIndex].DcFirstTax_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHFirstTax.HFirstTax_AcDe_SysID = event.sysId
        this.TblHFirstTax.HFirstTax_AcDe_Code = event.code
        this.TblHFirstTax.HFirstTax_AcDe_Name = event.name
        break;
      case 'TaxGroup':
        this.TblHFirstTax.HFirstTaxGroup_SysID = event.HFirstTaxGroup_SysID
        this.TblHFirstTax.HFirstTaxGroup_Code = event.HFirstTaxGroup_Code
        this.TblHFirstTax.HFirstTaxGroup_Name = event.HFirstTaxGroup_Name
        break;

      default:
        break;
    }

  }

  deleteRow(table: any, index: number,rowData) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    
        
        if (this.TblHFirstTax.HFirstRateTax_SysID && rowData.DcFirstTax_SingleCo_SysID) {
          this._masterService.deleteData(apiUrl.TaxMaster, `company?where[DcFirstTax_SysID]=${this.TblHFirstTax.TbldFirstTaxCo[0].DcFirstTax_SysID}&where[DcFirstTax_SingleCo_SysID]=${rowData.DcFirstTax_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldFirstTaxCo') {
                this.TblHFirstTax.TbldFirstTaxCo.splice(index, 1);
                if (this.TblHFirstTax.TbldFirstTaxCo.length === 0) {
                  this.addRow('TbldFirstTaxCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldFirstTaxCo') {
            this.TblHFirstTax.TbldFirstTaxCo.splice(index, 1);
            if (this.TblHFirstTax.TbldFirstTaxCo.length === 0) {
              this.addRow('TbldFirstTaxCo', -1);
            }
          }
        }
      }
    });


  }


  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.TaxMaster, this.TblHFirstTax.HFirstRateTax_SysID).then((res) => {

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

Refresh(){
  this.TblHFirstTax = new TblHTax()
  this.TblHFirstTax.TbldFirstTaxCo = [new TbldFirstTaxCo()]
}




  ConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Only delete if user confirms
      }
    });
  }

  addRow(table: any, index: number) {
    if (table == 'TbldFirstTaxCo') {
      const newRow = new TbldFirstTaxCo()
      this.TblHFirstTax.TbldFirstTaxCo.splice(index + 1, 0, newRow);

    }
    // if (table == 'TblDPurRateAgree') {
    //   const newRow = new TblDPurRateAgree()
    //   this.TblDPurRateAgree.splice(index + 1, 0, newRow);

    // }
  }

  // routeTo(screen) {
  //   this.router.navigate([screen]);
  // }


  async savetaxMaster() {

    // if (!(await this.preSave())) {
    //   return;
    // }
    console.log(this.TblHFirstTax)
    // else {

    this._masterService.saveMasterData(apiUrl.TaxMaster, this.TblHFirstTax).then((res) => {
      console.log("res", res);
      this._messageService.add({ severity: 'success', summary: 'Date Saved', detail: 'Data Saved Successfully' });
      this.TblHFirstTax = new TblHTax()
      this.TblHFirstTax.TbldFirstTaxCo = [new TbldFirstTaxCo()]
      this.router.navigate(['/l-master/tax-master'])

    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })

    // }
  }



  taxMasterList() {
    this.showtaxmasterList = true
    this.getListData()
  }

  getListData() {
    this._masterService.getMasterData(apiUrl.TaxMaster).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HFirstRateTax_Code || item.HFirstRateTax_Name || item.HFirstRateTax_SysID;
      const matchesQuery =
        (item.HFirstRateTax_Code || '').toLowerCase().includes(query) ||
        (item.HFirstRateTax_Name || '').toLowerCase().includes(query) ||
        item.HFirstRateTax_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showtaxmasterList = false
    this.router.navigate(['l-master/tax-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/tax-master/' + rowData.HFirstRateTax_SysID]);
  }

  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.TaxMaster, rowData.HFirstRateTax_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showtaxmasterList = false

            this.getListData()
          }

        });
      }
    });
  }


}
