import { User } from 'src/app/models/user/user';
import { Model } from './../model/model';

export class StationUsageLog extends Model{
  station_id: string;
  user_id: string;
  time_in: Date;
  time_out: Date;
  force_logged_out: boolean;
  total_time: number;
  total_sales: number;

  total_time_formatted: string;

  user: User;
}
