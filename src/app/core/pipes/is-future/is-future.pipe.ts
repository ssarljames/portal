import { Pipe, PipeTransform } from '@angular/core';

import * as is_after from 'date-fns/is_after';

@Pipe({
  name: 'isFuture'
})
export class IsFuturePipe implements PipeTransform {

  transform(value: Date): boolean {
    return is_after(value, new Date());
  }

}
