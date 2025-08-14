import { Component, OnDestroy ,OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/_providers/auth.service';
import { AppBreadcrumbService, MenuService } from '@accurate/toolbar';
import { BreadcrumbService } from '@accurate/providers';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnDestroy {

    subscription: Subscription;

    items: MenuItem[];

    home: MenuItem;

    constructor(
        public breadcrumbService: BreadcrumbService,
        public authService: AuthService,
        public menu: MenuService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });

        
        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    ngOnInit(){

    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


    open(){
        console.log('menu==',this.menu);

    }
}
