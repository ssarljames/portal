import { Model } from 'src/app/models/model/model';
import { PaperSize } from '../paper-size/paper-size';
import { PrintQuality } from '../print-quality/print-quality';
export class ServiceTransactionItem extends Model{
  service_transaction_id: string;
  type: number;
  paper_size_id: string;
  print_quality_id: string;
  quantity: number;
  price: number;
  total: number;

  paper_size: PaperSize;
  print_quality: PrintQuality;

  private _valid: boolean;

  constructor(){
    super();
    this.reset();
  }

  markAsValid(): void{
    this._valid = true;
  }

  get valid(): boolean{
    return this._valid;
  }

  get is_ready(): boolean{
    return (this.type == 1 && this.paper_size_id != null && this.print_quality_id != null) || this.type == 2;
  }

  reset(){
    this._valid = false;
    this.type = 1;
    this.paper_size_id = null;
    this.print_quality_id = null;
    this.quantity = 1;
    this.price = 0;
    this.total = 0;
  }

  get is_printing(): boolean{
    return this.type == 1;
  }

  get is_scanning(): boolean{
    return this.type == 2;
  }

  get type_label(): string{
    return this.type == 1 ? 'Print' : 'Scan';
  }

  get computed_total(): number{
    return this.quantity * this.price;
  }

}
