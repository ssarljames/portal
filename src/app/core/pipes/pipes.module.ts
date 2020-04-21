import { ParseIsoPipe } from './datetime/parse-iso/parse-iso.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortPipe } from './sort/sort.pipe';



@NgModule({
  declarations: [
    ParseIsoPipe,
    SortPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParseIsoPipe,
    SortPipe
  ]
})
export class PipesModule { }
