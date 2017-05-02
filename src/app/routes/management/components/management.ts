import { Component, Input, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Rx';

import { AppSettings } from '../../appsettings';

import { SessionService } from '../../../shared/services/session';
import { ManagementLoggingService } from '../services/management';

import moment from 'moment';

@Component({
  selector: 'management',
  providers: [ManagementLoggingService],
  templateUrl: 'app/routes/management/components/management.html'
})

export class ManagementComponent implements OnInit {
  @ViewChild('ExceptionModal') public ExceptionModal:ModalDirective;

  public startTime: any;
  public endTime: any;
  public limit: number = 20;
  public page: number = 1;
  public perPage: any[] = [10, 20, 50, 100];
  public method: string = '';
  public methods: any[] = ['GET', 'POST'];
  public items: any = {};
  public modal : {
    title: string
    message?: string
  } = {
    title: '',
    message: null
  };

  isCollapsedStart:boolean = false;
  isCollapsedEnd:boolean = false;
  minimumDate:any;
  maximumDate:any;

  constructor(
    private session: SessionService,
    private loggingservice: ManagementLoggingService
  ) {
    this.page = this.session.get('managementPage') || 1;
    this.limit = this.session.get('managementLimit') || 10;
  }

  ngOnInit() {
    this.startTime = moment.utc().subtract(30, 'days').format('MM/DD/YYYY');
    this.minimumDate = new Date(String(moment(this.startTime, "MM/DD/YYYY")));    
    this.endTime = moment.utc().format('MM/DD/YYYY');
    this.maximumDate = new Date(String(moment(this.endTime, "MM/DD/YYYY")));
    this.getLoggings();
  }

  ngOnDestroy() {}

  public itemsLength() {
    return this.items.results.length || 0;
  }

  public getLoggings(page: number = 1, limit: number = 10, method:any = this.method, startTime:any = this.startTime, endTime:any = this.endTime) {
    this.loggingservice.getLoggings(page, limit, this.method, this.startTime, this.endTime).subscribe(
      res => {
        this.items = res;
        this.page = res.page;
        this.limit = res.limit;
      },
      err => console.error(err),
      () => console.log('done loading API managementLogging')
    );
  }

  public pageChanged(event: any) {
    // console.log(event);
    this.page = event.page;
    this.session.set('managementPage', this.page);
    this.getLoggings(event.page, this.limit);
  }

  public perPageChanged(limit: any) {
    this.page = 1;
    this.limit = limit;
    this.session.set('managementPage', this.page);
    this.session.set('managementLimit', this.limit);
    this.getLoggings(1, limit);
  }

  public changeStartTime(time: any) {
    this.startTime = moment(time).format('MM/DD/YYYY');
    this.minimumDate = new Date(String(moment(this.startTime, "MM/DD/YYYY")));    
    this.getLoggings(1, this.limit, this.method, this.startTime, this.endTime);
    this.isCollapsedStart = false;
    this.isCollapsedEnd = false;
  }

  public changeEndTime(time: any) {
    this.endTime = moment(time).format('MM/DD/YYYY');
    this.maximumDate = new Date(String(moment(this.endTime, "MM/DD/YYYY")));
    this.getLoggings(1, this.limit, this.method, this.startTime, this.endTime);
    this.isCollapsedEnd = false;
    this.isCollapsedStart = false;
  }

  public changeMethod(method: any) {
    this.method = method;
    this.getLoggings(1, this.limit, this.method, this.startTime, this.endTime);
    this.isCollapsedStart = false;
    this.isCollapsedEnd = false;
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
  public showExceptionModal(requestId: string, requestType: string):void {
    this.modal.message = null;
    if(requestType==='exception'){
      this.modal.title = 'Exception Stacktrace';
      this.loggingservice.getLoggingExceptionId(requestId).subscribe(
          res=>{
            this.modal.message = res.text();
          },
          err=>{
            this.modal.title = 'Error while calling the API';
            this.modal.message = err.toString();
          }
      )
    }else if(requestType==='xml'){
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

}
