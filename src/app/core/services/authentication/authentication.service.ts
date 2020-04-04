import { map } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { User } from './../../../models/user/user';
import { Router, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { StateService } from '../state/state.service';
import { UserService } from 'src/app/services/user/user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  endpoint: string;

  private $currentUser: BehaviorSubject<User>;
  private authInfo: AuthInfo;

  private userFetched: boolean = false;
  private userFetching: boolean = false;

  private _requested_url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private stateService: StateService
  ) {
    this.endpoint = environment.endpoint;
    this.authInfo = JSON.parse(localStorage.getItem('_session'));
    this.$currentUser = new BehaviorSubject(null);

    this._requested_url = null;

    // if(this.authInfo && this.authInfo.token && this.authInfo.token.user_id)
    //   this.fetchUser(this.authInfo.token.user_id);

    console.log('Auth Service init');


  }

  get is_init(): boolean{
    return this.userFetched;
  }

  fetchUser(): void{
    if(this.authInfo && this.authInfo.token && this.authInfo.token.user_id && this.userFetching == false){
      this.userFetching = true;
      this.http.get<User>(`${this.endpoint}/users/${this.authInfo.token.user_id}`).subscribe(user => {
        this.$currentUser.next(user);
        this.userFetched = true;
        this.userFetching = false;
        if(this._requested_url){
          this.router.navigateByUrl(this._requested_url);
          this._requested_url = null;
        }
      },
      e => {
        this.userFetching = false;
        this.modalService.toast('Error retrieving user');
        this.logout();
      });
    }
  }

  setRequestedUrl(url: string): void{
    this._requested_url = url;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/login`, user)
              .pipe(map(response => {
                localStorage.setItem('_session', JSON.stringify(response));

                this.authInfo = response;

                this.fetchUser();

                return user;
            }));
  }

  getToken() {
    return this.authInfo ? this.authInfo.accessToken : null;
  }

  get isLoggedIn(): boolean {
    return this.getToken() !== null;
  }


  get user$(): Observable<User>{
    return this.$currentUser
          .pipe(map(user => {

              if(this.userFetched == false)
                this.fetchUser();

              return user;
          }));
  }

  get user(): User{
    return this.$currentUser.value;
  }

  setUser(user: User): void{
    this.$currentUser.next(user);
  }


  logout() {

    localStorage.clear();
    this.stateService.clear();
    this.modalService.toast('You were logged out.');
    this.authInfo = null;
    this.$currentUser.next(null);
    this.router.navigate(['/']);

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


interface Token {
  id: string;
  user_id: string;
  client_id: string;
  name: string;
  scopes: any[];
  revoked: boolean;
  created_at: Date;
  updated_at: Date;
  expires_at: Date;
}

interface AuthInfo{
  accessToken: string;
  token: Token;
}
