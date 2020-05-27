import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { College } from 'src/app/models/college/college';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollegeService extends ResourceService<College> {

  constructor(http: HttpClient) {
    super(http, 'colleges')
  }
}
