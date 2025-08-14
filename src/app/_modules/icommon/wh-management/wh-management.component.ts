import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblDocAttachDto } from 'src/app/_dto/tbldocattch.dto';
import { TblWhMDto } from 'src/app/_dto/tblwhm.dto';
import { TblWhMDetailDto } from 'src/app/_dto/tblwhmdetail.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-wh-management',
  templateUrl: './wh-management.component.html',
  styleUrls: ['./wh-management.component.scss']
})
export class WhManagementComponent implements OnInit {

  @Input() dto: any;

  @Input() transactionApiUrl: any;

  activeIndex: number = 0;

  activeState: boolean[] = [false, false, false];

  WhManagementTab: any[] = [
    { title: "Workhouse Management Details", content: "Content for Workhouse Management Details" },
    { title: "Document Attachment", content: "Content forDocument Attachment" },

  ];

  TableData = [
    { header: 'SysID', hide: false, mandatory: false, width: '3rem', data: '12345', manual: false, bind: 'StoS_SysID', type: 'number', readOnly: false },
    { header: 'Rack Code', hide: false, mandatory: false, width: '3rem', data: '12345', manual: false, bind: 'StoS_Rak_Code', type: 'text' },
    { header: 'Rack Name', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: 'StoS_Rak_Name', type: 'text' },
    { header: 'Batch Number', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: 'StoS_Batch_No', type: 'text' },
    { header: 'Number Of Qty Stored', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: 'StoS_Store_Qty', type: 'number' },
    { header: 'Pallet Dimension Code', hide: false, mandatory: false, width: '4rem', data: '123456', manual: false, bind: 'StoS_PalletDiam_Code', type: 'text' },
    { header: 'Pallet Dimension Name', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: 'StoS_PalletDiam_Name', type: 'text' },
    { header: 'Pallet length', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: 'StoS_PalletDiam_Length', type: 'text' },
    { header: 'Pallet Width', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: 'StoS_PalletDiam_Width', type: 'text' },
    { header: 'Pallet Hight', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: 'StoS_PalletDiam_Hight', type: 'text' },
    { header: 'Gross Weight', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: 'StoS_PalletGross_Weight', type: 'number' },
    { header: 'Net Weight', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: 'StoS_PalletNet_Weight', type: 'number' },
    { header: 'Item Dimension Code', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: 'StoS_ItemtDiam_Code', type: 'text' },
    { header: 'Item Dimension Name', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: 'StoS_ItemDiam_Name', type: 'text' },
    { header: 'Unit', hide: false, mandatory: false, width: '6rem', data: '12345678912345', manual: false, bind: 'StoS_Item_Unit', type: 'text' },
    { header: 'Item length', hide: false, mandatory: false, width: '6rem', data: '12345678912345', manual: true, bind: 'StoS_Item_Length', type: 'text' },
    { header: 'Item Width', hide: false, mandatory: false, width: '6rem', data: '12345678912345', manual: false, bind: 'StoS_Item_Width', type: 'text' },
    { header: 'Item Hight', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: 'StoS_Item_Hight', type: 'text' },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '6rem', data: 'RM001', manual: false, bind: 'StoS_Rem_Code', PopUp: true, type: 'text' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '8rem', data: 'General Shipping', manual: false, bind: 'StoS_Rem_Name', type: 'text' },
  ];

  documentTableData = [
    {
      documentCode: 'TR',
      documentName: 'Trade License',
      path: 'C:123',
      expiryDate: '2023-09-30',
      nextRenewalDate: '2024-09-30',
      alertDate: '2024-10-20',
      documentAlertByMail: 'Th@gmail.com',
      alertCode: '1001',
      alertName: 'Vessel Plan Change',
      alertStop: 'Closed',
    },
    {},
    {},
    {},

    // Add more entries as needed
  ];

  hideOrDisplayFields = [

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Whs_SysID',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Whs_Prod_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Whs_Prod_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Whs_Prod_LName',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Whs_Unit',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Whs_Qty',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // wh details
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_SysID',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Rak_SysID',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Rak_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Rak_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Batch_No',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Store_Qty',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_PalletDiam_SysID',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_PalletDiam_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_PalletDiam_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_PalletDiam_Length',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_PalletDiam_Width',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_PalletDiam_Hight',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_PalletGross_Weight',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_PalletNet_Weight',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_ItemtDiam_SysID',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_ItemtDiam_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_ItemDiam_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Item_Unit',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Item_Length',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Item_Width',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Item_Hight',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Rem_SysID',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Rem_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'StoS_Rem_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
  ]

  fieldSettings: any = {};

  constructor(
    private location: Location,
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private _messageService: MessageService,
    private _masterService: MasterService,
    private confirmationService: ConfirmationService,
  ) {

  }

  ngOnInit(): void {

    // this.funcAddRowD()
    this.dto.headerData.tblWhMDetail = [new TblWhMDetailDto()]
    if(this.dto.headerData.tblWhM?.length){
      this.loadData('rowData', 0)
    }

    this.filteredFields()
  }

  filteredFields() {
    this.hideOrDisplayFields.forEach((field) => {
      this.fieldSettings[field.HDataField_Name] = {
        mandatory: field.HFieldValue_Yn,
        hidden: field.HFieldHide_Yn,
        disabled: field.HFieldDisable_Yn,
        alertMessage: field.HField_Alert_Name,
      };
    });

    this.TableData.forEach((field) => {
      const itsName = field.bind;
      if (this.fieldSettings[itsName]) {
        // Check if a matching key exists in fieldSettings
        field.mandatory = this.fieldSettings[itsName].mandatory;
        field.hide = this.fieldSettings[itsName].hidden;
        field.readOnly = this.fieldSettings[itsName].disabled
      }
    });
  }
  goBack(): void {
    this.location.back();
  }

  onFileChange(event: any, rowData: any) {
    const file = event.target.files[0];
    if (file) {
      rowData.documentName = file.name;
      rowData.path = URL.createObjectURL(file);
    }
  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }
  changeIndex(i) {
    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i
  }


  //  load function for updating data in details table
  loadData(rowData, i) {
    const selectedWhM = this.dto.headerData.tblWhM[i];

    if (!selectedWhM) return;

    this.dto.headerData.tblWhMDetail.forEach((detail) => {
      detail.StoS_SysID = selectedWhM.Whs_SysID || 0;
      detail.StoSS_SysID = selectedWhM.WhsS_SysID || 0;

      detail.StoS_Prod_SysID = selectedWhM.Whs_Prod_SysID || 0;
      detail.StoS_Prod_Code = selectedWhM.Whs_Prod_Code || null;
      detail.StoS_Prod_Name = selectedWhM.Whs_Prod_Name || null;
      detail.StoS_Prod_LName = selectedWhM.Whs_Prod_LName || null;

      detail.StoS_Store_Qty = selectedWhM.Whs_Qty || 0;
      detail.StoS_Item_Unit = selectedWhM.Whs_Unit || null;

    });

    console.log(this.dto.headerData.tblWhMDetail);
  }


  // adding extra rows 
  funcAddRowD() {

    if (this.dto.headerData.tblWhMDetail.length < 4) {
      const number = 4 - this.dto.headerData.tblWhMDetail.length
      for (let index = 0; index < number; index++) {
        this.dto.headerData.tblWhMDetail.push(new TblWhMDetailDto());
      }
    }
  }



  deleteRow(table: any, index: number, rowData) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        if (table === 'tblWhMDetail') {
          this._masterService.deleteData(apiUrl.salesEnquiry, `warehouse-detail?where[StoS_SysID]=${rowData.StoS_SysID}&where[StoSS_SysID]=${rowData.StoSS_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Row Deleted', detail: res.message });
              this.dto.headerData.tblWhMDetail.splice(index, 1);
              if (this.dto.headerData.tblWhMDetail.length === 0) {
                this.addRow('tblWhMDetail', -1);
              }
            }
          }, err => {
            if (err.error.statusCode == 409) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            }
          });
        }
      }
    });

  }




  addRow(table: any, index: number) {

    if (table == 'tblWhMDetail') {
      const newRow = new TblWhMDetailDto()
      this.dto.headerData.tblWhMDetail.splice(index + 1, 0, newRow);
    }

  }

}
