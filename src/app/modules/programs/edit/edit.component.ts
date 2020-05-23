import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/program/program';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { ProgramService } from 'src/app/services/program/program.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  program: Program = null;

  constructor(private router: Router,
              private modalService: ModalService,
              private programService: ProgramService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.programService.read(this.activatedRoute.snapshot.params.id).subscribe(
      program => this.program = program
    );
  }

  onSaved(program: Program): void {
    this.program = program;
    this.modalService.toast('Program information was updated.', 'Success', 'success');
    this.router.navigate(['/programs', program.id]);
  }

}
