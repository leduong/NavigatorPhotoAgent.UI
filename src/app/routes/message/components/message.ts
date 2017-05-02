import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ModalDirective } from 'ngx-bootstrap/modal';

declare let $: any;

import { SessionService } from '../../../shared/services/session';
import { MessageLoggingService } from '../services/message';

import moment, * as moments from 'moment';

@Component({
  selector: 'message',
  providers: [MessageLoggingService, SessionService],
  templateUrl: 'app/routes/message/components/message.html',
  styles: [`
    #searchclear {
      position: absolute;
      right: 5px;
      top: 0;
      bottom: 0;
      height: 14px;
      margin: auto;
      border-top-width: 1px;
      margin-top: 35.5;
      right: 27px;
      font-size: 14px;
      cursor: pointer;
      color: #ccc;
    }
  `]
})

export class MessageComponent implements OnInit {

  @ViewChild('ExceptionModal') public ExceptionModal:ModalDirective;

  public startTime: any;
  public endTime: any;
  public limit: number = 10;
  public currentPage: number = 1;
  public keyword: string = '';
  public perPage: any[] = [10, 20, 50, 100];
  public items: any = {};
  public ignorePageChangedEvent: boolean = false;
  public modal : {
    title: string
    message?: string
  } = {
    title: '',
    message: null
  };

  totalItems:number = 100;
  isCollapsedStart:boolean = false;
  isCollapsedEnd:boolean = false;
  minimumDate:any;
  maximumDate:any;
  resetButton:boolean = false;
  search:any;

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
    let messagePage = this.session.get('messagePage');
    let start = this.session.get('startTime');
    let end = this.session.get('endTime');
    let keyword = this.session.get('keyword');

    if(messageLimit || messagePage || start || end || keyword) {
      this.resetButton = true;
    }

    this.keyword = this.session.get('keyword') ? this.session.get('keyword') : '';
    // this.startTime = this.session.get('startTime') ? this.formatDate(new Date(this.session.get('startTime'))) : this.formatDate(new Date('3/1/2017'));
    this.startTime = this.session.get('startTime') ? moment.utc(this.session.get('startTime')).format('MM/DD/YYYY') : moment.utc().subtract(30, 'days').format('MM/DD/YYYY');
    this.minimumDate = new Date(String(moment(this.startTime, "MM/DD/YYYY")));
    // this.endTime = this.session.get('endTime') ? this.formatDate(new Date(this.session.get('endTime'))) : this.formatDate(new Date());
    this.endTime = this.session.get('endTime') ? moment.utc(this.session.get('endTime')).format('MM/DD/YYYY') : moment.utc().format('MM/DD/YYYY');
    this.maximumDate = new Date(String(moment(this.endTime, "MM/DD/YYYY")));

    this.getLoggings(this.currentPage, this.limit, this.startTime, this.endTime);  
  }

  public itemsLength() {
    return this.items.results.length || 0;
  }

  resetToDefault() {
    this.resetButton = false;
    window.sessionStorage.clear();
    this.currentPage = 1;
    this.limit = 10;
    this.startTime = moment.utc().subtract(30, 'days').format('MM/DD/YYYY');
    this.minimumDate = new Date(String(moment(this.startTime, "MM/DD/YYYY")));
    this.endTime = moment.utc().format('MM/DD/YYYY');
    this.maximumDate = new Date(String(moment(this.endTime, "MM/DD/YYYY")));
    this.keyword = '';
    this.getLoggings(this.currentPage, this.limit, this.startTime, this.endTime);
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
    this.resetButton = true;
    if (!this.ignorePageChangedEvent) {
      this.currentPage = event.page;
      this.session.set('messagePage', this.currentPage);
      this.getLoggings(event.page, this.limit, this.startTime, this.endTime);
    }
    this.ignorePageChangedEvent = false;
  }

  public perPageChanged(limit: any): void {
    this.resetButton = true;
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
    // this.startTime = this.formatDate(time);
    this.startTime = moment(time).format('MM/DD/YYYY');
    this.minimumDate = new Date(String(moment(this.startTime, "MM/DD/YYYY")));    
    this.getLoggings(1, this.limit, this.startTime, this.endTime);
    this.isCollapsedStart = false;
    this.isCollapsedEnd = false;  
    this.resetButton = true;  
  }

  public changeEndTime(time: any) {
    this.session.set('endTime', time);
    // this.endTime = this.formatDate(time);
    this.endTime = moment(time).format('MM/DD/YYYY');
    this.maximumDate = new Date(String(moment(this.endTime, "MM/DD/YYYY")));
    this.getLoggings(1, this.limit, this.startTime, this.endTime);
    this.isCollapsedEnd = false;
    this.isCollapsedStart = false;
    this.resetButton = true;
  }

  public changeKeyword(keyword: any) {
    this.resetButton = true;
    this.keyword = keyword;
    this.session.set('keyword', keyword);
    this.getLoggings(this.currentPage, this.limit, this.startTime, this.endTime);
  }

  public showExceptionModal(requestId: string, requestType: string):void {
    this.modal.message = null;

    if(requestType==='xml'){
      this.modal.title = 'XML';
      this.loggingservice.getLoggingXmlId(requestId).subscribe(
          res =>{
            this.modal.message = res;
          },
          err => {
            this.modal.title = 'Error while calling the API';
            this.modal.message = err.toString();
          }
      )
    }else{
      throw new Error ('Such modal type is not declared');
    }

    this.ExceptionModal.show();
  }
  public hideExceptionModal():void {
    this.ExceptionModal.hide();
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
