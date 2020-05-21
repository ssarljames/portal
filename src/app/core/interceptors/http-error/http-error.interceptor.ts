import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
              private modalService: ModalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(catchError(err => {
        

        switch (err.status) {
          case 401:
                  this.authService.logout();
                  this.modalService.toast('Not logged in!');
                  
                  break;
            
          case 403:

                  this.modalService.toast('Access denied.', 'Oops!', 'error');
                  break;
            
          case 404:

                  this.modalService.toast('Resource not found.', 'Oops!', 'error');
                  break;
        

          case 422:

                  this.modalService.toast('Validation fails, check for errors.', 'Oops!', 'error');
                  break;
          


          default:
                  this.modalService.toast('Something went wrong :(', 'Oops!', 'error');
                  break;
        }

        return throwError(err);
    }));
  }
}
