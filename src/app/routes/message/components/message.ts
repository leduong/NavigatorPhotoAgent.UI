import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
declare var $: any;

import { SessionService } from '../../../shared/services/session';
import { MessageLoggingService } from '../services/message';

@Component({
  selector: 'message',
  providers: [MessageLoggingService],
  templateUrl: 'app/routes/message/components/message.html'
})

export class MessageComponent implements OnInit {
  public startTime: any = new Date('1/1/1970');
  public endTime: any = new Date();
  public limit: number;
  public currentPage: number = 1;
  public keyword: string = '';
  public perPage: any[] = [10, 20, 50, 100];
  public items: any = {};
  public ignorePageChangedEvent: boolean = false;

  constructor(
    private session: SessionService,
    private loggingservice: MessageLoggingService
  ) {
    this.currentPage = this.session.get('messagePage') || 1;
    this.limit = this.session.get('messageLimit') || 10;
  }

  ngOnInit() {
    this.getLoggings(this.currentPage, this.limit);
  }

  public itemsLength() {
    return this.items.results.length || 0;
  }


  public getLoggings(page: number, limit: number) {
    this.loggingservice.getLoggings(page, limit, this.startTime, this.endTime).subscribe(
      res => {
        this.items = res;
        this.scrollTop();
      },
      err => console.error(err),
      () => console.log('done loading API Message Logging')
    );
  }

  public pageChanged(event: any) {
    if (!this.ignorePageChangedEvent) {
      this.currentPage = event.page;
      this.session.set('messagePage', this.currentPage);
      this.getLoggings(event.page, this.limit);
    }
    this.ignorePageChangedEvent = false;
  }

  public perPageChanged(limit: any): void {
    this.ignorePageChangedEvent = true; //Little workaround for paginator last page cornercase
    this.currentPage = 1;
    this.limit = limit;
    this.session.set('messagePage', 1);
    this.session.set('messageLimit', this.limit);
    this.getLoggings(1, limit);
  }

  public changeStartTime(time: any) {
    this.startTime = time;
    this.getLoggings(this.currentPage, this.limit);
  }

  public changeEndTime(time: any) {
    this.endTime = time;
    this.getLoggings(this.currentPage, this.limit);
  }

  public changeKeyword(keyword: any) {
    this.keyword = keyword;
    this.getLoggings(this.currentPage, this.limit);
  }

  private scrollTop() {
    $(window).scrollTop(0, 0);
  }


}

