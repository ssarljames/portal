import { Model } from '../model/model';
import { PrintTransactionItem } from '../print-transaction-item/print-transaction-item';

export class PrintTransaction extends Model {

  printer_id: string;
  user_id: string;
  member_id: string;
  sales: number;

  constructor(){
    super();
  }

  transaction_items?: PrintTransactionItem[];

  time: any;
}
