import { Component, OnInit } from '@angular/core';
import { AuthLoginModel } from './auth.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  model = new AuthLoginModel('', '');

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(this.model);
    }
  }
}
