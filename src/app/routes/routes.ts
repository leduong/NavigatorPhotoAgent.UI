import { LayoutComponent } from '../layout/layout.component';

import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/components/feed';
import { ManagementComponent } from './management/components/management';
import { MessageComponent } from './message/components/message';
import { PhotoComponent } from './photo/components/photo';
import { DiagnosticsComponent } from './diagnostics/components/diagnostics';


const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'diagnostics', component: DiagnosticsComponent },
      { path: 'management', component: ManagementComponent },
      { path: 'message', component: MessageComponent },
      { path: 'feed', component: FeedComponent },
      { path: 'photo/:id', component: PhotoComponent },
      // { path: 'maps', component: MapsComponent },
      { path: '**', redirectTo: 'home' }
    ]

  },

  // Not found
  { path: '**', redirectTo: 'home' }

];

export default routes;
