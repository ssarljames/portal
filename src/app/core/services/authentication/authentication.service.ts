import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './../../../models/user/user';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  endpoint: string;
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: User = new User();


  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService
  ) {

    this.endpoint = environment.endpoint;
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/login`, user)
              .pipe(map(user => {
                  localStorage.setItem('user', JSON.stringify(user));

                  this.currentUser = user;
                  this.router.navigate(['']);
                return user;
            }));
  }

  getToken() {
    return this.user() ? this.user().token : null;
  }

  get isLoggedIn(): boolean {
    return this.getToken() !== null;
  }


  user(): User {
    return this.currentUser;
  }


  logout() {

    localStorage.clear();
    this.currentUser = null;
    this.router.navigate(['g']);
    this.modalService.toast('You were logged out.');

    // return this.http.post<any>(`${this.endpoint}/logout`, {}).subscribe(() => {
    //   localStorage.clear();
    //   this.currentUser = null;
    //   this.router.navigate(['/auth']);
    // });

  }


  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
