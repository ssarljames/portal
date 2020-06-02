import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number, zeroLabel: string = 'None'): unknown {
    return value == 0
            ? zeroLabel
            : value
  }

}
