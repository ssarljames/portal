import { Model } from '../model/model';
import { PrintTransaction } from '../print-transaction/print-transaction';

export class Printer extends Model {
  description: string;

  transactions?: PrintTransaction[] = [];
}
