import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../core/services/user.service';
import { USERS } from '../core/mock-users';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userService: UserService;
  let spy: jasmine.Spy;
  const mockUser = USERS[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatCardModule,
        MatListModule
      ],
      declarations: [ UserDetailComponent ],
      providers: [
        UserService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    spy = spyOn(userService, 'getUser').and.returnValue(Observable.of(mockUser));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService', () => {
    component.getUser(1);
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set user', () => {
    component.getUser(1);
    expect(component.user).toEqual(mockUser);
  });
});
