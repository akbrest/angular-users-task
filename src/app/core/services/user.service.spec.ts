import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import 'rxjs-compat/add/observable/of';

import { UserService } from './user.service';
import { User } from '../user';
import { USERS } from '../mock-users';

describe('UserService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let userService: UserService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userService = new UserService(<any> httpClientSpy);
  });

  it('should return expected users (HttpClient called once)', () => {
    const expectedUsers: User[] = USERS;

    httpClientSpy.get.and.returnValue(Observable.of(expectedUsers));

    userService.getUsers().subscribe(
      users => expect(users).toEqual(expectedUsers, 'expected users'),
      error => fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected user (HttpClient called once)', () => {
    const expectedUser: User = USERS[0];

    httpClientSpy.get.and.returnValue(Observable.of(expectedUser));

    userService.getUser(1).subscribe(
      user => expect(user).toEqual(expectedUser, 'expected user'),
      error => fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
