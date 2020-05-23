import { Model } from '../model/model';
import { User } from '../user/user';
import { Program } from '../program/program';

export class Student extends Model{
    id_number: string;
    firstname: string;
    lastname: string;
    middlename: string;


    user_id: string;
    created_by_user_id: string

    user: User;
    created_by_user: User;

    program_id: string;
    year_level: number;
    current_address: string;
    home_address: string;

    program: Program;


    get fullname(): string{
        return `${this.lastname}, ${this.firstname} ${ this.middlename ? this.middlename[0] + '.' : '' }`;
    }
}
