import { ErrorTranslateService } from '@accurate/providers';
import { MenuService } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IuserDto } from 'src/app/_dto/iuser.dto';
import { AuthService } from 'src/app/_providers/auth.service';
// import { MenuService } from '../layout-components/app.menu.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  userPassword = { oldpass: '', pass: '', confpass: '' };
  selectedUser: IuserDto;

  constructor(
    public menuService:MenuService,
    private _authService: AuthService,
    private messageService:MessageService,
    private errorTranslateService: ErrorTranslateService,
  ) { }

    ngOnInit() {
    
    // await this._authService.getUserInfo().then((res) => {
    //   this.selectedUser.userId = res.userId;
    // });
  }

  getErrorMessage(code: string): string {
    return this.errorTranslateService.translate(code);
  }

  close() {
    this.menuService.changePasswordVisible = false;
  }
  
  async passwordPreSave(): Promise<boolean> {

    if (!this.userPassword.oldpass || this.userPassword.oldpass == "" || this.userPassword.oldpass.trim() == "") {
      this.messageService.add({ severity: 'info', summary: 'info', detail: this.getErrorMessage('currentPasswordNotNull') });
      return false;
    }

    if (!this.userPassword.pass || this.userPassword.pass == "" || this.userPassword.pass.trim() == "") {
      this.messageService.add({ severity: 'info', summary: 'info', detail: this.getErrorMessage('passwordNotNull') });
      return false;
    }
    if (!this.userPassword.confpass || this.userPassword.confpass == "" || this.userPassword.pass.trim() == "") {
      this.messageService.add({ severity: 'info', summary: 'info', detail: this.getErrorMessage('confpasswordNotNull') });
      return false;
    }
    if (this.userPassword.pass != this.userPassword.confpass) {
      this.messageService.add({ severity: 'info', summary: 'info', detail: this.getErrorMessage('passwordMismatch') });
      return false;
    }
    if (this.userPassword.oldpass == this.userPassword.pass) {
      this.messageService.add({ severity: 'info', summary: 'info', detail: this.getErrorMessage('passwordSame') });
      return false;
    }
    if (this.userPassword.pass && (this.userPassword.pass.length < 4)) {
      this.messageService.add({ severity: 'info', summary: 'info', detail: this.getErrorMessage('passNotLess') });
      return false;
    }
    if (this.userPassword.confpass && (this.userPassword.confpass.length < 4)) {
      this.messageService.add({ severity: 'info', summary: 'info', detail: this.getErrorMessage('confPassNotLess') });
      return false;
    }
    return true;
  }

  async changePassword() {
    if (!(await this.passwordPreSave())) {
      return;
    }
    await this._authService.changePassword({ currentPwd: this.userPassword.oldpass, pass: this.userPassword.pass }).then((res) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password Change Sucessfully' });
      setTimeout(() => {
         this.menuService.changePasswordVisible = false;
      }, 800);
      
    }, (err) => {
      // console.warn("--", err);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
    })
  }
}
