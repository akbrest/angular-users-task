import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { User } from '../user';
import { API } from '../config';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const url = `${API}/users`;
    return this.http.get<User[]>(url)
      .pipe(
        retry(3),
        catchError(this.handleError)
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${API}/users/${id}`;
    return this.http.get<User>(url)
      .pipe(
        retry(3),
        catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
