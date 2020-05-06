import { PipesModule } from './../../core/pipes/pipes.module';
import { DirectivesModule } from './../../core/directives/directives.module';
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

import { EllipisLoadingComponent } from './utils/ellipis-loading/ellipis-loading.component';
import { MaterialInputComponent } from './utils/material-input/material-input.component';
import { MaterialTextareaComponent } from './utils/material-textarea/material-textarea.component';
import { MaterialAutocompleteComponent } from './utils/material-autocomplete/material-autocomplete.component';
import { MaterialSelectComponent } from './utils/material-select/material-select.component';
import { MaterialDatepickerComponent } from './utils/material-datepicker/material-datepicker.component';
import { CardComponent } from './utils/card/card.component';

const phConfig = new DateFnsConfigurationService();
phConfig.setLocale(en)


const FOR_EXPORT = [
  PromptComponent,
  AlertComponent,
  ConfirmationComponent,
  EllipisLoadingComponent,
  MaterialInputComponent,
  MaterialTextareaComponent,
  MaterialAutocompleteComponent,
  MaterialSelectComponent,
  MaterialDatepickerComponent,
  CardComponent
]

@NgModule({
  declarations: [
    ...FOR_EXPORT
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    DateFnsModule.forRoot(),
    PipesModule,
    DirectivesModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    DateFnsModule,
    PipesModule,
    DirectivesModule,

    ...FOR_EXPORT
  ],
  providers: [
    ModalService,

    { provide: DateFnsConfigurationService, useValue: phConfig }
  ],
  entryComponents: [
    ...FOR_EXPORT
  ],
})
export class SharedModule { }
