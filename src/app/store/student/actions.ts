import { Action } from '@ngrx/store';
import { Student } from '../../models/student/student';

export enum StudentActionTypes{
  Add    = '[Student] Add',
  Update = '[Student] Update',
  Remove = '[Student] Remove',
  Load   = '[Student] Load'
}

export class StudentAction implements Action{
  type: string;
  payload: any;
}

export class StudentAddAction extends StudentAction{
  type = StudentActionTypes.Add;
  constructor(public payload: Student){
    super();
  }
}


export class StudentUpdateAction extends StudentAction{
  type = StudentActionTypes.Update;
  constructor(public payload: Student){
    super();
  }
}


export class StudentRemove extends StudentAction{
  type = StudentActionTypes.Remove;
  constructor(public payload: Student){
    super();
  }
}


export class StudentLoadAction extends StudentAction{
  type = StudentActionTypes.Load;
  constructor(public payload: Student[]){
    super();
  }
}
