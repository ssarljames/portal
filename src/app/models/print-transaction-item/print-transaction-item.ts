import { Model } from '../model/model';

export class PrintTransactionItem extends Model {
  size: number;
  quality: number;
  quantity: number = 1;
  price: number = 1.0;
  private _valid: boolean = false;


  constructor(){
    super();
  }

  get size_label(): string{
    let label = '';

    switch (this.size) {
      case 1:
        label = 'Short'
        break;
      case 2:
        label = 'Long'
        break;
      case 3:
        label = 'A4'
        break;

      default:
        label = 'Custom'
        break;
    }

    return label;
  }

  get quality_label(): string{
    let label = '';

    switch (this.quality) {
      case 1:
        label = 'Standard'
        break;
      case 2:
        label = 'Coloured Text'
        break;
      case 3:
        label = 'Full Colour Text w/ Graphics'
        break;

      default:
        label = 'Custom'
        break;
    }

    return label;
  }

  get total(): number{
    return this.quantity * this.price;
  }

  get is_ready(): boolean{
    return this._valid || (this.size > 0 && this.quality > 0 && this.price > 0);
  }

  reset(): void{
    this.size = null;
    this.quality = null;
    this.quantity = 1;
    this.price = 1.0;
    this._valid = false;
  }

  markAsValid(): void{
    this._valid = true;
  }

  get valid(): boolean{
    return this._valid;
  }
}


