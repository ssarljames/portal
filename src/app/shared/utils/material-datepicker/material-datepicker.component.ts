import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-material-datepicker',
  templateUrl: './material-datepicker.component.html',
  styleUrls: ['./material-datepicker.component.scss'],
})
export class MaterialDatepickerComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() class: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() icon: string;
  @Output() onEnter: EventEmitter<any>;
  @Input() filter: (d: Date) => {};

  @Input('max') _max: Date;
  @Input('min') _min: Date;

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

}
