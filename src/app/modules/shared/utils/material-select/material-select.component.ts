import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

export interface MaterialSelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-material-select',
  templateUrl: './material-select.component.html',
  styleUrls: ['./material-select.component.scss']
})
export class MaterialSelectComponent implements OnInit {

  @Input() options: MaterialSelectOption[];
  @Input() control: FormControl;
  @Input() label: string;
  @Input() class: string;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() required: boolean = false;

  @Input() selected: any;

  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline';
  constructor() { }

  ngOnInit(): void {
    this.placeholder = this.placeholder ? this.placeholder : this.label ;
    this.label = this.label ? this.label : this.placeholder ;
    this.appearance = this.appearance ? this.appearance : 'standard';
  }

}
