import { NavService } from './layout/side-nav/side-menu-item/nav.service';
import { HttpErrorInterceptor } from './core/interceptors/http-error/http-error.interceptor';
import { RouterModule, GuardsCheckEnd, NavigationEnd } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './layout/errors/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './layout/errors/access-denied/access-denied.component';
import { AuthenticatedPageComponent } from './layout/authenticated-page/authenticated-page.component';
import { SharedModule } from './modules/shared/shared.module';
import { AuthenticationInterceptor } from './core/interceptors/authentication/authentication.interceptor';
import { SideMenuItemComponent } from './layout/side-nav/side-menu-item/side-menu-item.component';
import { ThemePickerComponent } from './layout/theme-picker/theme-picker.component';
import { TopNavbarComponent } from './layout/top-navbar/top-navbar.component';
import { IndexComponent } from './layout/index/index.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    AuthenticatedPageComponent,
    SideMenuItemComponent,
    ThemePickerComponent,
    TopNavbarComponent,
    IndexComponent,
    SideNavComponent
  ],
  imports: [
    RouterModule,

    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,


    NgProgressModule,
    NgProgressHttpModule.withConfig({
      silentApis: ['assa'],
      id: 'http-progressbar'
    }),
    NgProgressRouterModule.withConfig({
      startEvents: [GuardsCheckEnd],
      completeEvents: [NavigationEnd],
      id: 'router-progressbar'
    }),



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },

    NavService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
