import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestRoutingModule } from './guest-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { ServicesComponent } from './services/services.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    AboutComponent,
    ViewPostComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule
  ]
})
export class GuestModule { }
