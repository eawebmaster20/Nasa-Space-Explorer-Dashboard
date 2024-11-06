import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './shared/guard/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent, children: [
        { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    ]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard],
        children: [
            { path: '', loadComponent: () => import('./features/dashboard/home/home.component').then(m => m.HomeComponent) },
            { path: 'favorite', loadComponent: () => import('./features/dashboard/favorites/favorites.component').then(m => m.FavoritesComponent) },
            { path: 'mrp', loadComponent: () => import('./features/dashboard/mars-rover-photos/mars-rover-photos.component').then(m => m.MarsRoverPhotosComponent) },
        ]},
    { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];
