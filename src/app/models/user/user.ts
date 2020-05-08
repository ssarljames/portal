import { Model } from '../model/model';

export class User extends Model {

  username: string;
  password: string;

  firstname: string;
  lastname: string;

  fullname: string;

  token: string;

  role: string;

  reset_password: boolean;

  is_administrator: boolean;

  deactivated_at: Date;

  permissions: Permission[];

  profile_image: string;

  get profile_image_url(): string{
    return this.profile_image ?? '/assests/images/profile.png';
  }

  canAccess(code: string): boolean{
    return this.permissions.findIndex( p => p.permission_code == code) > -1
  }

  get permission_group(): PermissionGroup[]{

    const unique = this.permissions
                        .map(item => item.permission)
                        .filter((value, index, self) => self.indexOf(value) === index)

    let groups: PermissionGroup[] = [];

    unique.forEach( value => {
      groups.push({
        permission_label: this.permissions.find( p => p.permission == value).permission_label,
        user_id: this.permissions.find( p => p.permission == value).user_id,
        permission: value,
        types: this.permissions.filter( p => p.permission == value) 
      });
    });

    return groups;
  }
}

export class Permission extends Model {
  user_id: number;
  permission: number;
  type: number;

  permission_label: string;
  type_label: string;

  permission_code: string;
}

export interface PermissionGroup {
  permission_label: string;
  permission: number;
  user_id: number;
  types: Permission[];
}