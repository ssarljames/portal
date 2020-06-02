import { Model } from '../model/model';
import { Department } from '../department/department';

export class Program extends Model{
    name: string;
    code: string;
    no_of_years: number;

    department_id: number;

    student_count: number;

    department: Department;
}
