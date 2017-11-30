import { LayoutComponent } from '../layout/layout.component';

import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/components/feed';
import { ManagementComponent } from './management/components/management';
import { MessageComponent } from './message/components/message';
import { PhotoComponent } from './photo/components/photo';
import { DiagnosticsComponent } from './diagnostics/components/diagnostics';
import { AuthorizationComponent } from './authorization/components/authorization';

import { RoutGuard } from './routeguard';

const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [RoutGuard] },
      { path: 'diagnostics', component: DiagnosticsComponent, canActivate: [RoutGuard] },
      { path: 'management', component: ManagementComponent, canActivate: [RoutGuard] },
      { path: 'message', component: MessageComponent, canActivate: [RoutGuard] },
      { path: 'feed', component: FeedComponent, canActivate: [RoutGuard] },
      { path: 'photo/:id', component: PhotoComponent, canActivate: [RoutGuard] },
      // { path: 'maps', component: MapsComponent },
      { path: 'authorization', component: AuthorizationComponent },
      { path: '**', redirectTo: 'authorization' }
    ]
  },

  // Not found
  { path: '**', redirectTo: 'authorization' }

];

export default routes;
