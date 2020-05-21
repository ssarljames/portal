import { ConfirmationComponent, ConfirmationModalOption } from './../../modals/confirmation/confirmation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { PromptModalOption, PromptComponent } from '../../modals/prompt/prompt.component';
import { AlertModalOption, AlertComponent } from '../../modals/alert/alert.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable()
export class ModalService {

  constructor(private ngbModal: NgbModal, private dialog: MatDialog) { }

  public confirm(option: ConfirmationModalOption): Promise<any>{
    // const modal = this.ngbModal.open(ConfirmationComponent, { size: (option.withPrompt ? 'lg':'sm') });
    // modal.componentInstance.message = option.message;
    // modal.componentInstance.color = option.type;
    // modal.componentInstance.withPrompt = option.withPrompt;
    // return modal.result;

    const dialogRef: MatDialogRef<ConfirmationComponent> = this.dialog.open(ConfirmationComponent, {
      width: '400px'
    });

    dialogRef.componentInstance.message = option.message;
    dialogRef.componentInstance.color = option.type;
    dialogRef.componentInstance.withPrompt = option.withPrompt;
    dialogRef.componentInstance.password = option.password;
    return dialogRef.afterClosed().toPromise();
  }


  public alert(option: AlertModalOption): Promise<any>{
    // const modal = this.ngbModal.open(AlertComponent, { size: 'sm' });
    // modal.componentInstance.message = option.message;
    // modal.componentInstance.color = option.type;
    // return modal.result;

    const dialogRef: MatDialogRef<AlertComponent> = this.dialog.open(AlertComponent, {
      width: '250px'
    });

    dialogRef.componentInstance.message = option.message;
    dialogRef.componentInstance.color = option.type;
    return dialogRef.afterClosed().toPromise();
  }



  public prompt(option: PromptModalOption): Promise<any>{
    // const modal = this.ngbModal.open(PromptComponent, { size: 'sm' });

    // for (const key in option)
    //   if (option.hasOwnProperty(key))
    //     modal.componentInstance[key] = option[key];


    // return modal.result;


    const dialogRef: MatDialogRef<PromptComponent> = this.dialog.open(PromptComponent, {
      // width: '250px',
      minWidth: '250px'
    });

    for (const key in option)
      if (option.hasOwnProperty(key))
        dialogRef.componentInstance[key] = option[key];

    return dialogRef.afterClosed().toPromise();
  }

  public swal(option: any){
    Swal.fire(option);
  }

  public toast(text: string, title: string = 'Message', icon: string = 'info', timer: number = 5000): void{
    this.swal({
      text: text,
      title: title,
      timer: timer,
      icon: icon,
      toast: true,
      position: 'bottom-start'
    })
  }
}
