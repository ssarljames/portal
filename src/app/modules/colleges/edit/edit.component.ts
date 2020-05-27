import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { College } from 'src/app/models/college/college';
import { CollegeService } from 'src/app/services/college/college.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  college: College = null;

  constructor(private router: Router,
              private modalService: ModalService,
              private stateService: StateService,
              private collegeService: CollegeService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.collegeService.read( this.activatedRoute.snapshot.params.id ).subscribe(
      college => {
        this.college = college;
      }
    )
  }

  saved(college: College): void {
    this.stateService.set('college', college);
    this.modalService.toast('College info was updated.', 'Success', 'success');
    this.router.navigate(['/colleges', college.id]);
  }

}
