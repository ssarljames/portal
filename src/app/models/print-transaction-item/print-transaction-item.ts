import { Model } from '../model/model';

export interface PrintTransactionItemInterface {
  size: number;
  quality: number;
  quantity: number;
  price: number;
  total: number;
}

export class PrintTransactionItem extends Model {
  size: number;
  quality: number;
  quantity: number = 1;
  price: number = 1.0;
  valid: boolean = false;


  constructor(){
    super();
  }

  get size_label(): string{
    return 'Short';
  }

  get quality_label(): string{
    return 'Standard';
  }

  get total(): number{
    return this.quantity * this.price;
  }
}


