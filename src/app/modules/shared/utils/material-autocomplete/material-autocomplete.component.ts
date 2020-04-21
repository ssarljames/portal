import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, debounceTime, switchMap } from 'rxjs/operators';


export interface MaterialAutoCompleteOption {
  value: any;
  label: string;
}

export interface MaterialAutocompleteFetchOption {
  url: string;
  payload?: any;
  mapResult(result: any): MaterialAutoCompleteOption[];
}

@Component({
  selector: 'app-material-autocomplete',
  templateUrl: './material-autocomplete.component.html',
  styleUrls: ['./material-autocomplete.component.scss']
})
export class MaterialAutocompleteComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() class: string;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() source: MaterialAutoCompleteOption[];
  @Input() fetch: MaterialAutocompleteFetchOption;
  @Input() autoActiveFirst: boolean;

  @Output() onSelect: EventEmitter<any> =  new EventEmitter();

  selected; string;

  options: MaterialAutoCompleteOption[] = [];

  search: FormControl;

  isLoading: boolean = false;

  constructor(private http: HttpClient) {
    this.search = new FormControl('');

  }

  ngOnInit(): void {

    if(this.source)
      this.options = this.source;

    this.placeholder = this.placeholder ? this.placeholder : this.label ;
    this.label = this.label ? this.label : this.placeholder ;

    if(this.fetch){

      this.search.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap(value => {
          if (value !== '' && typeof value === typeof '')
            return this.lookup(value);

          else
            return of(null);

        }
      )).subscribe( response => {
        if(response)
          this.options = this.fetch.mapResult(response);
        else
          this.options = [];
        this.isLoading = false;
      });
    }
    else{
      this.search.valueChanges.subscribe( (value: string) => {
        if(this.source)
          this.options = this.source.filter( o => o.label.toLowerCase().indexOf(value.toLowerCase()) > -1);
      })
    }

  }

  /** Http fetch */
  lookup(value: string): Observable<any>{
    this.isLoading = true;
    return this.http.get(this.fetch.url, {
      params: {
        ...this.fetch.payload,
        q: value
      }
    });
  }

  select(e: MatAutocompleteSelectedEvent): void{
    if(this.control){
      this.control.setValue(e.option.value);
      this.selected = e.option.viewValue;
    }
    else{
      this.selected = '';
      this.search.setValue('');
    }
    this.onSelect.emit(e.option.value);
    this.options = [];
  }


  clearValue(): void{
    this.selected = '';
    this.search.setValue('');
    if(this.control)
      this.control.setValue(null);
  }


}
