import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { Student } from 'src/app/models/student/student';
import { FormControl, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student/student.service';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { Observable } from 'rxjs';
import { MaterialAutocompleteFetchOption, MaterialAutoCompleteOption } from 'src/app/shared/utils/material-autocomplete/material-autocomplete.component';
import { environment } from 'src/environments/environment';
import { Program } from 'src/app/models/program/program';
import { ProgramService } from 'src/app/services/program/program.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {

  @Input() student: Student;
  @Output() onSave: EventEmitter<Student> = new EventEmitter();

  form: FormGroup;
  saving: boolean = false;

  fetchProgram: MaterialAutocompleteFetchOption;
  yearLevels: MaterialAutoCompleteOption[];
  yearLevelsFiltered: MaterialAutoCompleteOption[];
  defaultProgram: MaterialAutoCompleteOption;
  

  constructor(private studentService: StudentService,
              private modalService: ModalService,
              private programService: ProgramService) {
  
    this.form = new FormGroup({
      id: new FormControl(''),
      id_number: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      middlename: new FormControl(''),

      program_id: new FormControl(null),
      year_level: new FormControl(''),
      current_address: new FormControl(''),
      home_address: new FormControl(''),
    });


    this.fetchProgram = {
      url: this.programService.getResourceURI(),
      mapResult: (result) => {
        let r: MaterialAutoCompleteOption[] = [];

        result.data.forEach( (program: Program) => {
          r.push({
            label: `${program.code}: ${program.name}`,
            value: program.id,
            object: program
          });
        });

        return r;
      }
    }

    this.yearLevels = [
      {
        label: '1st Year',
        value: 1
      },
      {
        label: '2nd Year',
        value: 2
      },
      {
        label: '3rd Year',
        value: 3
      },
      {
        label: '4th Year',
        value: 4
      },
      {
        label: '5th Year',
        value: 5
      },
      {
        label: '6th Year',
        value: 6
      }
    ]

  }

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateForm();
  }

  updateForm(): void{
    if(this.student){
      this.form.setValue({
        id: this.student.id,
        id_number: this.student.id_number,
        firstname: this.student.firstname,
        lastname: this.student.lastname,
        middlename: this.student.middlename,
        program_id: this.student.program_id,
        year_level: this.student.year_level,
        current_address: this.student.current_address,
        home_address: this.student.home_address,
      });

      if(this.student.program)
        this.defaultProgram = {
          label: this.student.program.name,
          value: this.student.program.id
        }
    }
  }

  save(): void{
    if(this.form.valid){

      const studentData: Student = (new Student()).fill(this.form.value);
      

      const request: Observable<Student> = this.student 
                                              ? this.studentService.update(studentData)
                                              : this.studentService.create(studentData);

      request.subscribe( student => {

        this.modalService.toast(this.student ? 'Student was updated.' : 'New student was added.', 'Success', 'success');
        this.onSave.emit(student)

      },
      e => {        
        this.form.fillErrors(e);
      });                                   

    }
  }

  selectProgram(program: MaterialAutoCompleteOption): void {
    this.yearLevelsFiltered = this.yearLevels.filter( o => o.value <= program.object.no_of_years);  
  }

}
