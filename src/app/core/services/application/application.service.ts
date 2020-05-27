import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  seconds: number = 0;

  constructor(updates: SwUpdate, modalService: ModalService) {   
    updates.available.subscribe(event => {
      
      modalService.toast('Update available. Reloading in 5 seconds');

      this.seconds = 5;

      setInterval( () => {

        modalService.toast(`Updates available. Reloading in ${this.seconds} seconds`, 'Message', 'info');
        this.seconds--;

        if(this.seconds == 0)
          document.location.reload();

      }, 1000);
      
    });
  }
}
