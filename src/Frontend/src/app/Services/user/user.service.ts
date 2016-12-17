import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../../Models/user';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get('/api/user')
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUser(id: string): Promise<User> {
    return this.http.get('/api/user/' + id)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  addUser(newUser: User): Promise<User> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('/api/user', JSON.stringify(newUser), { headers: headers })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  deleteUser(id: string): Promise<void> {
    return this.http.delete('/api/user/' + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/user/' + user.id, JSON.stringify(user), { headers: headers })
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

}
