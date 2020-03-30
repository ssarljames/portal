import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private data: any;

  constructor() {
    this.data = {};
  }

  public set(name: string, value: any): void{
    this.data[name] = value;
  }

  public get(name: string): any{
    return this.data[name] ?? null;
  }


  public unset(name: string): void{
    delete this.data[name];
  }

  public clear(): void{
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        this.unset(key);
      }
    }
  }


}
