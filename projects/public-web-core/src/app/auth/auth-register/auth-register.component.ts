import { Subscription } from 'rxjs';
import { AuthRegisterModel } from './auth-register.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit, OnDestroy {
  model = new AuthRegisterModel('', '', '', '', '');
  errorMessage = null;
  isLoading = false;

  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      (this.isLoading = authState.isLoading),
        (this.errorMessage = authState.authError);
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(new AuthActions.RegisterStart(form.value));
    }
  }

  checkPasswords(pass: NgModel, verify: NgModel) {
    if (pass.control.value !== verify.control.value) {
      verify.control.setErrors({ mustMatch: true });
    } else {
      verify.control.setErrors(null);
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
