import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/core/services/resource/resource.service';
import { Program } from 'src/app/models/program/program';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramService extends ResourceService<Program>{

  constructor(http: HttpClient) {
    super(http, 'programs');
  }
}
