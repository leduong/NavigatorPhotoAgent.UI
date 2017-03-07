import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { SessionService } from '../../../shared/services/session';
import { MessageLoggingService } from '../../message/services/message';

@Component({
  selector: 'photo',
  providers: [MessageLoggingService],
  templateUrl: 'app/routes/photo/components/photo.html'
})

export class PhotoComponent implements OnInit {
  public photo: any = {};

  constructor(
    private route: ActivatedRoute,
    private session: SessionService,
    private loggingservice: MessageLoggingService
  ) {


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(id);
      this.loggingservice.getLoggingId(params['id']).subscribe(
        res => {
          this.photo = res.feed;
        },
        err => console.log(err)
      );
    });
  }

  ngOnDestroy() {}

}
