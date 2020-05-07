import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], ...args: string[]): any[] {

    if(args.length == 0)
      return value;


    const retVal = [];
    value.forEach(element => {
      retVal.push(Object.assign({}, element));
    });
    

    const key = args[0];

    const order = args.length == 2 && args[1] == 'desc' ? 'desc' : 'asc';


    if(retVal)
      retVal.sort( (a: any, b: any): number => {

        if(a[key] == b[key] || !a.hasOwnProperty(key) || !b.hasOwnProperty(key))
          return 0;

        const A = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const B = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

        let comp = 0;
        if(A > B)
          comp = 1;
        else if(A < B)
          comp = -1;

        return order === 'desc'
                  ? comp * -1
                  : comp;

      });


    return retVal;
  }

}
