import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './_core/_guard/auth.guard';
import { AppGuard } from './_core/_guard/app.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', canActivate: [AuthGuard], canActivateChild: [AuthGuard], loadChildren: () => import('./_modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'auth', loadChildren: () => import('./_modules/auth/auth.module').then(m => m.AuthModule), canActivate: [AppGuard] },
            { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
        ], { scrollPositionRestoration: 'enabled' ,  preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export const appRoutingComponents = [];