import { Model } from '../model/model';

export class College extends Model{
    name: string;
    code: string;

    departments: any[];
}
