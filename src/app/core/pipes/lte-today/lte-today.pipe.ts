import { Pipe, PipeTransform } from '@angular/core';

import * as is_before from 'date-fns/is_before';
import * as is_today from 'date-fns/is_today';


@Pipe({
  name: 'lteToday'
})
export class LteTodayPipe implements PipeTransform {

  transform(value: Date): boolean {
    return is_before(value, new Date()) || is_today(value);
  }

}
