import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../shared/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog) {}

  dataSource = [
    {
      id: 1,
      username: 'Valk408',
      email: 'valk@mail.com',
      password: 'ABCDa'
    },
    { id: 2, username: 'T0KK3N', email: 't0k3n@mail.com', password: '123' },
    { id: 3, username: 'JRDN', email: 'jrdn@mail.com', password: 'ABCasdD' },
    { id: 4, username: 'Colussus', email: 'col@mail.com', password: 'A123BCD' },
    { id: 5, username: 'BatReaper', email: 'bat@mail.com', password: 'ABf4CD' },
    { id: 6, username: 'SupAlt', email: 'sup@mail.com', password: 'AB13CD' },
    { id: 1, username: 'Valk408', email: 'valk@mail.com', password: 'ABCD' },
    { id: 2, username: 'T0KK3N', email: 't0k3n@mail.com', password: '123' },
    { id: 3, username: 'JRDN', email: 'jrdn@mail.com', password: 'ABCasdD' },
    { id: 4, username: 'Colussus', email: 'col@mail.com', password: 'A123BCD' },
    { id: 5, username: 'BatReaper', email: 'bat@mail.com', password: 'ABf4CD' },
    { id: 6, username: 'SupAlt', email: 'sup@mail.com', password: 'AB13CD' }
  ];

  displayedColumns = ['id', 'username', 'email', 'password', 'actions'];
  private dialogSub: Subscription;
  ngOnInit(): void {}

  deleteDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { type: 'Usuario', name }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: DELETE
        console.log('I WOULD HAVE DELETED');
      }
    });
  }

  ngOnDestroy() {
    if (this.dialogSub) {
      this.dialogSub.unsubscribe();
    }
  }
}
