import { LayoutComponent } from '../layout/layout.component';

import { HomeComponent } from './home/home.component';
import { ReferencesComponent } from './references/components/references';
import { ManagementComponent } from './management/components/management';
import { MessageComponent } from './message/components/message';
import { DiagnosticsComponent } from './diagnostics/components/diagnostics';


const routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'diagnostics', component: DiagnosticsComponent },
      { path: 'references', component: ReferencesComponent },
      { path: 'management', component: ManagementComponent },
      { path: 'message', component: MessageComponent },
      // { path: 'details/:id', component: DetailsComponent },
      // { path: 'maps', component: MapsComponent },
      { path: '**', redirectTo: 'home' }
    ]

  },

  // Not found
  { path: '**', redirectTo: 'home' }

];

export default routes;
