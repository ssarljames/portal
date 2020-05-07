import { ServiceTransaction } from "../../models/service-transaction/service-transaction";
import { ServiceTransactionAction, ServiceTransactionActionTypes } from "./actions";



export function ServiceTransactionReducer(state: ServiceTransaction[] = [], action: ServiceTransactionAction): ServiceTransaction[]{
  switch(action.type){
    case ServiceTransactionActionTypes.Add:
        return [...state, action.payload];

    case ServiceTransactionActionTypes.Update:
        return state.map(service_transaction => {
          if(service_transaction.id === action.payload.id)
            return action.payload;
          return service_transaction;
        })

    case ServiceTransactionActionTypes.Remove:
        return state.filter(service_transaction => service_transaction.id === action.payload.id);

    case ServiceTransactionActionTypes.Load:
        return action.payload;

    default: return state;
  }
}
