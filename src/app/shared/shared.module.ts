import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { CollapseModule } from 'ngx-bootstrap';
import { DatepickerModule } from 'ngx-bootstrap';
import { PaginationModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

// import { ToasterModule } from 'angular2-toaster/angular2-toaster';

import { ColorsService } from './colors/colors.service';
import { SessionService } from './services/session';
import { CheckallDirective } from './directives/checkall';
import { NowDirective } from './directives/now';
import { ScrollableDirective } from './directives/scrollable';

import { TrimPipe } from './pipes/trim';
import { CapitalizePipe } from './pipes/capitalize';
import { CharactersPipe } from './pipes/characters';
import { UTCPipe } from './pipes/utc';
import {PrettyXMLService} from "./services/prettyxml";

// https://angular.io/styleguide#!#04-10
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule.forRoot(), PaginationModule.forRoot(), CollapseModule.forRoot(), ModalModule.forRoot(),
    // ToasterModule
  ],
  providers: [
    ColorsService,
    SessionService,
    PrettyXMLService
  ],
  declarations: [
    TrimPipe,
    CapitalizePipe,
    CharactersPipe,
    CheckallDirective,
    NowDirective,
    ScrollableDirective,
    UTCPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    DatepickerModule, PaginationModule, CollapseModule, ModalModule,
    // ToasterModule,

    TrimPipe,
    CapitalizePipe,
    CharactersPipe,
    UTCPipe,

    CheckallDirective,
    NowDirective,
    ScrollableDirective
  ]
})
export class SharedModule {}
