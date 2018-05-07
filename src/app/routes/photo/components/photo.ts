import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { Observable } from 'rxjs/Rx';
// import { Observable } from 'rxjs';

import { SessionService } from '../../../shared/services/session';
import { MessageLoggingService } from '../../message/services/message';

@Component({
  selector: 'photo',
  providers: [MessageLoggingService],
  templateUrl: 'app/routes/photo/components/photo.html'
})

export class PhotoComponent implements OnInit {
  public photo: any = {};
  machineKeyValidation:any;
  source:any;
  timestamp:any;
  requestId:any;
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
          this.machineKeyValidation = res.machineKeyValidation;
          // console.log(this.machineKeyValidation);
          this.timestamp = res.timestamp;
          this.source =res.source;
          this.requestId = res.requestId;
        },
        err => console.log(err)
      );
    });
  }

  ngOnDestroy() {}

}
