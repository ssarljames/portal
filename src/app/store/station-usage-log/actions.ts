import { Action } from '@ngrx/store';
import { StationUsageLog } from '../../models/station-usage-log/station-usage-log';

export enum StationUsageLogActionTypes{
  Add    = '[StationUsageLog] Add',
  Update = '[StationUsageLog] Update',
  Remove = '[StationUsageLog] Remove',
  Load   = '[StationUsageLog] Load'
}

export class StationUsageLogAction implements Action{
  type: string;
  payload: any;
}

export class StationUsageLogAddAction extends StationUsageLogAction{
  type = StationUsageLogActionTypes.Add;
  constructor(public payload: StationUsageLog){
    super();
  }
}


export class StationUsageLogUpdateAction extends StationUsageLogAction{
  type = StationUsageLogActionTypes.Update;
  constructor(public payload: StationUsageLog){
    super();
  }
}


export class StationUsageLogRemove extends StationUsageLogAction{
  type = StationUsageLogActionTypes.Remove;
  constructor(public payload: StationUsageLog){
    super();
  }
}


export class StationUsageLogLoadAction extends StationUsageLogAction{
  type = StationUsageLogActionTypes.Load;
  constructor(public payload: StationUsageLog[]){
    super();
  }
}
