import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Program } from 'src/app/models/program/program';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { FormControl, Validators } from '@angular/forms';
import { ProgramService } from 'src/app/services/program/program.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-program-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() program: Program;
  @Output() onSaved: EventEmitter<Program>;

  init: boolean = false;

  form: FormGroup;

  loading: boolean = false;

  constructor(private programService: ProgramService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      no_of_years: new FormControl('', Validators.required)
    });

    this.onSaved = new EventEmitter();
  }

  ngOnInit(): void {
    if(this.program)
      this.form.setValue({
        name: this.program.name,
        code: this.program.code,
        no_of_years: this.program.no_of_years
      });

    this.init = true;
  }

  save(): void {
    if(this.form.valid){
      
      const payload: any = {
        id: this.program ? this.program.id : null,
        name: this.form.controls.name.value,
        code: this.form.controls.code.value,
        no_of_years: this.form.controls.no_of_years.value
      }

      const request: Observable<Program> = this.program 
                                                  ? this.programService.update(payload)
                                                  : this.programService.create(payload);

      request.subscribe( program => {
        this.program = program;
        this.onSaved.emit(program);
      },
      e => {
        this.form.fillErrors(e);
      });


    }
  }

}
