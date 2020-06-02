import { Model } from '../model/model';
import { College } from '../college/college';
import { Program } from '../program/program';

export class Department extends Model{
    name: string;
    code: string;

    college_id: number;

    college: College;

    programs: Program[];
}
