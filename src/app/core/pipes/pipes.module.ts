import { ParseIsoPipe } from './datetime/parse-iso/parse-iso.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortPipe } from './sort/sort.pipe';
import { LteTodayPipe } from './lte-today/lte-today.pipe';
import { IsFuturePipe } from './is-future/is-future.pipe';
import { IsTodayPipe } from './is-today/is-today.pipe';



@NgModule({
  declarations: [
    ParseIsoPipe,
    SortPipe,
    LteTodayPipe,
    IsFuturePipe,
    IsTodayPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParseIsoPipe,
    SortPipe,
    LteTodayPipe,
    IsFuturePipe,
    IsTodayPipe
  ]
})
export class PipesModule { }
