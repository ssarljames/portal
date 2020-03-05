import { PaperSize } from '../paper-size/paper-size';
import { PrintQuality } from '../print-quality/print-quality';

export class PrintRate {
  paper_size_id: string;
  print_quality_id: string;

  rate: number;

  paper_size: PaperSize;
  print_quality: PrintQuality;
}
