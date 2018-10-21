import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { API } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const url = `${API}/users`;
    return this.http.get<User[]>(url);
  }

  getUser(id: number): Observable<User> {
    const url = `${API}/users/${id}`;
    return this.http.get<User>(url);
  }
}
