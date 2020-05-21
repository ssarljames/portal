import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { Student } from 'src/app/models/student/student';
import { FormControl, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student/student.service';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { Observable } from 'rxjs';

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

  constructor(private studentService: StudentService,
              private modalService: ModalService) {
  
    this.form = new FormGroup({
      id: new FormControl(''),
      id_number: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      middlename: new FormControl('')
    });

  }

  ngOnInit(): void {
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateForm();
  }

  updateForm(): void{
    if(this.student)
      this.form.setValue(this.student);
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

}
