import { PipesModule } from './../../core/pipes/pipes.module';
import { ConfirmationComponent } from './modals/confirmation/confirmation.component';
import { AlertComponent } from './modals/alert/alert.component';
import { ModalService } from './services/modal/modal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptComponent } from './modals/prompt/prompt.component';
import { MaterialModule } from './material.module';

import { DateFnsModule, DateFnsConfigurationService, } from 'ngx-date-fns';
import * as en from 'date-fns/locale/en'


const phConfig = new DateFnsConfigurationService();
phConfig.setLocale(en)

@NgModule({
  declarations: [
    PromptComponent,
    AlertComponent,
    ConfirmationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    DateFnsModule.forRoot(),
    PipesModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    DateFnsModule,
    PipesModule
  ],
  providers: [
    ModalService,

    { provide: DateFnsConfigurationService, useValue: phConfig }
  ],
  entryComponents: [
    PromptComponent
  ],
})
export class SharedModule { }
