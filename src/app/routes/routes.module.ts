import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { AgmCoreModule } from 'angular2-google-maps';
import { SelectModule } from 'ng2-select/ng2-select';
import { Ng2TableModule } from 'ng2-table/ng2-table';

import { MenuService } from '../core/menu/menu.service';

import { HomeComponent } from './home/home.component';

import { DiagnosticsComponent } from './diagnostics/components/diagnostics';
import { ManagementComponent } from './management/components/management';
import { MessageComponent } from './message/components/message';
import { FeedComponent } from './feed/components/feed';
import { FeedListComponent } from './feed/components/feedList';
import { FilterSelectboxComponent } from './feed/components/filterSelectbox';

import { SharedModule } from '../shared/shared.module';

import appMenu from './menu';
import appRoutes from './routes';

@NgModule({
  imports: [
    SharedModule,
    Ng2TableModule,
    SelectModule,
    InfiniteScrollModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA8okzgfpEduXDLlebJtrgw6cmexiGNoN0'
    })
  ],
  declarations: [
    HomeComponent,
    DiagnosticsComponent,
    ManagementComponent,
    MessageComponent,
    FeedComponent,
    FilterSelectboxComponent,
    FeedListComponent,
    // DetailsComponent,
    // DetailFormComponent,
    // MapsComponent,
  ],
  providers: [],
  exports: [
    RouterModule,
    Ng2TableModule,
    AgmCoreModule,
    InfiniteScrollModule,
    HomeComponent,
    DiagnosticsComponent,
    ManagementComponent,
    MessageComponent,
    FilterSelectboxComponent,
    FeedComponent,
    FeedListComponent,
  ]
})

export class RoutesModule {
  constructor(private menu: MenuService) {
    menu.addMenu(appMenu);
  }
}
