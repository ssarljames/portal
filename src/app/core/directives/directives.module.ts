import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './has-permission/has-permission.directive';
import { HideOnMobileDirective } from './hide-on-mobile/hide-on-mobile.directive';
import { ShowOnMobileDirective } from './show-on-mobile/show-on-mobile.directive';



@NgModule({
  declarations: [
    HasPermissionDirective,
    HideOnMobileDirective,
    ShowOnMobileDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HasPermissionDirective,
    HideOnMobileDirective,
    ShowOnMobileDirective
  ]
})
export class DirectivesModule { }
