import { Model } from '../model/model';
import { PrintTransactionItem } from '../print-transaction-item/print-transaction-item';

export class PrintTransaction extends Model {

  printer_id: string;
  user_id: string;
  member_id: string;
  sales: number;
  time: any;

  constructor(){
    super();
  }

  transaction_items?: PrintTransactionItem[];

  computeSales(){
    this.sales = 0;
    if(this.transaction_items)
      this.transaction_items.filter((pti) => pti.is_ready).forEach( pti => {
        this.sales += pti.total;
      })
  }

}
