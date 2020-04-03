import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { relative } from 'path';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  editedId: number;
  editUserForm: FormGroup;
  private userSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.editedId = +this.route.snapshot.paramMap.get('id');

    this.initForm();

    this.userSub = this.userService.user.subscribe((user) => {
      this.setFormValues(user);
    });

    this.userService.getUser(this.editedId);
  }

  onSubmit() {
    if (!this.editUserForm.valid) {
      return;
    }
    this.userService.updateUser(this.editedId, this.editUserForm.value);
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  initForm() {
    this.editUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),

      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  setFormValues(user: User) {
    this.editUserForm.patchValue({
      username: user.username,
      password: user.password,
      email: user.email,
    });
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
