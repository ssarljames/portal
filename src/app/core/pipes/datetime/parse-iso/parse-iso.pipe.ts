import { Pipe, PipeTransform } from '@angular/core';

import * as parse from 'date-fns/parse';

@Pipe({
  name: 'parseDate'
})
export class ParseIsoPipe implements PipeTransform {

  transform(value: string): Date {
    return parse(value);
  }

}
