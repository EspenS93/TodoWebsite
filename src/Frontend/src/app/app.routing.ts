import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component'
import { UsersComponent } from './Components/users/users.component'
import { TodosComponent } from './Components/todos/todos.component'
import { LoginComponent } from './Components/login/login.component'
import { FrontpageComponent } from './Components/frontpage/frontpage.component'
import { UserTodosComponent } from './Components/user-todos/user-todos.component';
import { TodoDetailComponent } from './Components/todo-detail/todo-detail.component';
import { UserDetailComponent } from './Components/user-detail/user-detail.component';
import { NewUserComponent } from './Components/new-user/new-user.component';
import { NewTodoComponent } from './Components/new-todo/new-todo.component';
import { AuthGuard } from './auth.guard'

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
        component: UsersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user/:id',
        component: UserTodosComponent
    },
    {
        path: 'user/detail/:id',
        component: UserDetailComponent
    },
    {
        path: 'todos',
        component: TodosComponent
    },
    {
        path: 'todo/:id',
        component: TodoDetailComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'newuser',
        component: NewUserComponent
    },
    {
        path: 'newtodo',
        component: NewTodoComponent
    }
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);