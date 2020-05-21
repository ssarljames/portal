import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(updates: SwUpdate, modalService: ModalService) {   
    updates.available.subscribe(event => {
      
      modalService.toast('Update available. Reloading in 5 seconds');
      setTimeout(() => {
        updates.activateUpdate().then(() => document.location.reload());
      }, 3000);
      
    });
  }
}
