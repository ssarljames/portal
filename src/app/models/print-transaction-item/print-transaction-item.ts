import { Model } from '../model/model';
import { PaperSize } from '../paper-size/paper-size';
import { PrintQuality } from '../print-quality/print-quality';

export class PrintTransactionItem extends Model {
  paper_size_id: string;
  print_quality_id: string;
  quantity: number = 1;
  price: number = 1.0;
  private _valid: boolean = false;


  paper_size: PaperSize;
  print_quality: PrintQuality;

  constructor(){
    super();
  }


  get total(): number{
    return this.quantity * this.price;
  }

  get is_ready(): boolean{
    return this._valid || (this.paper_size_id && this.print_quality_id && this.price > 0);
  }

  reset(): void{
    this.paper_size_id = null;
    this.print_quality_id = null;
    this.quantity = 1;
    this.price = 1.0;
    this._valid = false;
    this.paper_size = null;
    this.print_quality = null;
  }

  markAsValid(): void{
    this._valid = true;
  }

  get valid(): boolean{
    return this._valid;
  }
}


