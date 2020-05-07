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
  public progressSource = new BehaviorSubject<number>(0);

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

    return this.http.request(req).pipe(
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
  }

  processProgress(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }

  // private getEventMessage(event: HttpEvent<any>, file: File) {
  //   switch (event.type) {
  //     case HttpEventType.Sent:
  //       return `Uploading file "${file.name}" of size ${file.size}.`;
  //     case HttpEventType.UploadProgress:
  //       return Math.round((100 * event.loaded) / event.total);
  //     case HttpEventType.Response:
  //       return `File "${file.name}" was completely uploaded!`;
  //     default:
  //       return `File "${file.name}" surprising upload event: ${event.type}.`;
  //   }
  // }
}