import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() message: string;
  @Input() color: string;

  constructor(private dialogRef: MatDialogRef<AlertComponent>) {}

  ngOnInit() {
    this.color = this.color ? this.color : 'primary';
  }

  close(): void{
    // this.activeModal.close();
    this.dialogRef.close();
  }

}


export interface AlertModalOption{
  message?: string,
  type?: 'basic' | 'primary' | 'accent' | 'warn'
}
