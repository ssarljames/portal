import { Model } from '../model/model';
import { User } from '../user/user';
import { EventTimeLog } from '../event-time-log/event-time-log';

import * as parse from 'date-fns/parse';
import * as format from 'date-fns/format';
import * as is_same_year from 'date-fns/is_same_year';
import * as is_same_month from 'date-fns/is_same_month';

export class Event extends Model{
    name: string;
    description: string;
    type: number;
    user_id: string;

    start_date: Date;
    end_date: Date;
    
    include_weekends: boolean;

    user: User;

    time_logs: EventTimeLog[];

    get getTypeStr(): string{
        switch (this.type) {
            case 1: return 'Meeting/Assembly';
            case 2: return 'Activity';
            default: return 'Others';
        }
    }


    get event_date(): string{
        let dateStr = '';
        const d1 = parse(this.start_date);        

        if(this.end_date == null)
            dateStr = format(d1, 'MMM DD, YYYY');
            
        else{

            const d2 = parse(this.end_date);

            if(is_same_year(d1, d2)){
                if(is_same_month(d1, d2))
                    dateStr = format(d1, 'MMM DD - ') + format(d2, 'DD, YYYY');
                else
                    dateStr = format(d1, 'MMM DD - ') + format(d2, 'MMM DD, YYYY');
            }
            else
                dateStr = format(d1, 'MMM DD, YYYY - ') + format(d2, 'MMM DD, YYYY');
        }

        return dateStr;
    }

}
