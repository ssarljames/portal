import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from 'src/app/core/utils/form-group/form-group';
import { Department } from 'src/app/models/department/department';
import { DepartmentService } from 'src/app/services/department/department.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MaterialAutoCompleteOption, MaterialAutocompleteFetchOption } from 'src/app/shared/utils/material-autocomplete/material-autocomplete.component';
import { CollegeService } from 'src/app/services/college/college.service';
import { College } from 'src/app/models/college/college';

@Component({
  selector: 'app-department-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() department: Department;
  @Output() onSaved: EventEmitter<Department>;
  
  defaultCollege: MaterialAutoCompleteOption;
  fetchCollege: MaterialAutocompleteFetchOption;

  init: boolean = false;

  form: FormGroup;

  loading: boolean = false;

  constructor(private departmentService: DepartmentService,
              private collegeService: CollegeService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      college_id: new FormControl('')
    });

    this.onSaved = new EventEmitter();

    this.fetchCollege = {
      url: this.collegeService.getResourceURI(),
      mapResult: result => {

        let r: MaterialAutoCompleteOption[] = [];

        result.data.forEach( (college: College) => {
          r.push({
            label: `${college.code} - ${college.name}`,
            value: college.id,
            object: college
          });
        });

        return r;
      }
    }
  }

  ngOnInit(): void {
    if(this.department){
      this.form.setValue({
        name: this.department.name,
        code: this.department.code,
        college_id: this.department.college_id,
      });

      this.defaultCollege = {
        label: `${this.department.college.code} - ${this.department.college.name}`,
        value: this.department.college.id,
        object: this.department.college
      }
    }
    this.init = true;
  }

  save(): void {
    if(this.form.valid){
      
      const payload: any = this.form.value;
      payload.id = this.department ? this.department.id : null;

      const request: Observable<Department> = this.department 
                                                  ? this.departmentService.update(payload)
                                                  : this.departmentService.create(payload);

      request.subscribe( department => {
        this.department = department;
        this.onSaved.emit(department);
      },
      e => {
        this.form.fillErrors(e);
      });


    }
  }

  selectCollege(college: MaterialAutoCompleteOption): void {
    
  }
}
