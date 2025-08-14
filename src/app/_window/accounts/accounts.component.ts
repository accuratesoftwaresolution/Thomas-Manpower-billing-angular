import { BranchSelectionService } from '@accurate/branch-selection';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IacDto } from 'src/app/_dto/iac.dto';
import { Iac4Dto } from 'src/app/_dto/iac4.dto';
import { AccountsService } from 'src/app/_providers/accounts.service';
/*
    Created By    : Arun Joy
    Created On    : 23-01-2020
    Created For   : For accounts lov (resubale component).
*/

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accountsList:Iac4Dto[]=[];
  selectedAccount: Iac4Dto;
  accountsCols: {field:string, header:string, width:string}[]=[];

  constructor(
    private accountsService: AccountsService,
    private branchSelection: BranchSelectionService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {

    this.accountsCols = [
      { field: 'acCode', header: 'Ac Code', width: '10em' },
      { field: 'acName', header: 'Account Name',width: '10em' },
      { field: 'acCat', header: 'Ac Group', width: '10em' },
      { field: 'curCode', header: 'Cur.', width: '7em' }
  ];

    this.accountsService.getDetailAccountLovWithRights(this.branchSelection.iintValues.intCode).then((res)=>{
      this.accountsList= res;
    },(err)=>{
      // console.warn("===err in accounts lov", err);
    });
  }

  async onRowSelect(event){
    await this.iacDetail();
    this.ref.close(this.selectedAccount);
  }

  iacDetail(){
    this.selectedAccount["iac"]= new IacDto();
    this.selectedAccount.iac.acName=this.selectedAccount.acName;
  }


}
