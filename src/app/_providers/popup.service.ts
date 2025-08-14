import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LookupDialogService {
  private dialogState = new BehaviorSubject<boolean>(false);
  private popupData = new BehaviorSubject<any>(null);
  private popupType = new BehaviorSubject<string>(''); 

  dialogState$ = this.dialogState.asObservable();
  popupData$ = this.popupData.asObservable();
  popupType$ = this.popupType.asObservable(); 

  openDialog(data: any, type: string) {
    this.popupData.next(data);
    this.popupType.next(type); 
    this.dialogState.next(true);
  }

  closeDialog() {
    this.dialogState.next(false);
  }
}
