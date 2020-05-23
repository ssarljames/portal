import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state/state.service';
import { ProgramService } from 'src/app/services/program/program.service';
import { ActivatedRoute } from '@angular/router';
import { Program } from 'src/app/models/program/program';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  program: Program;

  constructor(private stateService: StateService,
              private programService: ProgramService,
              private activatedRoute: ActivatedRoute) {


      this.program = this.stateService.get('program');

  }

  ngOnInit(): void {
    this.programService.read( this.activatedRoute.snapshot.params.id ).subscribe(
      program => {
        this.program = program;
      }
    )
  }

}
