import { PaperSize } from '../paper-size/paper-size';
import { PrintQuality } from '../print-quality/print-quality';
import { Model } from '../model/model';

export class ServiceRate extends Model {

  type: number;
  paper_size_id: string;
  print_quality_id: string;

  rate: number;

  paper_size: PaperSize;
  print_quality: PrintQuality;

  get type_label(): string{
    return this.type == 1 ? 'Print' : 'Scan';
  }

  get is_printing(): boolean{
    return this.type == 1;
  }

  get is_scanning(): boolean{
    return this.type == 2;
  }
}
