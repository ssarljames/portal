import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-material-textarea',
  templateUrl: './material-textarea.component.html',
  styleUrls: ['./material-textarea.component.scss']
})
export class MaterialTextareaComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() class: string;
  @Input() placeholder: string;
  @Input() rows: number;
  @Input() cols: number;

  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline';

  constructor() {
  }

  ngOnInit(): void {

    this.placeholder = this.placeholder ? this.placeholder : this.label ;
    this.label = this.label ? this.label : this.placeholder ;
    this.rows = this.rows ? this.rows : 2;
    this.cols = this.cols ? this.cols : 10;

    this.appearance = this.appearance ? this.appearance : 'standard';
  }

}
