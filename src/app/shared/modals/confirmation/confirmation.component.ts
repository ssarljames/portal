import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, AfterViewInit {

  @Input() message: string;
  @Input() color: string;
  @Input() withPrompt: boolean;
  @Input() password: boolean;

  equation: string;
  answer: number;
  userInput: number;

  @ViewChild('cancelButton') cancelButton: MatButton;

  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>) {}

  ngOnInit() {


    this.color = this.color ? this.color : 'warn';
    this.password = false; //this.password ? true : false;

    if(this.withPrompt && this.password == false){
      const r1 = Math.floor(Math.random() * 100);
      const r2 = Math.floor(Math.random() * 10) + 1;
      this.equation = r1 + ' + ' + r2;
      this.answer = r1 + r2;
    }



  }

  ngAfterViewInit(){

    this.cancelButton.focus();
  }

  close(): void{

    if(this.answer != Number(this.userInput) && this.withPrompt)
      return;

    this.dialogRef.close(true);
  }

  dismiss(): void{
    this.dialogRef.close(false)
  }

}


export interface ConfirmationModalOption{
  message?: string,
  type?: 'basic' | 'primary' | 'accent' | 'warn'
  withPrompt?: boolean;
  password?: boolean;
}
