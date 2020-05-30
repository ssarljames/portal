import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department/department';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { DepartmentService } from 'src/app/services/department/department.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  department: Department = null;

  constructor(private router: Router,
              private stateService: StateService,
              private departmentService: DepartmentService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.department = this.stateService.get('department');

    this.departmentService.read( this.activatedRoute.snapshot.params.id ).subscribe(
      department => {
        this.department = department;
      }
    )
  }
}
