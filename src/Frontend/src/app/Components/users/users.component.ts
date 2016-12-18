import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../Services/user/user.service';
import { User } from '../../Models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  selectedUser: User;
  users: User[];

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.userService
      .getUsers()
      .then(users => this.users = users);
  }
  gotoTodos(): void {
    this.router.navigate(['/user/', this.selectedUser.id]);
  }

  deleteUser(user: User): void {
    this.userService
      .deleteUser(user.id)
      .then(() => {
        this.users = this.users.filter(h => h !== user);
        if (this.selectedUser === user) { this.selectedUser = null; }

      });
  }
}
