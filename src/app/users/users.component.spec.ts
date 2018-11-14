import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatTableModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersComponent } from './users.component';
import { UserService } from '../core/services/user.service';
import { USERS } from '../core/mock-users';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: UserService;
  let spy: jasmine.Spy;
  const mockUsers = USERS;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatTableModule,
        RouterTestingModule,
        MatDialogModule
      ],
      declarations: [ UsersComponent ],
      providers: [
        UserService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    spy = spyOn(userService, 'getUsers').and.returnValue(Observable.of(mockUsers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService', () => {
    component.getUsers();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should set users', () => {
    component.getUsers();
    expect(component.users).toEqual(mockUsers);
  });
});
