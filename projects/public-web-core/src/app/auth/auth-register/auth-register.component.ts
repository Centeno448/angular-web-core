import { ServerError } from './../../shared/server-error.model';
import { AuthRegisterModel } from './auth-register.model';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {
  model = new AuthRegisterModel('', '', '', '');

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
    }
  }

  checkPasswords(pass: NgModel, verify: NgModel) {
    if (pass.control.value !== verify.control.value) {
      verify.control.setErrors({ mustMatch: true });
    } else {
      verify.control.setErrors(null);
    }
  }
}
