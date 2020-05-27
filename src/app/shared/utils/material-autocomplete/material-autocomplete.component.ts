import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, switchMap } from 'rxjs/operators';


export interface MaterialAutoCompleteOption {
  value: any;
  label: string;
  object?: any;
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
export class MaterialAutocompleteComponent implements OnInit, OnDestroy, OnChanges {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() class: string;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() source: MaterialAutoCompleteOption[];
  @Input() fetch: MaterialAutocompleteFetchOption;
  @Input() autoActiveFirst: boolean;
  @Input() defaultValue: MaterialAutoCompleteOption;

  @Output() onSelect: EventEmitter<any> =  new EventEmitter();
  @Output() onSelectOption: EventEmitter<MaterialAutoCompleteOption> =  new EventEmitter();

  // @ViewChild('searchInput') searchInput: HTMLInputElement;

  selected: string = '';

  options: MaterialAutoCompleteOption[] = [];

  search: FormControl;

  isLoading: boolean = false;

  subscription: Subscription;

  constructor(private http: HttpClient) {

    this.search = new FormControl('');

  }

  ngOnInit(): void {

    if(this.source)
      this.options = this.source;

    this.placeholder = this.placeholder ? this.placeholder : this.label ;
    this.label = this.label ? this.label : this.placeholder ;


    if(this.fetch){

      this.subscription = this.search.valueChanges.pipe(
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
      this.subscription = this.search.valueChanges.subscribe( (value: string) => {
        if(this.source)
          this.options = this.source.filter( o => o.label.toLowerCase().indexOf(value.toLowerCase()) > -1);
      })
    }

    this.control.statusChanges.subscribe( a => {
      if(a == 'INVALID'){
        this.search.setErrors(this.control.errors);
        this.search.markAsTouched({ onlySelf: true });
      }
    });



  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.defaultValue && changes.defaultValue.currentValue){
      this.control.setValue(changes.defaultValue.currentValue.value);
      this.selected = changes.defaultValue.currentValue.label;
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
    this.onSelectOption.emit( this.options.find( o => o.value == e.option.value));
    this.options = [];
  }


  clearValue(): void{
    this.selected = '';
    this.search.setValue('');
    if(this.control)
      this.control.setValue(null);

    // setTimeout( () => {
    //   this.searchInput.focus();
    // }, 300);
  }


}
