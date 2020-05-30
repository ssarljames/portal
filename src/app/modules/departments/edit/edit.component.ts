import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { Department } from 'src/app/models/department/department';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  department: Department = null;

  constructor(private router: Router,
              private modalService: ModalService,
              private stateService: StateService,
              private departmentService: DepartmentService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.departmentService.read( this.activatedRoute.snapshot.params.id ).subscribe(
      department => {
        this.department = department;
      }
    )
  }

  saved(department: Department): void {
    this.stateService.set('department', department);
    this.modalService.toast('Department info was updated.', 'Success', 'success');
    this.router.navigate(['/departments', department.id]);
  }

}
