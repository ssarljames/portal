import { Model } from '../model/model';
import { Department } from '../department/department';

export class College extends Model{
    name: string;
    code: string;

    departments: Department[];
}
