import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TransactionPageComponent } from './pages/transaction-page/transaction-page.component';


export const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: 'register',
                component: RegisterPageComponent
            },
            {
                path: 'login',
                component: LoginPageComponent
            }
        ]
    }
    ,
    {
        path: 'transactions',
        component: TransactionPageComponent
    }
];
