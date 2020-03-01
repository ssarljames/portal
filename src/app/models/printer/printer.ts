import { Model } from '../model/model';
import { PrintTransaction } from '../print-transaction/print-transaction';
import { User } from '../user/user';

export interface PrinterCurrentSession{
  user: User;
  start_time: Date;
  sales: Number;
}
export class Printer extends Model {
  description: string;

  transactions?: PrintTransaction[] = [];

  current_session: PrinterCurrentSession = null;

  set_session_user_id: string = null;
  unset_session_user_id: string = null;
}
