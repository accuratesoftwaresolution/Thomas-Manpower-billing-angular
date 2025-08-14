import { Component, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AppMainComponent } from './app.main.component';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/_providers/auth.service';
import { MenuService } from '@accurate/toolbar';
import { Router } from '@angular/router';
// import { AppComponent } from './app.component';

@Component({
    selector: 'app-inline-menu',
    templateUrl: './app.inlinemenu.component.html',
    animations: [
        trigger('menu', [
            state('hiddenAnimated', style({
                height: '0px',
                paddingBottom: '0px',
                overflow: 'hidden'
            })),
            state('visibleAnimated', style({
                height: '*',
                overflow: 'visible'
            })),
            state('visible', style({
                opacity: 1,
                'z-index': 100
            })),
            state('hidden', style({
                opacity: 0,
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('visible => hidden', animate('.1s linear')),
            transition('hidden => visible', [style({transform: 'scaleY(0.8)'}), animate('.12s cubic-bezier(0, 0, 0.2, 1)')])
        ])
    ]
})
export class AppInlineMenuComponent {

    @Input() key = "inline-menu";

    @Input() style: any;

    @Input() styleClass: string;

    active: boolean;

    userName: string;

    userInfo: any={userId:"",userName:"user"};

    constructor(public appMain: AppMainComponent, public app: AppComponent, public authService:AuthService,private router: Router,
        private menuService:MenuService) { 
        this.userName= this.app.user;
        // this.authService.getUserInfo().then((res)=>{
        //     this.userInfo=res;
        // },(err)=>{
        //     // console.warn("===err==",err);
        // }); 
        // Uncomment this when using API LOGIN
    }

    onClick(event) {
        this.appMain.onInlineMenuClick(event, this.key);
        event.preventDefault();
    }

    get isTooltipDisabled() {
        return !(this.appMain.isSlim() && !this.appMain.isMobile());
    }

    get tabIndex() {
        return !this.appMain.inlineMenuActive  ? '-1' : null;
    }

    isHorizontalActive() {
       return this.appMain.isHorizontal() && !this.appMain.isMobile();
    }

    changePassword(){
        this.menuService.changePasswordVisible=true;
    }

    createUser(){
        this.router.navigate(['/common/user-creation']);
    }
}
