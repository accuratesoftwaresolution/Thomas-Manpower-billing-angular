import { AuthService, LangaugeTranslateService } from '@accurate/providers';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    dashboardVisible: boolean = false;

    topbarTheme: string = 'blue';

    menuTheme: string = 'light';

    layoutMode: string = 'light';

    menuMode: string = 'static';

    inlineMenuPosition: string = 'bottom';

    inputStyle: string = 'filled';

    ripple: boolean = true;

    isRTL: boolean = false;

    user: string = 'User';

    idleState = 'Not started.';

    timedOut = false;

    lastPing?: Date = null;

    title = 'angular-idle-timeout';

    displaySessionTimeOut: boolean = false;

    constructor(
        private idle: Idle,
        private router: Router,
        private keepalive: Keepalive,
        private primengConfig: PrimeNGConfig,
        private lan: LangaugeTranslateService,
        private authenticationService: AuthService
    ) {
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(environment.timeOutLimit);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(environment.timeOutCountLimit);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => {
            this.idleState = 'No longer idle.'
            this.reset();
        });

        idle.onTimeout.subscribe(() => {
            // this.childModal.hide();
            this.displaySessionTimeOut = false;
            this.idleState = 'Timed out!';
            this.timedOut = true;
            this.logout();
            this.router.navigate(['/']);
        });

        idle.onIdleStart.subscribe(() => {
            this.idleState = 'You\'ve gone idle!'
            // this.childModal.show();
            this.displaySessionTimeOut = true;
        });

        idle.onTimeoutWarning.subscribe((countdown) => {
            this.idleState = 'You will time out in ' + countdown + ' seconds!'
        });

        // sets the ping interval to 15 seconds
        keepalive.interval(15);

        keepalive.onPing.subscribe(() => {
            this.lastPing = new Date(); this.idleState = 'No longer idle.';
        });

        this.authenticationService.currentUser.subscribe(userLoggedIn => {
            if (userLoggedIn) {
                idle.watch();
                this.timedOut = false;
            } else {
                idle.stop();
            }
        })
    }

    async ngOnInit() {
        // now setted default langugae as english , we can take from db if need
        await this.lan.init("en");
        this.primengConfig.ripple = true;
        this.logOutAllTabListener()
    }

    async logOutAllTabListener() {
        window.addEventListener('storage', (event) => {
            if (event.storageArea == localStorage) {
                let token = localStorage.getItem("authtoken");
                if (!token) {
                    this.router.navigate(['/auth/login']);
                } else {
                    if (this.router.url == "/auth/login")
                        this.router.navigate(['/']);
                }
            }
        });
    }

    /* *********************** START METHODS OF IDEAL TIME OUT ********************* */

    reset() {
        this.idle.watch();
        // this.idleState = 'Started.';
        this.timedOut = false;
    }

    hideChildModal(): void {
        this.displaySessionTimeOut = false;
    }

    stay() {
        this.displaySessionTimeOut = false;
        this.reset();
    }

    async logout() {
        try {
            await this.authenticationService.userLogout();
        } catch (ex) { }
        finally {
            this.displaySessionTimeOut = false;
            await this.authenticationService.logOut();
            this.router.navigate(['/']);
        }
    }

    /* *********************** END METHODS OF IDEAL TIME OUT ********************* */
}
