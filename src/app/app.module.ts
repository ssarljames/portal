import { NavService } from './layout/authenticated-page/side-nav/side-menu-item/nav.service';
import { HttpErrorInterceptor } from './core/interceptors/http-error/http-error.interceptor';
import { RouterModule, GuardsCheckEnd, NavigationEnd, GuardsCheckStart, NavigationError, NavigationCancel, PreloadAllModules, NavigationStart } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';

import { StoreModule } from '@ngrx/store';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './layout/errors/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './layout/errors/access-denied/access-denied.component';
import { AuthenticatedPageComponent } from './layout/authenticated-page/authenticated-page.component';
import { SharedModule } from './modules/shared/shared.module';
import { AuthenticationInterceptor } from './core/interceptors/authentication/authentication.interceptor';
import { SideMenuItemComponent } from './layout/authenticated-page/side-nav/side-menu-item/side-menu-item.component';
import { ThemePickerComponent } from './layout/theme-picker/theme-picker.component';
import { TopNavbarComponent } from './layout/authenticated-page/top-navbar/top-navbar.component';
import { IndexComponent } from './layout/index/index.component';
import { SideNavComponent } from './layout/authenticated-page/side-nav/side-nav.component';
import { GuestPageComponent } from './layout/guest-page/guest-page.component';
import { UnderConstructionComponent } from './layout/under-construction/under-construction.component';
import { UpdatePasswordComponent } from './layout/authenticated-page/update-password/update-password.component';
import { UnknownErrorComponent } from './layout/errors/unknown-error/unknown-error.component';

import * as Hammer from 'hammerjs';
import { HammerManager } from '@angular/material/core';

import { FooterComponent } from './layout/footer/footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppReducers } from './store/app.reducers';
import { ProfileBoxComponent } from './layout/authenticated-page/profile-box/profile-box.component';

export class HammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement): HammerManager {
     return new Hammer.Manager(element, {
      touchAction: 'auto',
      inputClass: Hammer.TouchInput,
      recognizers: [
        [
          Hammer.Swipe, {
            direction: Hammer.DIRECTION_HORIZONTAL
          }
        ]
      ],
      cssProps: {
        userSelect: true
      }
    });
  }
}

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
    SideNavComponent,
    GuestPageComponent,
    UnderConstructionComponent,
    UpdatePasswordComponent,
    UnknownErrorComponent,
    FooterComponent,
    ProfileBoxComponent
  ],
  imports: [

    RouterModule.forRoot([], {
      preloadingStrategy: PreloadAllModules
    }),

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
      startEvents: [ NavigationStart ],
      completeEvents: [ NavigationCancel, NavigationEnd, NavigationError],
      id: 'router-progressbar'
    }),

    HammerModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    StoreModule.forRoot(AppReducers)

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
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },
    NavService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
