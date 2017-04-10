import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

declare let $: any;

import { SessionService } from '../../../shared/services/session';
import { MessageLoggingService } from '../services/message';

@Component({
  selector: 'message',
  providers: [MessageLoggingService, SessionService],
  templateUrl: 'app/routes/message/components/message.html'
})

export class MessageComponent implements OnInit {
  public startTime: any;
  public endTime: any;
  public limit: number = 10;
  public currentPage: number = 1;
  public keyword: string = '';
  public perPage: any[] = [10, 20, 50, 100];
  public items: any = {};
  public ignorePageChangedEvent: boolean = false;

  totalItems:number = 100;


  constructor(
    private session: SessionService,
    private loggingservice: MessageLoggingService 
  ) {
    let currentPage = this.session.get('messagePage');
    this.currentPage = (parseInt(currentPage, 10) > 0) ? currentPage : 1;
  }

  ngOnInit() {
    let messageLimit = this.session.get('messageLimit');
    this.limit = (parseInt(messageLimit, 10) > 0) ? messageLimit : 10;

    this.startTime = this.session.get('startTime') ? this.formatDate(new Date(this.session.get('startTime'))) : this.formatDate(new Date('3/1/2017'));
    this.endTime = this.session.get('endTime') ? this.formatDate(new Date(this.session.get('endTime'))) : this.formatDate(new Date());

    this.getLoggings(this.currentPage, this.limit, this.startTime, this.endTime);      
  }

  public itemsLength() {
    return this.items.results.length || 0;
  }


  public getLoggings(page: number, limit: number, startIime:any, endTime:any) {
    this.loggingservice.getLoggings(page, limit, this.startTime, this.endTime).subscribe(
      res => {
        this.items = res;
        this.totalItems = res.total;
        this.scrollTop();
        this.currentPage = page;
        
      },
      err => console.error(err),
      () => console.log('done loading API Message Logging')
    );
  }

  public pageChanged(event: any) {
    if (!this.ignorePageChangedEvent) {
      this.currentPage = event.page;
      this.session.set('messagePage', this.currentPage);
      this.getLoggings(event.page, this.limit, this.startTime, this.endTime);
    }
    this.ignorePageChangedEvent = false;
  }

  public perPageChanged(limit: any): void {
    limit = parseInt(limit, 10);
    this.ignorePageChangedEvent = this.limit < limit; //Little workaround for paginator last page cornercase
    this.currentPage = 1;
    this.limit = limit;
    this.session.set('messagePage', this.currentPage);
    this.session.set('messageLimit', this.limit);
    this.getLoggings(1, limit, this.startTime, this.endTime);
  }

  public changeStartTime(time: any) {
    this.session.set('startTime', time);
    this.startTime = this.formatDate(time);
    this.getLoggings(this.currentPage, this.limit, this.startTime, this.endTime);
  }

  public changeEndTime(time: any) {
    this.session.set('endTime', time);
    this.endTime = this.formatDate(time);
    this.getLoggings(this.currentPage, this.limit, this.startTime, this.endTime);
  }

  public changeKeyword(keyword: any) {
    this.keyword = keyword;
    this.getLoggings(this.currentPage, this.limit, this.startTime, this.endTime);
  }

  private scrollTop() {
    $(window).scrollTop(0, 0);
  }

  private formatDate(time: any) {
    let dt = new Date(time);
    let arr: any = [],
      date = dt.getDate(),
      month = dt.getMonth() + 1;
    arr.push(dt.getFullYear());
    arr.push((month > 9) ? month : '0' + month);
    arr.push((date > 9) ? date : '0' + date);
    return arr.join('-');
  }

}
