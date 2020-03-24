import { Model } from '../model/model';
import { StationUsageLog } from '../station-usage-log/station-usage-log';

interface ServiceTypes{
  key: string;
  value: string;
}

export class Station extends Model {
  description: string;

  current_session: StationUsageLog;
  previous_session: StationUsageLog;

  service_types: ServiceTypes[];

}
