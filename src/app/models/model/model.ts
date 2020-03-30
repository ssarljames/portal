import { FormGroup } from '@angular/forms';
export class Model {

  public id?: string;


  public created_at?: Date;
  public updated_at?: Date;

  public _method?: string;

  public fill?(obj: any): any{

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        this[key] = obj[key];
      }
    }

    return this;
  }


  public formFill?(form: FormGroup): any{

    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        this[key] = form.controls[key].value;
      }
    }

    return this;
  }

  public set?(name: string, value: any): any{
    this[name] = value;
    return this;
  }
}
