import { Model } from '../model/model';
import { PrintTransaction } from '../print-transaction/print-transaction';
import { User } from '../user/user';
import { PrintRate } from '../print-rate/print-rate';
import { PaperSize } from '../paper-size/paper-size';
import { PrintQuality } from '../print-quality/print-quality';

export interface PrinterCurrentSession{
  user: User;
  start_time: Date;
  sales: Number;
  print_rates: PrintRate[];
  paper_sizes: PaperSize[];
  print_qualities: PrintQuality[];
}

export class Printer extends Model {
  description: string;

  transactions?: PrintTransaction[] = [];

  current_session: PrinterCurrentSession = null;

  set_session_user_id: string = null;
  unset_session_user_id: string = null;
  user_password: string = null;
}
