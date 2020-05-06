import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(source: any[], value: any, key: string): any {

    // console.log(source, value, key);
    

    return source.find( v => v[key] == value);
  }

}
