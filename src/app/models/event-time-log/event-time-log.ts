import { Model } from '../model/model';
import { User  } from '../user/user';

export class EventTimeLog extends Model{

    event_id: string;
    user_id: string;
    entry_by_user_id: string;
    time: Date;
    type: string;
    monitoring_group: string;


    user: User;
    entry_by_user: User;
}
