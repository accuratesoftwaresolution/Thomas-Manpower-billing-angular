import {Component} from '@angular/core';
import {AppBreadcrumbService} from '@accurate/toolbar';

@Component({
    templateUrl: './emptydemo.component.html'
})
export class EmptyDemoComponent {

    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'Empty Page', routerLink: ['/pages/empty'] }
        ]);
    }
}
