import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MonitorAttendanceComponent } from 'src/app/modules/events/show/manage-attendance/monitor-attendance.component';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmLeaveGuard implements CanDeactivate<unknown> {

  constructor(private modalService: ModalService){
    
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(component instanceof MonitorAttendanceComponent){
      const comp: MonitorAttendanceComponent = component;

      if(comp.recording)
        this.modalService.toast('Cannot leave the page while scanning QR codes.', 'Oops', 'error');
      
      return comp.recording == false;
    }
    
    
    return true;
  }
  
}
