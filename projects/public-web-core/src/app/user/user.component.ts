import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor() {}

  dataSource = [
    { id: 1, username: 'Valk408', email: 'valk@mail.com', password: 'ABCD' },
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

  displayedColumns = ['id', 'username', 'email', 'password'];

  ngOnInit(): void {}
}
