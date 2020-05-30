import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { Department } from 'src/app/models/department/department';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends ResourceService<Department>{

  constructor(http: HttpClient) {
    super(http, 'departments');
  }
}
