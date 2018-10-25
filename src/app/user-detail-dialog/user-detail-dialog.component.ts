import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})
export class UserDetailDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private router: Router) {}

  ngOnInit() {
  }

  openDialog(id): void {
    const dialogRef = this.dialog.open(UserDetailDialogComponent, {
      width: '550px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clearUrlParams();
    });
  }

  clearUrlParams(): void {
    const url: string = this.router.url.substring(0, this.router.url.indexOf('?'));
    this.router.navigateByUrl(url);
  }
}
