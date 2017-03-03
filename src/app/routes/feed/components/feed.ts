import { Component, OnInit } from '@angular/core';
declare var $: any;

import { SessionService } from '../../../shared/services/session';

import { MessageLoggingService } from '../services/messageLogging'

import { FeedListComponent } from './feedList';
import { FilterSelectboxComponent } from './filterSelectbox';

@Component({
  selector: 'properties',
  templateUrl: 'app/routes/feed/components/feed.html',
  providers: [SessionService, MessageLoggingService]
})

export class FeedComponent implements OnInit {
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
  feedItems: any[] = []; // LPCReports list;
  filteredReference: any[] = [];

  // displayMode: DisplayModeEnum;
  // displayModeEnum = DisplayModeEnum;

  constructor(
    private session: SessionService,
    private messageLoggingService: MessageLoggingService
    ) {
    let page = this.session.get('page');
    this.page = (parseInt(page, 10) > 0) ? page : 1;
  }

  ngOnInit() {
    this.getMessageLogging(this.page, this.limit);
    this.scrollTop();
  }

  private scrollTop() {
    $(window).scrollTop(0, 0);
  }

  public getMessageLogging(page, limit) {
    this.messageLoggingService.getMessageLogging(page, limit).subscribe(
        res => {
          console.log(res, 'Res');
          this.feedItems = this.filteredReference = res.results;
          this.totalItems = res.total;
          this.scrollTop();

          this.page = page;
          this.fromItem = ((page - 1) * limit) + 1;
          this.toItem = (this.totalItems < (page * limit)) ? this.totalItems : (page * limit);
        },
        err => console.error(err)
    );
  }
}