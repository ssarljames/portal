import { Station } from "../../models/station/station";
import { StationAction, StationActionTypes } from "./actions";



export function StationReducer(state: Station[] = [], action: StationAction): Station[]{
  switch(action.type){
    case StationActionTypes.Add:
        return [...state, action.payload];

    case StationActionTypes.Update:
        return state.map(user => {
          if(user.id === action.payload.id)
            return action.payload;
          return user;
        })

    case StationActionTypes.Remove:
        return state.filter(user => user.id === action.payload.id);

    case StationActionTypes.Load:
        return action.payload;

    default: return state;
  }
}
