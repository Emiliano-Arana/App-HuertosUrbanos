import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '',loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)},
    {path: 'users',loadChildren: () => import('./users/users.routes').then(m => m.USERS_ROUTES),
        canActivate:[authGuard]
    },
    {path: 'gardens',loadChildren: () => import('./gardens/gardens.routes').then(m => m.GARDENS_ROUTES),
        canActivate:[authGuard]
    }
];
