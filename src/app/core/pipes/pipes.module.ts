import { ParseIsoPipe } from './datetime/parse-iso/parse-iso.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ParseIsoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParseIsoPipe
  ]
})
export class PipesModule { }
