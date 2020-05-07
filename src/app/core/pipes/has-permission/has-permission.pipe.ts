import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user/user';

@Pipe({
  name: 'hasPermission'
})
export class HasPermissionPipe implements PipeTransform {

  transform(user: User, code: string): unknown {


    return !code || user.canAccess(code);
  }

}
