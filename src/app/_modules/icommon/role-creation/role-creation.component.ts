import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-creation',
  templateUrl: './role-creation.component.html',
  styleUrls: ['./role-creation.component.scss']
})
export class RoleCreationComponent implements OnInit {

  FormFields = [{
    fieldName:"User Name",
    type:"input"
  },{
    fieldName:"Password",
    type:"input"
  },{
    fieldName:"Login Company Code",
    type:"input"
  },{
    fieldName:"Login Company Name",
    type:"input"
  },{
    fieldName:"Group Company Code",
    type:"input"
  },{
    fieldName:"Group Company Name",
    type:"input"
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
