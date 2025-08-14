import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {


  @Input() toolBarData: {
    title: string;
    screen?: string;
    buttons: {
      label: string;
      functionName: string;
      class?: string;
      isHide?: boolean;
      isDisabled?: boolean;
    }[];} = { title: '',buttons: [],};

  constructor() { }

  ngOnInit(): void {
  }

  handleButtonClick(type: string, screen?: string): void {

    if (type === 'onAdd') {
      console.log('Add button clicked', screen);
    } 
    else if (type === 'onEdit') {
      console.log('Edit button clicked', screen);
    } 
    else if (type === 'onDelete') {
      console.log('Delete button clicked', screen);
    } 
    else if (type === 'onPrevious') {
      console.log('Previous button clicked', screen);
    } 
    else if (type === 'onNext') {
      console.log('Next button clicked', screen);
    } 
    else if (type === 'onList') {
      console.log('List button clicked', screen);
    } 
    else if (type === 'onPrint') {
      console.log('Print button clicked', screen);
    } 
    else if (type === 'onSuspend') {
      console.log('Suspend button clicked', screen);
    } 
    else if (type === 'onAuthorize') {
      console.log('Authorize button clicked', screen);
    } 
    else if (type === 'onReject') {
      console.log('Reject button clicked', screen);
    } 
    else {
      console.error('Unknown button type:', type);
    }
  }

  Check(screen){
    
  }
  

}
