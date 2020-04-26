import { Model } from '../model/model';
import { User  } from '../user/user';

export class EventTimeLog extends Model{

    event_id: string;
    user_id: string;
    entry_by_user_id: string;
    time: Date;
    type: number;
    monitoring_group: string;


    user: User;
    entry_by_user: User;

    code: string;

    static get TYPES(): any[]{
        return [
                    {
                    value: 1,
                    label: 'Time In'
                    },
                    {
                    value: 2,
                    label: 'Time Out'
                    }
                ];
    }

    get computedTypeLabel(): string{

        return this.type == 1
                    ? 'Time In'
                    : 'Time Out'
    }

}