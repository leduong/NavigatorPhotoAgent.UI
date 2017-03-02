import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'feed-list',
  templateUrl: 'app/routes/feed/components/feedList.html',
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedListComponent {
  @Input() properties: Object;
}
