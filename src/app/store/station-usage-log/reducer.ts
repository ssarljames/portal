import { StationUsageLog } from "../../models/station-usage-log/station-usage-log";
import { StationUsageLogAction, StationUsageLogActionTypes } from "./actions";



export function StationUsageLogReducer(state: StationUsageLog[] = [], action: StationUsageLogAction): StationUsageLog[]{
  switch(action.type){
    case StationUsageLogActionTypes.Add:
        return [...state, action.payload];

    case StationUsageLogActionTypes.Update:
        return state.map(user => {
          if(user.id === action.payload.id)
            return action.payload;
          return user;
        })

    case StationUsageLogActionTypes.Remove:
        return state.filter(user => user.id === action.payload.id);

    case StationUsageLogActionTypes.Load:
        return action.payload;

    default: return state;
  }
}
