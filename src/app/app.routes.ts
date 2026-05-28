import { Routes } from '@angular/router';
import { UserManagement } from './user/user-management/user-management';
import { UserForm } from './user/user-form/user-form';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'home', 
        component: UserManagement
    }, {
        path: 'user/:id', 
        component: UserForm,
        canActivate: [authGuard],
    }, {
        path: '**', 
        pathMatch: 'full', 
        redirectTo: 'home'
    }
];
