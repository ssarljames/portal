import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { Permission } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionsService extends ResourceService<Permission> {

  constructor(http: HttpClient) {
    super(http, 'permissions');
  }
}
