import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

 user :User;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
  ) {

  } 
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.userService.updateUser(this.user)
      .then(() => this.goBack());
  }

}
