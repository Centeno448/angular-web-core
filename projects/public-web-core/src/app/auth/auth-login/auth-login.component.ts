import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthLoginModel } from '../auth-login.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit, OnDestroy {
  model = new AuthLoginModel('', '');
  errorMessage: string = null;
  isLoading = false;

  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.errorMessage = authState.authError;
      this.isLoading = authState.isLoading;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(new AuthActions.LoginStart(form.value));
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
