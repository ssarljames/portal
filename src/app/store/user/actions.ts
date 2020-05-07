import { Action } from '@ngrx/store';
import { User } from '../../models/user/user';

export enum UserActionTypes{
  Add    = '[User] Add',
  Update = '[User] Update',
  Remove = '[User] Remove',
  Load   = '[User] Load'
}

export class UserAction implements Action{
  type: string;
  payload: any;
}

export class UserAddAction extends UserAction{
  type = UserActionTypes.Add;
  constructor(public payload: User){
    super();
  }
}


export class UserUpdateAction extends UserAction{
  type = UserActionTypes.Update;
  constructor(public payload: User){
    super();
  }
}


export class UserRemoveAction extends UserAction{
  type = UserActionTypes.Remove;
  constructor(public payload: User){
    super();
  }
}


export class UserLoadAction extends UserAction{
  type = UserActionTypes.Load;
  constructor(public payload: User[]){
    super();
  }
}
