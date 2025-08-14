import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblDocAttachDto } from 'src/app/_dto/tbldocattch.dto';
import { TblHSingleCoDto } from 'src/app/_dto/tblhsingleco.dto';
import { TblmDocAttach } from 'src/app/_dto/TblmDocAttach.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-single-company',
  templateUrl: './single-company.component.html',
  styleUrls: ['./single-company.component.scss']

})
export class SingleCompanyComponent implements OnInit {

  passwordInvalid: boolean = false;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;

  imageSrclogo: string | null = null;
  activeState: boolean[] = [false, false, false];
  activeIndex: number = 0;
  display: boolean = false;
  showSingleCoList: boolean = false;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  /////////////////////////////////////////////

  singleCoCreation: TblHSingleCoDto = new TblHSingleCoDto()


  tableIndex: any;
  areaMaster: any[] = []
  groupCoMaster: any[] = []
  SingleCo_Code: string;



  currentSkip: number = 0;
  take: number = 1;
  totalRecords: number = 0;
  disableNext: boolean = false;
  disablePrevious: boolean = true;
  updateData: boolean = false;

  scrollableTabs: any[] = [
    { id: 0, title: "Main", content: "", visible: true },
    { id: 1, title: "Document Attachment", content: "Content for Document Attachment", visible: true },
    { id: 2, title: "Preferance", content: "Content for Document Attachment", visible: true },

  ];
  area: any;
  city: any;
  country: any;
  accGroup: any;
  activateAndDeactivate: any;
  singleCoMaster: any;
  accountMaster: any;



  constructor(
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
    private _masterService: MasterService,
    private lookupService: LookupDialogService,
    private _messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,



  ) { }

  ngOnInit(): void {
    // this.singleCoCreation = new TblHSingleCoDto()
    this.singleCoCreation.TblmDocAttach = []


    // this.getLovMasters()

    this.route.paramMap.subscribe(async (param: ParamMap) => {
      if (param.get('id') && param.get('id')) {
        const idParam = param.get('id');
        this.singleCoCreation.SingleCo_SysID = idParam ? Number(idParam) : 0;
        this.getdata()
      }
      else {
        this.getdata()
      }

    });
    this.getLovData()
  }

  getLovData() {


    this._salesService.getMasterData(apiUrl.area).then((res) => {
      this.area = res
    })
    this._salesService.getMasterData(apiUrl.city).then((res) => {
      this.city = res
    })
    this._salesService.getMasterData(apiUrl.country).then((res) => {
      this.country = res
    })

    this._salesService.getMasterData(apiUrl.accGroup).then((res) => {
      this.accGroup = res
    })
    this._salesService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this._salesService.getMasterData(apiUrl.singleCoMaster).then((res) => {
      this.singleCoMaster = res
    })

    this._salesService.getMasterData(apiUrl.accountMaster).then((res) => {
      this.accountMaster = res
    })
  }




  // funcSearch() {
  //   this.edit()
  // }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.singleCoCreation.SingleCo_SysID) {
      this._masterService.getMasterDatabyId(apiUrl.singleCompany, this.singleCoCreation.SingleCo_SysID).then((res) => {
        this.singleCoCreation = res

        this.showDeleteButton = true;

        if (this.singleCoCreation.TblmDocAttach.length == 0) {
          this.singleCoCreation.TblmDocAttach = []

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.singleCoCreation = new TblHSingleCoDto()
          this.singleCoCreation.TblmDocAttach = []
        }
      })
    }
  }

  updateButtonStates() {
    this.disablePrevious = this.currentSkip === 0;
    this.disableNext = this.currentSkip + this.take >= this.totalRecords;
  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'AreaCode':
        this.popUpService.popUpData = this.area;
        break;
      case 'CityCode':
        this.popUpService.popUpData = this.city;
        break;
      case 'CountryCode':
        this.popUpService.popUpData = this.country;
        break;
      case 'AccGroupCode':
        this.popUpService.popUpData = this.accGroup;
        break;
      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activateAndDeactivate;
        break;
      case 'ProfitandLossCode':
        this.popUpService.popUpData = this.accountMaster;




      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {
    let Type = this.popUpService.selectedPopUp
    console.log(event);

    switch (Type) {


      case 'AccGroupCode':
        this.singleCoCreation.SingleCo_Group_Code = event.HAccGroup_Group_SysID
        this.singleCoCreation.SingleCo_Group_Name = event.HAccGroup_Group_Code
        this.singleCoCreation.SingleCo_Group_SysID = event.HAccGroup_Group_Name
        break;
      case 'ActAndDeactCode':
        this.singleCoCreation.SingleCo_AcDe_SysID = event.HActDeactive_SysID
        this.singleCoCreation.SingleCo_AcDe_Code = event.HActDeactive_Code
        this.singleCoCreation.SingleCo_AcDe_Name = event.HActDeactive_Name
        break;
      case 'AreaCode':
        this.singleCoCreation.SingleCo_Area_SysID = event.HAreaCode_SysID
        this.singleCoCreation.SingleCo_Area_Code = event.HAreaCode_Code
        this.singleCoCreation.SingleCo_Area_Name = event.HAreaCode_Name
        break;
      case 'CityCode':
        this.singleCoCreation.SingleCo_City_SysID = event.HCity_SysID
        this.singleCoCreation.SingleCo_City_Code = event.HCity_Code
        this.singleCoCreation.SingleCo_City_Name = event.HCity_Name
        break;
      case 'CountryCode':
        this.singleCoCreation.SingleCo_Count_SysID = event.HCountry_SysID
        this.singleCoCreation.SingleCo_Count_Code = event.HCountry_Code
        this.singleCoCreation.SingleCo_Count_Name = event.HCountry_Name
        break;
      case 'ProfitandLossCode':
        this.singleCoCreation.SingleCo_PnLAcc_SysID = event.HAccOne_SysID
        this.singleCoCreation.SingleCo_PnLAcc_Code = event.HAccOne_Code
        this.singleCoCreation.SingleCo_PnLAcc_Name = event.HAccOne_Name
        break;

      default:
        break;
    }

  }

  updateCheckbox(event: any) {
    this.singleCoCreation.SingleCo_AcDe_Yn = event.target.checked ? 'Y' : 'N';
  }

  async SaveSingleCoCreation() {
    // ✅ Validate Super User Password
    if (!this.singleCoCreation.SingleCo_SuperUserPswd || this.singleCoCreation.SingleCo_SuperUserPswd.trim() === '') {
      this.passwordInvalid = true;
      this._messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Super User Password is required'
      });
      return;
    } else {
      this.passwordInvalid = false;
    }

    // ✅ Validate SingleCo_Code
    if (!this.singleCoCreation.SingleCo_Code || this.singleCoCreation.SingleCo_Code.trim() === '') {
      this._messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Single Company Code is required'
      });
      return;
    }

    // ✅ Validate SingleCo_Name
    if (!this.singleCoCreation.SingleCo_Name || this.singleCoCreation.SingleCo_Name.trim() === '') {
      this._messageService.add({
        severity: 'warn',
        summary: 'Validation',
        detail: 'Single Company Name is required'
      });
      return;
    }

    // ✅ Continue Saving
    this.isSaving = true;
    this.progressValue = 0;

    const interval = setInterval(() => {
      this.progressValue += 10;
      if (this.progressValue >= 90) clearInterval(interval);
    }, 200);

    if (this.SingleCo_Code) {
      try {
        await this.UpdateSingleCoCreation();
        clearInterval(interval);
        this.progressValue = 100;

        this._messageService.add({
          severity: 'success',
          summary: 'Data Updated',
          detail: 'Data updated successfully'
        });

        setTimeout(() => {
          this.isSaving = false;
          this.progressValue = 0;
          this.router.navigate(['/common/single-company']);
        }, 800);
      } catch (err) {
        clearInterval(interval);
        this.isSaving = false;
        this.progressValue = 0;

        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message || 'Update failed'
        });
      }
    } else {
      this._masterService.saveMasterData(apiUrl.singleCompany, this.singleCoCreation).then((res) => {
        clearInterval(interval);
        this.progressValue = 100;

        console.log("res", res);
        this._messageService.add({
          severity: 'success',
          summary: 'Data Saved',
          detail: 'Data Saved Successfully'
        });

        this.singleCoCreation = new TblHSingleCoDto();
        this.singleCoCreation.TblmDocAttach = [new TblmDocAttach()];

        setTimeout(() => {
          this.isSaving = false;
          this.progressValue = 0;
          this.router.navigate(['/common/single-company']);
        }, 800);
      }, err => {
        clearInterval(interval);
        this.isSaving = false;
        this.progressValue = 0;

        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.message || 'Save failed'
        });
      });
    }
  }




  onPasswordChange(value: string) {
    this.singleCoCreation.SingleCo_SuperUserPswd = value;
    this.passwordInvalid = !value || value.trim() === '';
  }


  async UpdateSingleCoCreation() {

    if (!(await this.preSave())) {
      return;
    }

    this._masterService.updateMasterData(apiUrl.singleCoMaster, this.singleCoCreation, this.SingleCo_Code).then((res) => {
      this._messageService.add({ severity: 'success', summary: 'Date Updated', detail: 'Data Updated Successfully' });
      this.singleCoCreation = new TblHSingleCoDto()
      this.router.navigate(['/common/single-company']);
    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })
  }

  async preSave(): Promise<boolean> {

    if (!this.singleCoCreation.SingleCo_Code || this.singleCoCreation.SingleCo_Code.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: "Single Company Code Cannot be Null" });
      return false;
    }
    if (!this.singleCoCreation.SingleCo_Name || this.singleCoCreation.SingleCo_Name.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: "Single Company Name Cannot be Null" });
      return false;
    }
    if (!this.singleCoCreation.SingleCo_SuperUserPswd || this.singleCoCreation.SingleCo_SuperUserPswd.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: "User Name Cannot be Null" });
      return false;
    }
    if (!this.singleCoCreation.SingleCo_SuperUserPswd || this.singleCoCreation.SingleCo_SuperUserPswd.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: "User Password Cannot be Null" });
      return false;
    }
    if (!this.singleCoCreation.SingleCo_Group_Code || this.singleCoCreation.SingleCo_Group_Code.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: "Single Company Group Code Cannot be Null" });
      return false;
    }
    if (!this.singleCoCreation.SingleCo_Group_Name || this.singleCoCreation.SingleCo_Group_Name.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: "Single Company Group Name Cannot be Null" });
      return false;
    }
    return true;
  }

  CancelSingleCoCreation() {
    this.singleCoCreation = new TblHSingleCoDto()
  }

  Add() {
    this.singleCoCreation = new TblHSingleCoDto();
    this.currentSkip = 0;
    this.disablePrevious = true;
    this.SingleCo_Code = null
    this.disableNext = true;
    this.router.navigate(['/common/single-company']);
  }



  changeIndex(i) {
    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i
  }



  onRadioChange(fieldName: string, value: string): void {
    if (this.singleCoCreation) {
      this.singleCoCreation[fieldName] = value;
      console.log(`Field '${fieldName}' changed to: ${value}`);
      // You can perform any additional logic here
    }
  }


  onRadioChangeaccount(fieldName: string, value: string): void {
    this.singleCoCreation[fieldName] = value;
    console.log(`${fieldName} changed to: ${value}`);
  }
  onRadioChangeFinancial(fieldName: string, value: string): void {
    this.singleCoCreation[fieldName] = value;
    console.log(`Changed ${fieldName} to: ${value}`);
  }

  SingleCo_Logo: ''




  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;
  imageSrc: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
      this.selectedFile = file;
    }
  }

  removeImage(): void {
    this.imageSrc = null;
    this.selectedFile = null;

    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  uploadLogo(): void {
    if (!this.selectedFile) {
      alert('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);


    this._masterService.saveImagelogo('companylogo', formData)
      .then(response => {
        console.log('Upload success:', response);
        alert('Image uploaded successfully.');
      })
      .catch(error => {
        console.error('Upload failed:', error);
        alert('Image upload failed.');
      });
  }



  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.singleCompany, this.singleCoCreation.SingleCo_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Refresh()
            this.router.navigate(['/common/single-company'])

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
    this.singleCoCreation = new TblHSingleCoDto()
    this.singleCoCreation.TblmDocAttach = []
    //  this.router.navigate(['payroll/payroll-designation-group/']);

  }


  displaySingleCoList() {
    this.showSingleCoList = true
    this.getListData()
  }

  onDateChange(field: string, value: any) {
    this.singleCoCreation[field] = value;
  }






  filterTable() {
    this.filteredfilteredlistData = this.listData.filter(item =>
      (item.SingleCo_Code || '').toLowerCase().includes(this.searchText.toLowerCase()) ||
      (item.SingleCo_Name || '').toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.SingleCo_SysID.toString().includes(this.searchText)
    );
  }

  getListData() {
    this._masterService.getMasterData(apiUrl.singleCompany).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  editRow(rowData: any) {
    this.router.navigate(['common/single-company/' + rowData.SingleCo_SysID]);
    this.showSingleCoList = false
  }

  viewRow(rowData: any) {
    console.log('Viewing:', rowData);
  }

  Back() {
    this.showSingleCoList = false
    this.router.navigate(['common/single-company']);


  }
  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.singleCompany, rowData.SingleCo_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showSingleCoList = false

            this.getListData()
          }

        });
      }
    });
  }



}





