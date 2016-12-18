import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Models/todo';
import { TodoService } from '../../Services/todo/todo.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {


  todo :Todo;
  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private location: Location,
  ) {

  } 
  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): void {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id'];
      this.todoService
        .getTodo(id)
        .then(todo => this.todo = todo );
    });
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.todoService.updateTodo(this.todo)
      .then(() => this.goBack());
  }

}
