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
}
