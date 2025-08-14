import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}
const url = window.location.hostname;
if (environment.multiTenent && url && url != 'localhost') {
    let subdomain = '';
    let urlSplit = url.split('://');
    const webarddress = urlSplit.length > 1 ? urlSplit[1] : urlSplit[0];
    const domainNames = webarddress.split('.');
    domainNames.pop();
    domainNames.pop();
    subdomain = domainNames.join('.');

    // environment.apiUrl = `https://${subdomain}.api.accuratesoftware.online/API/V1`;
    // environment.apiUrlReport = `https://${subdomain}.api.accuratesoftware.online/API/V1`;
    
    environment.apiUrl = `https://api.euroclouderp.com/api/v1`;
    environment.apiUrlReport = `https://api.euroclouderp.com/api/v1`;
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
