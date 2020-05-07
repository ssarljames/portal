import { Action } from '@ngrx/store';
import { Station } from '../../models/station/station';

export enum StationActionTypes{
  Add    = '[Station] Add',
  Update = '[Station] Update',
  Remove = '[Station] Remove',
  Load   = '[Station] Load'
}

export class StationAction implements Action{
  type: string;
  payload: any;
}

export class StationAddAction extends StationAction{
  type = StationActionTypes.Add;
  constructor(public payload: Station){
    super();
  }
}


export class StationUpdateAction extends StationAction{
  type = StationActionTypes.Update;
  constructor(public payload: Station){
    super();
  }
}


export class StationRemove extends StationAction{
  type = StationActionTypes.Remove;
  constructor(public payload: Station){
    super();
  }
}


export class StationLoadAction extends StationAction{
  type = StationActionTypes.Load;
  constructor(public payload: Station[]){
    super();
  }
}
