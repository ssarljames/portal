import { Pipe, PipeTransform } from '@angular/core';

import * as is_today from 'date-fns/is_today';

@Pipe({
  name: 'isToday'
})
export class IsTodayPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): boolean {
    return is_today(value);
  }

}
