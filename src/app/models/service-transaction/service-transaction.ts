import { Model } from 'src/app/models/model/model';
import { User } from '../user/user';
import { Member } from '../member/member';
import { ServiceTransactionItem } from '../service-transaction-item/service-transaction-item';
export class ServiceTransaction extends Model{

  station_id: string;
  user_id: string;
  member_id: string;
  sales: number;
  time: Date;

  remarks: string;

  timeFormatted: string;

  user: User;
  member: Member;

  transaction_items: ServiceTransactionItem[];

  public constructor(){
    super();
    this.sales = 0;
  }

  public computeSales(): void{
    if(this.transaction_items){
      this.sales = 0;
      this.transaction_items.forEach((item: ServiceTransactionItem) => {
        this.sales += item.total;
      })
    }
  }
}
