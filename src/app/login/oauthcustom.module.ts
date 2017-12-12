import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [
    LoginComponent
    , RecoverComponent
    , RegisterComponent
  ],
  providers: [],
  exports: [
    LoginComponent
    , RecoverComponent
    , RegisterComponent
  ]
})

export class OauthModuleCustom { }
