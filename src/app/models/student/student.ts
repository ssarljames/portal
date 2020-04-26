import { Model } from '../model/model';
import { User } from '../user/user';

export class Student extends Model{
    id_number: string;
    firstname: string;
    lastname: string;
    middlename: string;


    user_id: string;
    created_by_user_id: string

    user: User;
    created_by_user: User;


    get fullname(): string{
        return `${this.lastname}, ${this.firstname} ${ this.middlename ? this.middlename[0] + '.' : '' }`;
    }
}
