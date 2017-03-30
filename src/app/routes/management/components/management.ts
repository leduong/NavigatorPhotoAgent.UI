import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AppSettings } from '../../appsettings';

import { SessionService } from '../../../shared/services/session';
import { ManagementLoggingService } from '../services/management';

@Component({
  selector: 'management',
  providers: [ManagementLoggingService],
  templateUrl: 'app/routes/management/components/management.html'
})

export class ManagementComponent implements OnInit {
  public startTime: any;
  public endTime: any;
  public limit: number = 20;
  public page: number = 1;
  public perPage: any[] = [10, 20, 50, 100];
  public method: string = '';
  public methods: any[] = ['GET', 'POST'];
  public items: any = {};

  constructor(
    private session: SessionService,
    private loggingservice: ManagementLoggingService
  ) {
    this.page = this.session.get('managementPage') || 1;
    this.limit = this.session.get('managementLimit') || 10;
    this.startTime = this.formatDate(new Date('3/15/2017'));
    this.endTime = this.formatDate(new Date());
  }

  ngOnInit() {
    this.getLoggings();
  }

  ngOnDestroy() {}

  public itemsLength() {
    return this.items.results.length || 0;
  }

  public getLoggings(page: number = 1, limit: number = 10) {
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
    this.startTime = this.formatDate(time);
    this.getLoggings(this.page, this.limit);
  }

  public changeEndTime(time: any) {
    this.endTime = this.formatDate(time);
    this.getLoggings(this.page, this.limit);
  }

  public changeMethod(method: any) {
    this.method = method;
    this.getLoggings(this.page, this.limit);
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
