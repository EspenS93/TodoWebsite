import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TodoService } from '../../Services/todo/todo.service';
import { Todo } from '../../Models/todo';
@Component({
  selector: 'app-user-todos',
  templateUrl: './user-todos.component.html',
  styleUrls: ['./user-todos.component.css']
})
export class UserTodosComponent implements OnInit {

  selectedTodo: Todo;
  todos: Todo[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {
    this.route.params.forEach((params: Params) => {
      let id: string = params['id']
      this.todoService.getUsersTodos(id).then(todos => { this.todos = todos });
    });
  }

  ngOnInit() { }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
  }
  
  gotoDetail(): void {
    this.router.navigate(['/todo/', this.selectedTodo.id]);
  }

  deleteCharacterClass(todo: Todo): void {
    this.todoService
      .deleteTodo(todo.id)
      .then(() => {
        this.todos = this.todos.filter(h => h !== todo);
        if (this.selectedTodo === todo) { this.selectedTodo = null; }
      });
  }
}
