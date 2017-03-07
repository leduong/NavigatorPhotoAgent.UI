import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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
  public limit: number = 20;
  public page: number = 1;
  public keyword: string = '';
  public perPage: any[] = [10, 20, 50, 100];
  public items: any = {};

  constructor(
    private session: SessionService,
    private loggingservice: MessageLoggingService
  ) {
    this.page = this.session.get('messagePage') || 1;
    this.limit = this.session.get('messageLimit') || 10;
  }

  ngOnInit() {
    this.getLoggings();
  }

  ngOnDestroy() {}

  public itemsLength() {
    return this.items.results.length || 0;
  }

  public getLoggings(page: number = 1, limit: number = 10) {
    this.loggingservice.getLoggings(page, limit, this.startTime, this.endTime).subscribe(
      res => {
        this.items = res;
        this.page = res.page;
        this.limit = res.limit;
      },
      err => console.error(err),
      () => console.log('done loading API Message Logging')
    );
  }

  public pageChanged(event: any) {
    // console.log(event);
    this.page = event.page;
    this.session.set('messagepage', this.page);
    this.getLoggings(event.page, this.limit);
  }

  public perPageChanged(limit: any) {
    this.page = 1;
    this.limit = limit;
    this.session.set('messagePage', this.page);
    this.session.set('messageLimit', this.limit);
    this.getLoggings(1, limit);
  }

  public changeStartTime(time: any) {
    this.startTime = time;
    this.getLoggings(this.page, this.limit);
  }

  public changeEndTime(time: any) {
    this.endTime = time;
    this.getLoggings(this.page, this.limit);
  }

  public changeKeyword(keyword: any) {
    this.keyword = keyword;
    this.getLoggings(this.page, this.limit);
  }
}
