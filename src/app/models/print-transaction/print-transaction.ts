import { Model } from '../model/model';
import { PrintTransactionItem } from '../print-transaction-item/print-transaction-item';
import { Member } from '../member/member';
import { User } from '../user/user';

export class PrintTransaction extends Model {

  printer_id: string;
  user_id: string;
  member_id: string;
  sales: number;
  time: any;

  member: Member;
  user: User;

  constructor(){
    super();
  }

  transaction_items?: PrintTransactionItem[];

  computeSales(): number{
    this.sales = 0;
    if(this.transaction_items)
      this.transaction_items.filter((pti) => pti.is_ready).forEach( pti => {
        this.sales += pti.total;
      });
    return this.sales;
  }

  get computedSales(): number{
    return this.computeSales();
  }

}
