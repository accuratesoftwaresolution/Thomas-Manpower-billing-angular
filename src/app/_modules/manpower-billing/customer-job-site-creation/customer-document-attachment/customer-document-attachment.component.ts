import { Component, Input, OnInit } from '@angular/core';
import { TblDocAttachDto } from 'src/app/_dto/tbldocattch.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { FileUploadModule } from 'primeng/fileupload';

import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MasterService } from 'src/app/_providers/master.service';
import { HttpClient } from '@angular/common/http';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-customer-document-attachment',
  templateUrl: './customer-document-attachment.component.html',
  styleUrls: ['./customer-document-attachment.component.scss']
})
export class CustomerDocumentAttachmentComponent implements OnInit {

  isUploading = false;


  @Input() dto: any;

  @Input() gridNo: any;

  @Input() apiUrl: any;

  @Input() hideConfirmPopUp: boolean = false


  @Input() fieldSettings: any = {};

  hideOrDisplayFields = [
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HDoc_SysID',
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
      HDataField_Name: 'HDoc_Code',
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
      HDataField_Name: 'HDoc_Name',
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
      HDataField_Name: 'HDoc_Path',
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
      HDataField_Name: 'HDoc_Start_Date',
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
      HDataField_Name: 'HDoc_Stop_Date',
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
      HDataField_Name: 'HDoc_Expiry_Date',
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
      HDataField_Name: 'HDoc_Alert_Date',
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
      HDataField_Name: 'HDoc_Emp_Code',
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
      HDataField_Name: 'HDoc_Emp_Name',
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
      HDataField_Name: 'HDoc_Emp_Email',
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
      HDataField_Name: 'HDoc_Alert_Code',
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
      HDataField_Name: 'HDoc_Alert_Name',
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
      HDataField_Name: 'HDoc_Alert_Stop_Hrs',
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
      HDataField_Name: 'HDoc_Alert_Stop_Yn',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },



  ]


  documentTableData: TblDocAttachDto[] = [];

  tableIndex: any;

  fieldAlert: any[] = [];

  docCode: any[] = [];

  empDeptCode: any[] = [];

  selectedFiles: { [key: number]: File } = {};

  fileUploadData: any;


  constructor(
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private messageService: MessageService,
    public masterService: MasterService,
    private http: HttpClient,
    private confirmationService: ConfirmationService,




  ) { }

  ngOnInit(): void {

    console.log("length==", this.dto.length);
    
     if (this.dto?.length == 0) {
    this.addRow('dto', 0)
     }
    this.filteredFields()
    this.getAlert()
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
  }

  getAlert() {
    this._salesService.getMasterData(apiUrl.alertCode).then((res) => {
      this.fieldAlert = res
    })
    this._salesService.getMasterData(apiUrl.MiddleEmp).then((res) => {
      this.empDeptCode = res
    })
    this._salesService.getMasterData(apiUrl.MiddleDocument).then((res) => {
      this.docCode = res
    })
  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'DocDocumnetCode':
        this.popUpService.popUpData = this.docCode;
        break;
      case 'DocEmployeeCode':
        this.popUpService.popUpData = this.empDeptCode;
        break;
      case 'DocAlertCode':
        this.popUpService.popUpData = this.fieldAlert;
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

      case 'DocDocumnetCode':
        this.dto[this.tableIndex].HDoc_SysID = event.HDocMaster_SysID
        this.dto[this.tableIndex].HDoc_Code = event.HDocMaster_Code
        this.dto[this.tableIndex].HDoc_Name = event.HDocMaster_Name
        break;
      case 'DocEmployeeCode':
        this.dto[this.tableIndex].HDoc_Emp_SysID = event.HEmpl_SysID
        this.dto[this.tableIndex].HDoc_Emp_Code = event.HEmpl_Code
        this.dto[this.tableIndex].HDoc_Emp_Name = event.HEmpl_Name
        break;
      case 'DocAlertCode':
        this.dto[this.tableIndex].HDoc_Alert_SysID = event.HAlert_SysID
        this.dto[this.tableIndex].HDoc_Alert_Code = event.HAlert_Code
        this.dto[this.tableIndex].HDoc_Alert_Name = event.HAlert_Name
        break;


      default:
        break;
    }

  }



  onFileSelect(event: Event, rowData: any, rowIndex: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      rowData.HDoc_Path = file.name;
      rowData.fileSelected = true;
      rowData.isUploaded = false;
      this.selectedFiles[rowIndex] = file;
    }
  }



  // Add this to your component class

  uploadManually(rowIndex: number, rowData: any): void {
    if (this.isUploading) return; // Prevent double call
    this.isUploading = true;

    const file = this.selectedFiles?.[rowIndex];
    if (!file) {
      this.messageService.add({
        severity: 'warn',
        summary: 'No File',
        detail: 'Please choose a file first'
      });
      this.isUploading = false;
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const gridNumber = this.gridNo;

    this.masterService
      .saveMasterData(`${apiUrl.transactionDocumentUpload}/${gridNumber}`, formData)
      .then(res => {
        const fileName = res?.fileName ? res.fileName.replace(/\\/g, '/').split('/').pop() : '';

        if (fileName) {
          rowData.HDoc_Path = fileName;
          rowData.isUploaded = true;
          rowData.fileSelected = false;
          this.selectedFiles[rowIndex] = null;

          this.messageService.add({
            severity: 'success',
            summary: 'Uploaded',
            detail: `File "${fileName}" uploaded successfully`,
            life: 350
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Upload Failed',
            detail: 'No file name returned from server.'
          });
        }

        this.isUploading = false;
      })
      .catch(error => {
        console.error('Upload error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Upload Failed',
          detail: `Failed to upload file`
        });
        this.isUploading = false;
      });
  }



  viewFileFromApi(gridNo: number, fileName: string) {
    this.masterService.getTransFileFromApi(gridNo, fileName).then((blob) => {
      const fileURL = URL.createObjectURL(blob);

      window.open(fileURL, '_blank');

      setTimeout(() => URL.revokeObjectURL(fileURL), 10000);
    }).catch(err => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'File could not be loaded'
      });
      console.error(err);
    });
  }

  deleteFile(rowIndex: number, rowData: any): void {
    rowData.isUploaded = false;
    rowData.fileSelected = false;
    const gridNumber = this.gridNo;
    const fileName = rowData.HDoc_Path;

    if (!fileName) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No file selected to delete.'
      });
      return;
    }


    const encodedFileName = encodeURIComponent(fileName);

    this.masterService.deleteData(`${apiUrl.transactionDocumentUpload}/${gridNumber}`, encodedFileName)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: `File "${fileName}" deleted successfully`,
          life: 350
        });

        this.masterService.deleteData(this.apiUrl, `document?where[HDocS_SysID]=${rowData.HDocS_SysID}&where[HDoc_SysID]=${rowData.HDoc_SysID}&where[HDoc_GridNo]=${gridNumber}`).then((res) => {
        })

        rowData.HDoc_Path = '';
        rowData.isUploaded = false;
        this.selectedFiles[rowIndex] = null;
      })
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Delete Failed',
          detail: 'Could not delete the file.'
        });
        console.error('Delete error:', error);
      });
  }




  deleteRow(table: any, index: number, rowData) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          console.log("this is from doc");

        if (table === 'dto') {
          
          const gridNumber = this.gridNo;
          if (rowData.HDoc_Path) {
            this.masterService.deleteData(this.apiUrl, `document-detai?where[HDocS_SysID]=${rowData.HDocS_SysID}&where[HDoc_SysID]=${rowData.HDoc_SysID}&where[HDoc_GridNo]=${gridNumber}`).then((res) => {
            })
            this.deleteFile(index, rowData)
            this.dto.splice(index, 1);
            if (this.dto.length === 0) {
              this.addRow('dto', -1);
            }
          } else {
            this.dto.splice(index, 1);
            if (this.dto.length === 0) {
              this.addRow('dto', -1);
            }
          }
        }
      }
    })

  }

  addRow(table: any, index: number) {
    if (table == 'dto') {
      const newRow = new TblDocAttachDto()
      newRow.HDoc_GridNo = this.gridNo
      this.dto.splice(index + 1, 0, newRow);

    }
  }
  // ==================================================================

}