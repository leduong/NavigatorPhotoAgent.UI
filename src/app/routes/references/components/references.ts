import { Component, OnInit } from '@angular/core';
declare var $: any;

import { SessionService } from '../../../shared/services/session';

import { ReferencesService } from '../services/references';

import { ReferencesListComponent } from './referencesList';
import { FilterSelectboxComponent } from './filterSelectbox';

@Component({
  selector: 'properties',
  templateUrl: 'app/routes/references/components/references.html',
  providers: [ReferencesService, SessionService]
})

export class ReferencesComponent implements OnInit {
  title: string;
  borough: string;
  objectType: string;
  page: number = 1;
  limit: number = 20;
  perPage: any[] = [10, 20, 50, 100];
  totalItems: number = 100;
  fromItem: number = 1;
  toItem: number = 20;
  boroughs: string[] = [];
  objectTypes: string[] = [];
  properties: any[] = []; // LPCReports list;
  filteredReference: any[] = [];

  // displayMode: DisplayModeEnum;
  // displayModeEnum = DisplayModeEnum;

  constructor(
    private session: SessionService,
    private referenceService: ReferencesService,
    ) {
    let page = this.session.get('page');
    this.page = (parseInt(page, 10) > 0) ? page : 1;
  }

  ngOnInit() {
    this.getFeedManagement();
    this.scrollTop();
  }

  private scrollTop() {
    $(window).scrollTop(0, 0);
  }

  public getFeedManagement(){
    this.referenceService.getFeedManagement(this.page, this.limit).subscribe(
      res => { this.properties = res; },
      err => console.error(err)
    );
  }
}