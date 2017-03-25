import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';
// import { AgmCoreModule } from 'angular2-google-maps';
// import { Ng2TableModule } from 'ng2-table/ng2-table';

import { MenuService } from '../core/menu/menu.service';

import { HomeComponent } from './home/home.component';

import { DiagnosticsComponent } from './diagnostics/components/diagnostics';
import { ManagementComponent } from './management/components/management';
import { MessageComponent } from './message/components/message';
import { PhotoComponent } from './photo/components/photo';

import { FeedComponent } from './feed/components/feed';
import { FeedListComponent } from './feed/components/feedList';

import { SharedModule } from '../shared/shared.module';

import appMenu from './menu';
import appRoutes from './routes';

@NgModule({
  imports: [
    SharedModule,
    // Ng2TableModule,
    InfiniteScrollModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyA8okzgfpEduXDLlebJtrgw6cmexiGNoN0'
    // })
  ],
  declarations: [
    HomeComponent,
    DiagnosticsComponent,
    ManagementComponent,
    MessageComponent,
    PhotoComponent,
    FeedComponent,
    FeedListComponent,
    // DetailsComponent,
    // DetailFormComponent,
    // MapsComponent,
  ],
  providers: [],
  exports: [
    RouterModule,
    // Ng2TableModule,
    // AgmCoreModule,
    InfiniteScrollModule,
    HomeComponent,
    DiagnosticsComponent,
    ManagementComponent,
    MessageComponent,
    PhotoComponent,
    FeedComponent,
    FeedListComponent,
  ]
})

export class RoutesModule {
  constructor(private menu: MenuService) {
    menu.addMenu(appMenu);
  }
}
