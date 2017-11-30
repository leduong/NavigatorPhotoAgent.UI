import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { InfiniteScrollModule } from 'angular2-infinite-scroll';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { AgmCoreModule } from 'angular2-google-maps';
// import { Ng2TableModule } from 'ng2-table/ng2-table';
import { AceEditorModule } from "ng2-ace-editor";

import { MenuService } from '../core/menu/menu.service';

import { HomeComponent } from './home/home.component';

import { DiagnosticsComponent } from './diagnostics/components/diagnostics';
import { ManagementComponent } from './management/components/management';
import { MessageComponent } from './message/components/message';
import { PhotoComponent } from './photo/components/photo';

import { AuthorizationComponent } from './authorization/components/authorization';
import { FeedComponent } from './feed/components/feed';
import { FeedListComponent } from './feed/components/feedList';

import { SharedModule } from '../shared/shared.module';
import { RoutGuard } from './routeguard';

import appMenu from './menu';
import appRoutes from './routes';

@NgModule({
  imports: [
    SharedModule,
    // Ng2TableModule,
    // InfiniteScrollModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    AceEditorModule,
  ],
  declarations: [
    HomeComponent,
    DiagnosticsComponent,
    ManagementComponent,
    MessageComponent,
    PhotoComponent,
    FeedComponent,
    FeedListComponent,
    AuthorizationComponent,
    // DetailsComponent,
    // DetailFormComponent,
    // MapsComponent,
  ],
  providers: [RoutGuard],
  exports: [
    RouterModule,
    // Ng2TableModule,
    // AgmCoreModule,
    // InfiniteScrollModule,
    HomeComponent,
    DiagnosticsComponent,
    ManagementComponent,
    MessageComponent,
    PhotoComponent,
    FeedComponent,
    FeedListComponent,
    AuthorizationComponent
  ]
})

export class RoutesModule {
  constructor(private menu: MenuService) {
    menu.addMenu(appMenu);
  }
}
