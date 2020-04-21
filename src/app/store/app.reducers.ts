import { UserReducer } from  './user/reducer';
import { StationReducer } from  './station/reducer';
import { StationUsageLogReducer } from  './station-usage-log/reducer';
import { ServiceTransactionReducer } from  './service-transaction/reducer';
import { PostReducer } from  './post/reducer';


export const AppReducers = {
  users: UserReducer,
  stations: StationReducer,
  station_usage_logs: StationUsageLogReducer,
  service_transactions: ServiceTransactionReducer,
  posts: PostReducer
}
