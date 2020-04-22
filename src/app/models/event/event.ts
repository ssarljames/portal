import { Model } from '../model/model';
import { User } from '../user/user';

export class Event extends Model{
    name: string;
    description: string;
    type: number;
    user_id: string;
    start_date: Date;
    end_date: Date;
    
    user: User;

}
