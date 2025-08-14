import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MasterService } from 'src/app/_providers/master.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-productgroup-list',
  templateUrl: './productgroup-list.component.html',
  styleUrls: ['./productgroup-list.component.scss']
})
export class ProductgroupListComponent implements OnInit {
listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];


  constructor(
    public masterService: MasterService,
    private router: Router,
    private _messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

ngOnInit(): void {
  this.getData()
}

filterTable() {
  this.filteredfilteredlistData = this.listData.filter(item =>
    item.HProdGroup_Code.toLowerCase().includes(this.searchText.toLowerCase()) ||
    item.HProdGroup_Short_Name.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

getData() {
  this.masterService.getMasterData(apiUrl.profitCenter).then((res) => {
    this.listData = res
    this.filterTable()
  })
}

editRow(rowData: any) {
  this.router.navigate(['l-master/product-group/' + rowData.HProdGroup_SysID]);
}

deleteRow(rowData: any,index: number) {

  this.confirmationService.confirm({
    message: 'Are you sure you want to delete?',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.masterService.deleteData(apiUrl.profitCenter, rowData.HProdGroup_SysID).then((res) => {

        if (res.success == false) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

        } else {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
           this.getData()
        }

      });
    }
  });
}

viewRow(rowData: any) {
  console.log('Viewing:', rowData);
}
Back(){
   this.router.navigate(['l-master/product-group/'] );
}


}
