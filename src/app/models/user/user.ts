import { Model } from '../model/model';

export class User extends Model {

  public username: string;
  public password: string;

  public firstname?: string;
  public lastname?: string;

  public token?: string;

  public reset_password?: boolean
}
