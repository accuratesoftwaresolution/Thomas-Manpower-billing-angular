import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationDto } from 'src/app/_dto/authentication.dto';
import { TokenDto } from 'src/app/_dto/token.dto';
import { isArray } from 'util';
import { AuthService } from 'src/app/_providers/auth.service';
import { routePath } from 'src/app/_resources/route-path.properties';
import { MessageService } from 'primeng/api';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { SalesService } from 'src/app/_providers/sales.service';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';

/*
    Created By  : Arun Joy
    Created On  : 03-01-2020
    Created For : For handing the login of the appliaction.Also added the google social sign in
*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {  

  user: AuthenticationDto = new AuthenticationDto();
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  chooseCompany: boolean = true
  isLoading: boolean = true 
  btnLoading: boolean = false
  selectedCompany: any = null;

companies = [
    { SingleCo_SysID: 1, SingleCo_Code: "SC001", SingleCo_Name: "Company One", SingleCo_Group_SysID: 1, SingleCo_Group_Code: "GC001", SingleCo_Group_Name: "Group Name", Username: "Admin1", Password: "Admin1", CreatedAt: "2025-05-30", ExpiryDays: 365 },
    { SingleCo_SysID: 2, SingleCo_Code: "SC002", SingleCo_Name: "Company Two", SingleCo_Group_SysID: 1, SingleCo_Group_Code: "GC001", SingleCo_Group_Name: "Group Name", Username: "Admin2", Password: "Admin2", CreatedAt: "2025-05-30", ExpiryDays: 365 },
    { SingleCo_SysID: 3, SingleCo_Code: "SC003", SingleCo_Name: "Company Three", SingleCo_Group_SysID: 1, SingleCo_Group_Code: "GRP001", SingleCo_Group_Name: "Sample Group", Username: "Admin3", Password: "Admin3", CreatedAt: "2025-05-30", ExpiryDays: 365 },
    { SingleCo_SysID: 4, SingleCo_Code: "SC004", SingleCo_Name: "Company Four", SingleCo_Group_SysID: 2, SingleCo_Group_Code: "GC002", SingleCo_Group_Name: "Another Group", Username: "Admin4", Password: "Admin4", CreatedAt: "2025-05-30", ExpiryDays: 365 },
    { SingleCo_SysID: 5, SingleCo_Code: "SC005", SingleCo_Name: "Company Five", SingleCo_Group_SysID: 2, SingleCo_Group_Code: "GC002", SingleCo_Group_Name: "Another Group", Username: "Admin5", Password: "Admin5", CreatedAt: "2025-05-30", ExpiryDays: 365 },
    { SingleCo_SysID: 6, SingleCo_Code: "SC006", SingleCo_Name: "Company Six", SingleCo_Group_SysID: 3, SingleCo_Group_Code: "GC003", SingleCo_Group_Name: "Group Three", Username: "Admin6", Password: "Admin6", CreatedAt: "2025-05-30", ExpiryDays: 365 },
    { SingleCo_SysID: 7, SingleCo_Code: "SC007", SingleCo_Name: "Company Seven", SingleCo_Group_SysID: 3, SingleCo_Group_Code: "GC003", SingleCo_Group_Name: "Group Three", Username: "Admin7", Password: "Admin7", CreatedAt: "2025-05-30", ExpiryDays: 365 },
    { SingleCo_SysID: 8, SingleCo_Code: "SC008", SingleCo_Name: "Company Eight", SingleCo_Group_SysID: 3, SingleCo_Group_Code: "GC003", SingleCo_Group_Name: "Group Three", Username: "Admin8", Password: "Admin8", CreatedAt: "2025-05-30", ExpiryDays: 365 },
    { SingleCo_SysID: 9, SingleCo_Code: "SC009", SingleCo_Name: "Company Nine", SingleCo_Group_SysID: 4, SingleCo_Group_Code: "GC004", SingleCo_Group_Name: "New Group", Username: "user9", Password: "user9", CreatedAt: "2025-05-30", ExpiryDays: 10 },
    { SingleCo_SysID: 10,SingleCo_Code: "SC010", SingleCo_Name: "Company Ten", SingleCo_Group_SysID: 4, SingleCo_Group_Code: "GC004", SingleCo_Group_Name: "New Group", Username: "user10", Password: "user10", CreatedAt: "2025-05-30", ExpiryDays: 10 }
  ];


  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _messageService: MessageService,
    public _salesService: SalesService,
    public popUpService: CommonPopupService,

  ) { }

  ngOnInit() {

    // this.companies = []
    // this.getCompany()

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  get f() { return this.loginForm.controls; }

  // Login Using API

  // async onSubmit() {
  //   if (!(await this.preSave())) {
  //     return;
  //   }
  //   this.loading = true;
  //   this.submitted = true;
  //   this.user.username = this.user.username.toUpperCase();
  //   if (this.loginForm.invalid) {
  //     this.loading = false;
  //     return;
  //   }

  //   this.btnLoading = true
  //   this.service.signIn(this.user)
  //     .then(async (res: TokenDto) => {

  //       localStorage.setItem('authtoken', res.accessToken);
  //       localStorage.setItem('refreshtoken', res.refreshToken);
  //       // localStorage.setItem('user', this.user.username);
  //       // location.reload();
  //       this.router.navigate([routePath.dashboard]);

  //       this.user.password = '';
  //       this.error = '';
  //     }, (err) => {
  //       this.btnLoading = false
  //       localStorage.setItem('authtoken', '');
  //       localStorage.setItem('refreshtoken', '');
  //       localStorage.removeItem('authtoken');
  //       localStorage.removeItem('refreshtoken');
  //       localStorage.removeItem('media');

  //       if (err.status == 0) {
  //         this.error = "* Failed to load Database";
  //         this._messageService.add({ severity: 'error', summary: 'Error', detail: this.error });
  //       } else {
  //         if (isArray(err.error.message)) {
  //           const error = err.error.message[0].constraints;
  //           if (error.minLength)
  //             this.error = '* ' + error.minLength;
  //         } else {
  //           this.error = '* ' + err.error.message;
  //         }
  //         this._messageService.add({ severity: 'error', summary: 'Error', detail: this.error });
  //       }

  //     });

  //   this.loading = false;

  // }



  // Login Using Dummy Data
  async onSubmit() {
    if (!(await this.preSave())) {
      return;
    }

    this.loading = true;
    this.submitted = true;
    this.user.username = this.user.username.toUpperCase();

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    this.btnLoading = true;

    if (
      this.user.username !== this.selectedCompany.Username.toUpperCase() ||
      this.user.password !== this.selectedCompany.Password
    ) {
      this.error = 'Invalid Username Or Password For Selected Company';
      this._messageService.add({ severity: 'error', summary: 'Login Failed', detail: this.error });
      this.btnLoading = false;
      this.loading = false;
      return;
    }

    const matchedCompany = this.companies.find(
      company => company.Username.toUpperCase() === this.user.username && company.Password === this.user.password
    );

    if (!matchedCompany) {
      this.error = 'Invalid Username Or Password';
      this._messageService.add({ severity: 'error', summary: 'Login Failed', detail: this.error });
      this.btnLoading = false;
      this.loading = false;
      return;
    }

    // Expiry date logic
    const createdDate = new Date(matchedCompany.CreatedAt);
    const expiryDate = new Date(createdDate);
    expiryDate.setDate(createdDate.getDate() + matchedCompany.ExpiryDays);

    const now = new Date();
    if (now > expiryDate) {
      this.error = 'Your Trial Period Has Expired';
      this._messageService.add({ severity: 'error', summary: 'Expired', detail: this.error });
      this.btnLoading = false;
      this.loading = false;
      return;
    }

    // If login success
    setTimeout(() => {
      localStorage.setItem('authtoken', 'dummy-token');
      localStorage.setItem('user', this.user.username);

      this._messageService.add({ severity: 'success', summary: 'Login Successful', detail: 'Welcome to EuroCloud ERP!' });

      setTimeout(() => {
      this.router.navigate([routePath.dashboard]);
      }, 1000);

      this.user.password = '';
      this.error = '';
      this.btnLoading = false;
      this.loading = false;
    }, 1000); 

  }




  async preSave(): Promise<boolean> {

    if (!this.user.username || this.user.username.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: "User Name Not be Null" });
      return false;
    }
    if (!this.user.password || this.user.password.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: "Password Not be Null" });
      return false;
    }
    return true;
  }

  getCompany() {
    this.isLoading = true
    this._salesService.getMasterData(apiUrl.authCompanyLov).then((res) => {
      this.companies = res
      this.isLoading = false
    })
  }

  nextPreCheck(rowData, i) {
    console.log(rowData);
    this.selectedCompany = rowData
    this.user.coCode = rowData.SingleCo_Code
    this.chooseCompany = false
  }

  closePanel() {
    this.chooseCompany = true;
  }

  clearSelection() {
    this.user.coCode = null;
  }

  socialSignIn(media: string) {
    switch (media) {
      case 'G':
        this.service.googleSignIn();
        break;
      case 'F':
        break;
      default:
        console.warn("No such day exists!");
        break;
    }

  }
}
