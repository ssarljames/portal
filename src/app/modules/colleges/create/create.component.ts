import { Component, OnInit } from '@angular/core';
import { College } from 'src/app/models/college/college';
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

  saved(college: College): void {
    this.stateService.set('college', college);
    this.modalService.toast('New college was added.', 'Success', 'success');
    this.router.navigate(['/colleges', college.id]);
  }

}
