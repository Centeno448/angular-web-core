import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog, private userService: UserService) {}

  dataSource: User[] = [];
  isLoadingResults: boolean;
  private userSub: Subscription;

  private userChangeSub: Subscription;

  displayedColumns = ['id', 'username', 'email', 'password', 'actions'];

  private dialogSub: Subscription;

  ngOnInit(): void {
    this.userSub = this.userService.users.subscribe(user => {
      this.dataSource = user;
      this.isLoadingResults = false;
    });

    this.userChangeSub = this.userService.usersUpdated.subscribe(changed => {
      if (changed) {
        this.userService.getAllUsers();
      }
    });

    this.isLoadingResults = true;

    this.userService.getAllUsers();
  }

  deleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { type: 'Usuario', name }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }

  getUsers() {
    this.userService.getAllUsers();
  }

  deleteUser(id: number) {
    this.isLoadingResults = true;
    this.userService.deleteUser(id);
  }

  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }

    if (this.userChangeSub) {
      this.userChangeSub.unsubscribe();
    }
  }
}
