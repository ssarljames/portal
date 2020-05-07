import { User } from "../../models/user/user";
import { UserAction, UserActionTypes } from "./actions";



export function UserReducer(state: User[] = [], action: UserAction): User[]{
  switch(action.type){
    case UserActionTypes.Add:
        return [...state, action.payload];

    case UserActionTypes.Update:

      if(state.find(user => user.id == action.payload.id))
        return state.map(user => {
          if(user.id === action.payload.id)
            return action.payload;
          return user;
        });
      else
        return [...state, action.payload];

    case UserActionTypes.Remove:
        return state.filter(user => user.id === action.payload.id);

    case UserActionTypes.Load:
        return action.payload;

    default: return state;
  }
}
