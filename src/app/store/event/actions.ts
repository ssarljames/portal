import { Action } from '@ngrx/store';
import { Event } from '../../models/event/event';

export enum EventActionTypes{
  Add    = '[Event] Add',
  Update = '[Event] Update',
  Remove = '[Event] Remove',
  Load   = '[Event] Load'
}

export class EventAction implements Action{
  type: string;
  payload: any;
}

export class EventAddAction extends EventAction{
  type = EventActionTypes.Add;
  constructor(public payload: Event){
    super();
  }
}


export class EventUpdateAction extends EventAction{
  type = EventActionTypes.Update;
  constructor(public payload: Event){
    super();
  }
}


export class EventRemove extends EventAction{
  type = EventActionTypes.Remove;
  constructor(public payload: Event){
    super();
  }
}


export class EventLoadAction extends EventAction{
  type = EventActionTypes.Load;
  constructor(public payload: Event[]){
    super();
  }
}
