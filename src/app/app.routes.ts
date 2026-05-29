import { Routes } from '@angular/router';
import { UserManagement } from './user/user-management/user-management';
import { UserForm } from './user/user-form/user-form';
import { authGuard } from './core/guards/auth-guard';
import { FilmDetailsComponent } from './film/film-details-component/film-details-component';

export const routes: Routes = [
    {
        path: 'home', 
        component: UserManagement
    }, {
        path: 'home/user-edition', 
        component: UserManagement,
    }, {
        path: 'home/user-edition/:id', 
        component: UserForm,
        canActivate: [authGuard],
    }, {
        path: 'films',
        component: FilmDetailsComponent
    }, {
        path: '**', 
        pathMatch: 'full', 
        redirectTo: 'home'
    }
];
