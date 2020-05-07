import { Event } from "../../models/event/event";
import { EventAction, EventActionTypes } from "./actions";



export function EventReducer(state: Event[] = [], action: EventAction): Event[]{
  switch(action.type){
    case EventActionTypes.Add:
        return [...state, action.payload];

    case EventActionTypes.Update:
        
      if(state.find(project => project.id == action.payload.id))
        return state.map(project => {
          if(project.id === action.payload.id)
            return action.payload;
          return project;
        });
      else
        return [...state, action.payload];

    case EventActionTypes.Remove:
        return state.filter(user => user.id === action.payload.id);

    case EventActionTypes.Load:
        return action.payload;

    default: return state;
  }
}
