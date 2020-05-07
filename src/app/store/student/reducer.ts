import { Student } from "../../models/student/student";
import { StudentAction, StudentActionTypes } from "./actions";



export function StudentReducer(state: Student[] = [], action: StudentAction): Student[]{
  switch(action.type){
    case StudentActionTypes.Add:
        return [...state, action.payload];

    case StudentActionTypes.Update:
        
      if(state.find(project => project.id == action.payload.id))
        return state.map(project => {
          if(project.id === action.payload.id)
            return action.payload;
          return project;
        });
      else
        return [...state, action.payload];

    case StudentActionTypes.Remove:
        return state.filter(user => user.id === action.payload.id);

    case StudentActionTypes.Load:
        return action.payload;

    default: return state;
  }
}
