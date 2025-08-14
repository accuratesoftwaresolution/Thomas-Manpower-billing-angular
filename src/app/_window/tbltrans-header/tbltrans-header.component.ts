import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TblHAccOneDto } from 'src/app/_dto/tblaccone.dto';
import { TblHBilledtoDto } from 'src/app/_dto/tblbilledto.dto';
import { TblHNarraMastDto } from 'src/app/_dto/tblnarrationmas.dto';
import { TblHProdModuleDto } from 'src/app/_dto/tblprodmodule.dto';
import { TblHSalAgreeDto } from 'src/app/_dto/tblsalesagree.dto';
import { TblHShippedtoDto } from 'src/app/_dto/tblshippedto.dto';
import { TblTransHeadDto } from 'src/app/_dto/tbltranshead.dto';
import { TblHVouTypeDto } from 'src/app/_dto/tblvouchertype.dto';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-tbltrans-header',
  templateUrl: './tbltrans-header.component.html',
  styleUrls: ['./tbltrans-header.component.scss']
})
export class TbltransHeaderComponent implements OnInit {

  // @Input() headerData: any

  // voucherSysId: string;

  // shippedTo: TblHShippedtoDto[] = [];

  // billedTo: TblHBilledtoDto[] = [];

  // narration: TblHNarraMastDto[] = [];

  // accOne: TblHAccOneDto[] = [];

  // voucherType: TblHVouTypeDto[] = [];

  // salesAgreement: TblHSalAgreeDto[] = []

  // prodModule: TblHProdModuleDto[] = [];

  // currencyLov: any = [];

  // paymentTerms: any = [];

  // incoTerms: any = [];
  
  // copyDocTemp: any;
  // customerDetails: any;

  // constructor(private lookupService: LookupDialogService,
  //   private router: Router,
  //   public salesservice: SalesService,
  //   private route: ActivatedRoute,

  // ) { }

  ngOnInit(): void {

  //   if (this.headerData.voucherSysId && this.headerData.voucherSysId != null && this.headerData.voucherSysId != undefined) {
  //     this.getSalesDataById()
  //   } else {
  //     this.getSalesData()
  //   }

  //   // this.getShippedTo()
  //   // this.getBilledTo()
  //   // this.getNarration()
  //   this.getAccOne()
  //   // this.getVoucherType()
  //   // this.getSalesAgree()
  //   // this.getProdModule()
  //   this.getCurrency()
  //   // this.getCopyDocTemp()

  }

  // ShowPopUp(Type) {

  //   switch (Type) {
  //     case 'ShippedTo':
  //       this.salesservice.popUpData = this.shippedTo;
  //       break;
  //     case 'BilledTo':
  //       this.salesservice.popUpData = this.billedTo;
  //       break;
  //     case 'NarrationCode':
  //       this.salesservice.popUpData = this.narration;
  //       break;
  //     case 'SalesAccount':
  //       this.salesservice.popUpData = this.accOne;
  //       break;
  //     case 'VocherType':
  //       this.salesservice.popUpData = this.voucherType;
  //       break;
  //     case 'SalesAgreementCode':
  //       this.salesservice.popUpData = this.salesAgreement;
  //       break;
  //     case 'ProductModuleCode':
  //       this.salesservice.popUpData = this.prodModule;
  //       break;
  //     case 'CurrencyCode':
  //       this.salesservice.popUpData = this.currencyLov;
  //       break;
  //     case 'CustomerCode':
  //       this.salesservice.popUpData = this.accOne;
  //       break;
  //     case 'CopyDocFromTemplateCode':
  //       this.salesservice.popUpData = this.copyDocTemp;
  //       break;
  //     case 'PaymentTerms':
  //       this.salesservice.popUpData = this.paymentTerms;
  //       break;
  //     case 'IncoTerms':
  //       this.salesservice.popUpData = this.incoTerms;
  //       break;
  //     default:
  //       break;
  //   }
  //   this.salesservice.selectedPopUp = Type

  //   this.lookupService.openDialog(Type, Type);
  // }

  // routeTo(screen) {

  //   if (screen == 'VesselBooking') {
  //     this.router.navigate(['/common/vessel-booking']);
  //   }
  //   else if (screen == 'QA/QC') {
  //     this.router.navigate(['/common/qa-qc']);
  //   }
  //   else if (screen == 'ApplicableDates') {
  //     this.router.navigate(['/common/applicable-dates']);
  //   }
  //   else if (screen == 'WHManagement') {
  //     this.router.navigate(['/common/wh-management']);
  //   }
  //   else {
  //     this.router.navigate([screen]);
  //   }
    
  // }

  // getSalesData() {
  //   this.salesservice.getMasterData(apiUrl.finance).then((res) => {
  //   })
  // }

  // getSalesDataById() {
  //   this.salesservice.getMasterDatabyId(apiUrl.finance, this.headerData.voucherSysId).then((res) => {
  //     this.salesservice.headerData = res
  //   })
  // }

  // getShippedTo() {
  //   this.salesservice.getMasterData(apiUrl.shippedTo).then((res) => {
  //     this.shippedTo = res
  //   })
  // }

  // getBilledTo() {
  //   this.salesservice.getMasterData(apiUrl.billedTo).then((res) => {
  //     this.billedTo = res
  //   })
  // }

  // getNarration() {
  //   this.salesservice.getMasterData(apiUrl.narration).then((res) => {
  //     this.narration = res
  //   })
  // }
  // getAccOne() {
  //   this.salesservice.getMasterData(apiUrl.accountOne).then((res) => {
  //     this.accOne = res.data
  //   })
  // }
  // getVoucherType() {
  //   this.salesservice.getMasterData(apiUrl.voucherType).then((res) => {
  //     this.voucherType = res
  //   })
  // }

  // getSalesAgree() {
  //   this.salesservice.getMasterData(apiUrl.salAgree).then((res) => {
  //     this.salesAgreement = res
  //   })
  // }

  // getProdModule() {
  //   this.salesservice.getMasterData(apiUrl.prodModule).then((res) => {
  //     this.prodModule = res
  //   })
  // }
  // getCurrency() {
  //   this.salesservice.getMasterData(apiUrl.currency).then((res) => {
  //     this.currencyLov = res.data
  //   })
  // }
  // getCopyDocTemp() {
  //   this.salesservice.getMasterData(apiUrl.copyDocTemp).then((res) => {
  //     this.copyDocTemp = res
  //   })
  // }
  // getPaymentTerms() {
  //   this.salesservice.getMasterData(apiUrl.paymentTerms).then((res) => {
  //     this.paymentTerms = res
  //   })
  // }
  // getIncoTerms() {
  //   this.salesservice.getMasterData(apiUrl.incoTerms).then((res) => {
  //     this.incoTerms = res
  //   })
  // }
  // Save() {

  //   if (this.headerData.screen) {
  //     // if (this.headerData.voucherSysId && this.headerData.voucherSysId != null && this.headerData.voucherSysId != undefined) {

  //     //   if (this.headerData.screen == 'SalesInvoice') {
  //     //     this.salesservice.Save(this.salesservice.headerData).then((res) => {
  //     //       console.log(res);
  //     //     })
  //     //   }

  //     // }
  //     // else {
  //     if (this.headerData.screen == 'SalesInvoice') {
  //       console.log("header data ===", this.salesservice.headerData);
  //       this.salesservice.headerData.tblTransDetail = this.salesservice.headerData.tblTransDetail.filter(element => {
  //         return element !== null && Object.keys(element).length !== 0;
  //       });
  //       this.salesservice.Save(this.salesservice.headerData).then((res) => {
  //         window.alert('Data Saved Successfully')
  //       }, err => {
  //         window.alert('Error Occured ')
  //       })
  //     }

  //     // }



  //   }
  // }

}
