import { LayoutComponent } from '../layout/layout.component';

import { HomeComponent } from './home/home.component';
import { FeedComponent } from './feed/components/feed';
import { ManagementComponent } from './management/components/management';
import { MessageComponent } from './message/components/message';
import { PhotoComponent } from './photo/components/photo';
import { DiagnosticsComponent } from './diagnostics/components/diagnostics';
import { LoginComponent } from "../login/login.component";
import { RecoverComponent } from "../login/recover/recover.component";
import { RegisterComponent } from "../login/register/register.component";

import { RoutGuard } from './routeguard';

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
    ]
    , canActivate: [RoutGuard]
  },
  {
    path: 'login'
    , children: [
      { path: '', component: LoginComponent }
      , { path: 'recover', component: RecoverComponent }
      , { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }

];

export default routes;
