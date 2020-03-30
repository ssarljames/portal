import { FormGroup as FG, AbstractControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';
export class FormGroup extends FG {

  constructor(controls: {
                [key: string]: AbstractControl;
              },
              validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]){
    super(controls, validatorOrOpts);
  }

  fillErrors(e: any): void{

    console.log(e);

    if(e.error.errors ?? false)
      for (const key in e.error.errors) {
        if (this.controls.hasOwnProperty(key)) {
          console.log(key);

          this.controls[key].setErrors(e.error.errors[key]);
          this.controls[key].markAsTouched();
        }
      }
  }
}

