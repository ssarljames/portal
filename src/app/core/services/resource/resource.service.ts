import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Model } from 'src/app/models/model/model';
import { Store } from '@ngrx/store';

export interface ResourceAction<T extends Model>{

  store: Store;

  create(item: T): void;
  update(item: T): void;
  list(item: T[]): void;
  read(item: T): void;
  delete(item: T): void;
}

export class ResourceService<T extends Model> {

  private meta:any = {};
  constructor(
              private httpClient: HttpClient,
              private resource: string,
              public host: string = null,
              private action: ResourceAction<T> = null) {

      if (!this.host) {
        this.host = environment.endpoint;
      }
  }


  public getResourceURI(){
    return `${this.host}/${this.resource}`;
  }

  public get uri(): string{
    return this.getResourceURI();
  }

  public get(url: string): Observable<any>{
    return this.httpClient.get<any[]>(`${this.host}/${url}`);
  }

  public queryRaw(queryOptions: any): Observable<any>{
    return this.httpClient.get<any[]>(`${this.host}/${this.resource}`, queryOptions);
  }

  public create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.host}/${this.resource}`, item)
      .pipe(map((response: any): any => this.convertData(response)))
      .pipe(map((item:T, index) => {

        if(this.action)
          this.action.create(item);

        return item;
      }));
  }

  public update(item: T): Observable<T> {
    const _item: any = item;
    const id = _item.id;
    return this.httpClient.put<T>(`${this.host}/${this.resource}/${id}`, item)
              .pipe(map((response: any): any => this.convertData(response)))
              .pipe(map((item:T, index) => {

                if(this.action)
                  this.action.update(item);

                return item;
              })
    );
  }


  // public update(item: any): Observable<any> {
  //   const isFormData = (item instanceof FormData);
  //   const id = isFormData ? item.get('id') : item.id;

  //   if(isFormData)
  //     item.append('_method', 'PUT');
  //   else
  //     item._method = 'PUT';

  //   return this.httpClient.post<any>(`${this.host}/${this.resource}/${id}`, item );
  // }

  public save(item: any): Observable<any>{
    if( ((item instanceof FormData)  &&  item.get('id').toString() == "undefined") || (!(item instanceof FormData) && !item.id))
      return this.create(item)
    return this.update(item);
  }


  public read(id: any, option: {} = {}): Observable<T> {
    return this.httpClient.get<T>(`${this.host}/${this.resource}/${id}`, option)
              .pipe(map((response: any): any => this.convertData(response)))
              .pipe(map((item:T, index) => {

                if(this.action)
                  this.action.update(item);

                return item;
              }));
  }

  public query(queryOptions: {} = {}): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.host}/${this.resource}`, queryOptions)
      .pipe(map((response: any) => this.convertData(response)))
      .pipe(map((item:T[]) => {
        

        if(this.action)
          this.action.list(item);

        return item;
      }));
  }

  public delete(item: T) {
    return this.httpClient
      .delete(`${this.host}/${this.resource}/${item.id}`)
      .pipe(map( () => {
        if(this.action)
          this.action.delete(item)

      }));
  }

  private convertData(response: any): any {
    for (const key in response) {
      if (response.hasOwnProperty(key) && key != "data") {
        const element = response[key];
        this.meta[key] = element;
      }
    }

    return response.data ? response.data : response;
  }

  public getMeta():any{
    return this.meta;
  }

}
