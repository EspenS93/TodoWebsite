import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { UsersComponent } from './Components/users/users.component';
import { TodosComponent } from './Components/todos/todos.component';
import { LoginComponent } from './Components/login/login.component';
import { FrontpageComponent } from './Components/frontpage/frontpage.component';
import { UserService } from './Services/user/user.service';
import { TodoService } from './Services/todo/todo.service';
import { LoginService } from './Services/login/login.service';
import { UserTodosComponent } from './Components/user-todos/user-todos.component';
import { TodoDetailComponent } from './Components/todo-detail/todo-detail.component';
import { NewUserComponent } from './Components/new-user/new-user.component';
import { NewTodoComponent } from './Components/new-todo/new-todo.component';
import { UserDetailComponent } from './Components/user-detail/user-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TodosComponent,
    LoginComponent,
    FrontpageComponent,
    UserTodosComponent,
    TodoDetailComponent,
    NewUserComponent,
    NewTodoComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    UserService,
    TodoService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
