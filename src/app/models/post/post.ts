import { Model } from './../model/model';
import { User } from './../user/user';

export class Post extends Model{

    user_id: string;

    title: string;
    content: string;
    valid_until: Date;
    type: number;

    user: User;
}
