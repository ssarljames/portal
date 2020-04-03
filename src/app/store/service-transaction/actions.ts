import { Action } from '@ngrx/store';
import { ServiceTransaction } from '../../models/service-transaction/service-transaction';

export enum ServiceTransactionActionTypes{
  Add    = '[ServiceTransaction] Add',
  Update = '[ServiceTransaction] Update',
  Remove = '[ServiceTransaction] Remove',
  Load   = '[ServiceTransaction] Load'
}

export class ServiceTransactionAction implements Action{
  type: string;
  payload: any;
}

export class ServiceTransactionAddAction extends ServiceTransactionAction{
  type = ServiceTransactionActionTypes.Add;
  constructor(public payload: ServiceTransaction){
    super();
  }
}


export class ServiceTransactionUpdateAction extends ServiceTransactionAction{
  type = ServiceTransactionActionTypes.Update;
  constructor(public payload: ServiceTransaction){
    super();
  }
}


export class ServiceTransactionRemove extends ServiceTransactionAction{
  type = ServiceTransactionActionTypes.Remove;
  constructor(public payload: ServiceTransaction){
    super();
  }
}


export class ServiceTransactionLoadAction extends ServiceTransactionAction{
  type = ServiceTransactionActionTypes.Load;
  constructor(public payload: ServiceTransaction[]){
    super();
  }
}
