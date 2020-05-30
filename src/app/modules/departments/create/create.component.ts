import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department/department';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router,
              private modalService: ModalService,
              private stateService: StateService) { }

  ngOnInit(): void {
  
  }

  saved(department: Department): void {
    this.stateService.set('department', department);
    this.modalService.toast('New department was added.', 'Success', 'success');
    this.router.navigate(['/departments', department.id]);
  }

}
