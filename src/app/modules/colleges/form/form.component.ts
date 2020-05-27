import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { College } from 'src/app/models/college/college';
import { CollegeService } from 'src/app/services/college/college.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-college-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() college: College;
  @Output() onSaved: EventEmitter<College>;

  init: boolean = false;

  form: FormGroup;

  loading: boolean = false;

  constructor(private collegeService: CollegeService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required)
    });

    this.onSaved = new EventEmitter();
  }

  ngOnInit(): void {
    if(this.college)
      this.form.setValue({
        name: this.college.name,
        code: this.college.code,
      });

    this.init = true;
  }

  save(): void {
    if(this.form.valid){
      
      const payload: any = {
        id: this.college ? this.college.id : null,
        name: this.form.controls.name.value,
        code: this.form.controls.code.value
      }

      const request: Observable<College> = this.college 
                                                  ? this.collegeService.update(payload)
                                                  : this.collegeService.create(payload);

      request.subscribe( college => {
        this.college = college;
        this.onSaved.emit(college);
      },
      e => {
        this.form.fillErrors(e);
      });


    }
  }

}
