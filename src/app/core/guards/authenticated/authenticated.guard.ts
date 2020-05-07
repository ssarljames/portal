import { ModalService } from './../../../modules/shared/services/modal/modal.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {


  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public modalService: ModalService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['/']);

      if(state.url != '/')
        this.modalService.toast('Not logged in!');

      return false;
    }
    return true
  }

}
