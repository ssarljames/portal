import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpEvent
} from "@angular/common/http";
import { map, tap, last } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UploaderService {
  public onProgress = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  upload(form: FormData, url: string, method: 'POST'|'PUT' = 'POST') {

    const req = new HttpRequest(
      method,
      url,
      form,
      {
        reportProgress: true
      }
    );

    return this.http.request(req)
        .pipe(
          tap((envelope: HttpEvent<any>) => this.processProgress(envelope))
        );
  }

  processProgress(event: HttpEvent<any>): void {
    if (event.type == HttpEventType.UploadProgress)
      this.onProgress.next(Math.round(event.loaded / event.total * 100) - 1); 
      
      
  }
}