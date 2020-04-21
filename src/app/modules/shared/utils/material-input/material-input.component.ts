import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-material-input',
  templateUrl: './material-input.component.html',
  styleUrls: ['./material-input.component.scss']
})
export class MaterialInputComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() class: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() icon: string;
  @Output() onEnter: EventEmitter<any>;

  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline';

  constructor() {
    this.onEnter = new EventEmitter();
  }

  ngOnInit(): void {

    this.placeholder = this.placeholder ? this.placeholder : this.label ;
    this.label = this.label ? this.label : this.placeholder ;
    this.type = this.type ? this.type : 'text';

    this.appearance = this.appearance ? this.appearance : 'standard';

  }

  keyup(e: KeyboardEvent): void{
    if(e.key == 'Enter'){
      this.onEnter.emit(this.control.value);
    }

    if(e.key == 'Escape')
      this.control.setValue('');
  }

}
