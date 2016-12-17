import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { UsersComponent } from './Components/users/users.component'
import { TodosComponent } from './Components/todos/todos.component'
import { LoginComponent } from './Components/login/login.component'
import { FrontpageComponent } from './Components/frontpage/frontpage.component'


const appRoutes: Routes = [
    {
        path: 'frontpage',
        component: FrontpageComponent
    },
    {
        path: '',
        redirectTo: '/frontpage',
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'user/todos/:id',
        component: TodosComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }

];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);