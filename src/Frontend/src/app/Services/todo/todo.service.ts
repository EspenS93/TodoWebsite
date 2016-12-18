import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Todo } from '../../Models/todo';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class TodoService {

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) { }

  getTodos(): Promise<Todo[]> {
    return this.http.get('/api/todo/getAll')
      .toPromise()
      .then(response => response.json() as Todo[])
      .catch(this.handleError);
  }

  getUsersTodos(id: string): Promise<Todo[]> {
    return this.http.get('/api/todo/users/' + id)
      .toPromise()
      .then(response => response.json() as Todo[])
      .catch(this.handleError);
  }

  getTodo(id: string): Promise<Todo> {
        return this.http.get('/api/todo/gettodo/'+id)
        .toPromise()
        .then(response => response.json()[0] as Todo)
        .catch(this.handleError);
    }

  addTodo(newTodo: Todo): Promise<Todo> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/todo', JSON.stringify(newTodo), { headers: headers })
      .toPromise()
      .then(response => response.json() as Todo)
      .catch(this.handleError);
  }

  deleteTodo(id: string): Promise<void> {
    return this.http.delete('/api/todo/' + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateTodo(todo: Todo): Promise<Todo> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/todo/' + todo.id, JSON.stringify(todo), { headers: headers })
      .toPromise()
      .then(response => response.json() as Todo)
      .catch(this.handleError);
  }

}
