import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblDocAttachDto } from 'src/app/_dto/tbldocattch.dto';
import { TblInspeDto } from 'src/app/_dto/tblInspe.dto';
import { TblQAQCDto } from 'src/app/_dto/tblqaqc.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qa-qc-details',
  templateUrl: './qa-qc-details.component.html',
  styleUrls: ['./qa-qc-details.component.scss']
})
export class QaQcDetailsComponent implements OnInit {

  @Input() dto: any;

  @Input() transactionApiUrl: any;

  sharedData: any;

  activeIndex: number = 0;

  activeState: boolean[] = [false, false, false];

  QaQcTab: any[] = [
    { title: "QA/QC Details", content: "Content for QA/QC Details" },
    { title: "Document Attachment", content: "Content forDocument Attachment" },

  ];

  TableData = [
    { header: 'SysID', hide: false, mandatory: false, width: '3rem', data: '12345', manual: false, bind: 'QCs_SysID', type: 'number', readOnly: false },
    { header: 'Accepted Qty', hide: false, mandatory: false, width: '6rem', data: '12345678', manual: false, bind: 'QCs_Accepted_Qty', type: 'number' },
    { header: 'Rejected Qty', hide: false, mandatory: false, width: '6rem', data: '12345678', manual: false, bind: 'QCs_Rejected_Qty', type: 'number' },
    { header: 'Total Qty', hide: false, mandatory: false, width: '6rem', data: '250000', manual: false, bind: 'QCs_Total_Qty', type: 'number' },
    { header: 'Reason For Rejection', hide: false, mandatory: false, width: '6rem', data: 'Reason A', manual: false, bind: 'QCs_Reject_Reason', type: 'text' },
    { header: 'Action Required', hide: false, mandatory: false, width: '6rem', data: 'Action A', manual: false, bind: 'QCs_Action_Required', type: 'text' },
    { header: 'NCR Number', hide: false, mandatory: false, width: '6rem', data: 'NCR001', manual: false, bind: 'QCs_Ncr_Number', type: 'text' },
    { header: 'NCR Date', hide: false, mandatory: false, width: '6rem', data: '2024-12-11', manual: false, bind: 'QCs_Ncr_Date', type: 'date' },
    { header: 'Action', hide: false, mandatory: false, width: '6rem', data: 'Action Taken A', manual: false, bind: 'QCs_Action_Taken', type: 'text' },
    { header: 'NCR Closing Date', hide: false, mandatory: false, width: '6rem', data: '2024-12-12', manual: false, bind: 'QCs_Ncr_Closing_Date', type: 'date' },
    { header: 'QAQC Inspection Completed Yn', hide: false, mandatory: false, width: '6rem', data: 'true', manual: false, bind: 'QCs_InspeCompl_Yn', type: 'text' },
    { header: 'Alert Date', hide: false, mandatory: false, width: '6rem', data: '2024-12-13', manual: false, bind: 'Qcs_Alert_Date', type: 'date' },
    { header: 'Employee Code', hide: false, mandatory: false, width: '6rem', data: 'ALERT001', manual: false, bind: 'Qcs_Emp_Code', type: 'text' },
    { header: 'Employee Name', hide: false, mandatory: false, width: '6rem', data: 'QA Team', manual: false, bind: 'Qcs_Emp_Name', type: 'text' },
    { header: 'Employee Mail', hide: false, mandatory: false, width: '6rem', data: 'true', manual: false, bind: 'Qcs_Emp_Email', type: 'text' },
    { header: 'Alert Code', hide: false, mandatory: false, width: '6rem', data: 'AL001', manual: false, bind: 'Qcs_Alert_Code', type: 'text' },
    { header: 'Alert Name', hide: false, mandatory: false, width: '6rem', data: 'Alert A', manual: false, bind: 'Qcs_Alert_Name', type: 'text' },
    { header: 'Alert Stop', hide: false, mandatory: false, width: '6rem', data: 'false', manual: false, bind: 'Qcs_Alert_Stop_Yn', type: 'text' }
  ];

  hideOrDisplayFields = [

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'QAs_SysID',
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
      HDataField_Name: 'QAs_SlNo',
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
      HDataField_Name: 'QAs_Prod_Code',
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
      HDataField_Name: 'QAs_Prod_Name',
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
      HDataField_Name: 'QAs_Prod_LName',
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
      HDataField_Name: 'QAs_Unit',
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
      HDataField_Name: 'QAs_Qty',
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
      HDataField_Name: 'QAs_Rate',
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
      HDataField_Name: 'QAs_Gross_Amount',
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
      HDataField_Name: 'QAs_Discount',
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
      HDataField_Name: 'QAs_Net_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    // qa/qc details
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'VSsBRef_No',
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
      HDataField_Name: 'VSsBooking_Date',
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
      HDataField_Name: 'VSsFactory_Code',
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
      HDataField_Name: 'VSsFactory_Name',
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
      HDataField_Name: 'VSsPlant_Code',
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
      HDataField_Name: 'VSsPlant_Name',
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
      HDataField_Name: 'VSsPickup_Code',
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
      HDataField_Name: 'VSsPickup_Name',
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
      HDataField_Name: 'VSsPickup_Date',
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
      HDataField_Name: 'VSsBAgent_Code',
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
      HDataField_Name: 'VSsBAgent_Name',
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
      HDataField_Name: 'VSsLine_Code',
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
      HDataField_Name: 'VSsLine_Name',
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
      HDataField_Name: 'VSsLPort_Code',
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
      HDataField_Name: 'VSsLPort_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
  ]

  fieldSettings: any = {};




  constructor(
    private location: Location,
    // public dto: SalesService,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private _messageService: MessageService,
    private _masterService: MasterService,
    private confirmationService: ConfirmationService,
  ) {

  }

  async ngOnInit() {


    this.dto.headerData.tblInspe = [new TblInspeDto()]
    if(this.dto.headerData.tblQaQC?.length){
      this.loadData('',0)
    }
    // this.funcAddRowD()
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

  onTabChange(event) {
    if (event.index == 0) {
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

  loadData(rowData, i) {
    const selectedWhM = this.dto.headerData.tblQaQC[i];

    if (!selectedWhM) return;

    this.dto.headerData.tblInspe.forEach((detail) => {
      detail.QCs_SysID = selectedWhM.QAs_SysID || 0;
      detail.QCsS_SysID = selectedWhM.QAsS_SysID || 0;

      detail.QCs_Prod_SysID = selectedWhM.QAs_Prod_SysID || 0;
      detail.QCs_Prod_Code = selectedWhM.QAs_Prod_Code || null;
      detail.QCs_Prod_Name = selectedWhM.QAs_Prod_Name || null;
      detail.QCs_Prod_LName = selectedWhM.QAs_Prod_LName || null;

      detail.QCs_Total_Qty = selectedWhM.QAs_Qty || 0;

    });

    console.log(this.dto.headerData.tblInspe);
  }


  funcAddRowD() {

    if (this.dto.headerData.tblInspe.length < 4) {
      const number = 4 - this.dto.headerData.tblInspe.length
      for (let index = 0; index < number; index++) {
        this.dto.headerData.tblInspe.push(new TblInspeDto());
      }
    }
  }



  deleteRow(table: any, index: number, rowData) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        if (table === 'tblInspe') {
          this._masterService.deleteData(apiUrl.salesEnquiry, `inspection-detail?where[QCs_SysID]=${rowData.QCs_SysID}&where[QCsS_SysID]=${rowData.QCsS_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Row Deleted', detail: res.message });
              this.dto.headerData.tblInspe.splice(index, 1);
              if (this.dto.headerData.tblInspe.length === 0) {
                this.addRow('tblInspe', -1);
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

    if (table == 'tblInspe') {
      const newRow = new TblInspeDto()
      this.dto.headerData.tblInspe.splice(index + 1, 0, newRow);
    }

  }
}
