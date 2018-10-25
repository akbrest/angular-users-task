import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { UserService} from '../user.service';
import { User } from '../user';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserDetailDialogComponent]
})
export class UsersComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['name', 'username', 'email', 'phone', 'website', 'detail'];

  constructor(
    private userService: UserService,
    private userDetailDialog: UserDetailDialogComponent,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.getUsers();
    // workaround to don't get ExpressionChangedAfterItHasBeenCheckedError
    // link to issue https://github.com/angular/material2/issues/5268
    setTimeout(() => this.checkUrl());
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  checkUrl(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.openDialog(id);
    }
  }

  openDialog(id): void {
    this.userDetailDialog.openDialog(id);
  }
}
