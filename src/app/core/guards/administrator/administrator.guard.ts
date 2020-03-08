import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { NgProgress } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private modalService: ModalService,
              private p: NgProgress){

  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const is_admin = this.authService.currentUser.is_administrator;

    if(is_admin == false)
      this.modalService.toast('Content not allowed for non-admin user', 'Access Denied', 'error');


    return is_admin;
  }

}
