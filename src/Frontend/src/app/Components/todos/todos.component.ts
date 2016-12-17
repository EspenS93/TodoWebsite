import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TodoService } from '../../Services/todo/todo.service';
import { Todo } from '../../Models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
selectedTodo: Todo;
  todos: Todo[];

  constructor(
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.getTodos();
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
  }

  getTodos(): void {
    this.todoService
      .getTodos()
      .then(todos => this.todos = todos);
  }
  gotoDetail(): void {
    this.router.navigate(['/todos/detail', this.selectedTodo.id]);
  }

  deleteTodo(todo: Todo): void {
    this.todoService
      .deleteTodo(todo.id)
      .then(() => {
        this.todos = this.todos.filter(h => h !== todo);
        if (this.selectedTodo === todo) { this.selectedTodo = null; }

      });
  }
}
