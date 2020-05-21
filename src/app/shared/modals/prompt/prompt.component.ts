import { MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  @Input() question: string;
  @Input() color: string;
  @Input() required: boolean;
  @Input() password: boolean;

  user_input: string;

  initialized: boolean = false;

  value: string;

  constructor(private dialogRef: MatDialogRef<PromptComponent>) {}

  ngOnInit() {
    this.color = this.color ? this.color : 'primary';
    this.initialized = true;
    this.user_input = this.value ? this.value : '';
    this.password = this.password ? true : false;
    this.required = this.required || this.password ? true : false;
  }

  close(): void{
    if(this.user_input && this.required || this.required == false)
      this.dialogRef.close(this.user_input);
  }

  dismiss(): void{
    this.dialogRef.close(null);
  }

  keydown(): void{

  }

}

export interface PromptModalOption{
  question: string,
  color?: 'basic' | 'primary' | 'accent' | 'warn'
  value?: string,
  required?: boolean,
  password?: boolean
}
