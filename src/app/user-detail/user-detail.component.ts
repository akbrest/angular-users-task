import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../core/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() id: number;
  user: User;
  error: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.getUser(this.id);
  }

  getUser(id): void {
    this.userService.getUser(id)
      .subscribe(
        user => this.user = user,
        error => this.error = error);
  }
}
