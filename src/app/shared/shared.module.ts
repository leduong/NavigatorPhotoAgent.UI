import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { DatepickerModule, PaginationModule, CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-modal';
import { SelectModule } from 'ng2-select/ng2-select';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';

import { ColorsService } from './colors/colors.service';
import { SessionService } from './services/session';
import { CheckallDirective } from './directives/checkall';
import { NowDirective } from './directives/now';
import { ScrollableDirective } from './directives/scrollable';

import { TrimPipe } from './pipes/trim';
import { CapitalizePipe } from './pipes/capitalize';
import { CharactersPipe } from './pipes/characters';

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule, PaginationModule, CollapseModule,
    ModalModule,
    SelectModule,
    ToasterModule
  ],
  providers: [
    ColorsService,
    SessionService
  ],
  declarations: [
    TrimPipe,
    CapitalizePipe,
    CharactersPipe,
    CheckallDirective,
    NowDirective,
    ScrollableDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    ModalModule,
    DatepickerModule, PaginationModule, CollapseModule,
    ToasterModule,

    TrimPipe,
    CapitalizePipe,
    CharactersPipe,

    CheckallDirective,
    NowDirective,
    ScrollableDirective
  ]
})
export class SharedModule {}
