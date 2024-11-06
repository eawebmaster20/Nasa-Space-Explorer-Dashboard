import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';

export const routes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent, children: [
        { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    ]},
    { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    // { path: 'favorites', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
    { path: '**', redirectTo: '/auth', pathMatch: 'full' }
];
