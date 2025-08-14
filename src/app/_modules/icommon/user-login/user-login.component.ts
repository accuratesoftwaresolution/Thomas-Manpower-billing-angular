import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  FormFields = [{
    fieldName: "User Name",
    type: "input",
    width: "50%" // You can change this width as needed
  },{
    fieldName: "Password",
    type: "input",
    width: "50%"
  },{
    fieldName: "",
    type: "",
    width: "100%"
  },{
    fieldName: "",
    type: "",
    width: "100%"
  },{
    fieldName: "Login Company Code",
    type: "input",
    width: "50%"
  },{
    fieldName: "Login Company Name",
    type: "input",
    width: "70%"
  },{
    fieldName: "Group Company Code",
    type: "input",
    width: "50%"
  },{
    fieldName: "Group Company Name",
    type: "input",
    width: "70%"
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
