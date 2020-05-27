import { Component, OnInit } from '@angular/core';
import { College } from 'src/app/models/college/college';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { CollegeService } from 'src/app/services/college/college.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  college: College = null;

  constructor(private router: Router,
              private stateService: StateService,
              private collegeService: CollegeService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.college = this.stateService.get('college');

    this.collegeService.read( this.activatedRoute.snapshot.params.id ).subscribe(
      college => {
        this.college = college;
      }
    )
  }
}
