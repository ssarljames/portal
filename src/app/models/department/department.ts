import { Model } from '../model/model';
import { College } from '../college/college';

export class Department extends Model{
    name: string;
    code: string;

    college_id: number;

    college: College;
}
