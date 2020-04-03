import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';

export const getUsers = createAction('[User] Get Users');

export const getUsersFail = createAction(
  '[User] Get Users Fail',
  props<{ error: string }>()
);

export const addUserStart = createAction(
  '[User] Add User Start',
  props<User>()
);

export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ success: string }>()
);

export const addUserFail = createAction(
  '[User] Add User Fail',
  props<{ error: string }>()
);

export const editUserStart = createAction(
  '[User] Edit User Start',
  props<{ id: number; user: User }>()
);

export const editUserSuccess = createAction(
  '[User] Edit User Success',
  props<{ success: string }>()
);

export const editUserFail = createAction(
  '[User] Edit User Fail',
  props<{ error: string }>()
);
