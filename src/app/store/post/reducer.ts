import { Post } from "../../models/post/post";
import { PostAction, PostActionTypes } from "./actions";



export function PostReducer(state: Post[] = [], action: PostAction): Post[]{
  switch(action.type){
    case PostActionTypes.Add:
        return [...state, action.payload];

    case PostActionTypes.Update:
        
      if(state.find(project => project.id == action.payload.id))
        return state.map(project => {
          if(project.id === action.payload.id)
            return action.payload;
          return project;
        });
      else
        return [...state, action.payload];

    case PostActionTypes.Remove:
        return state.filter(user => user.id === action.payload.id);

    case PostActionTypes.Load:
        return action.payload;

    default: return state;
  }
}
