import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { RecoverComponent } from './recover/recover.component';
import { RegisterComponent } from './register/register.component';
import { RecoverStep2Component } from './recoverStep2/recoverStep2.component';
import { RecoverStep3Component } from './recoverStep3/recoverStep3.component';


import { SharedModule } from '../shared/shared.module';
import { ReCaptchaService } from '../reCaptchaCallback';
import { SharingEmailService } from './sharingEmailService';

@NgModule({
  imports: [SharedModule],
  declarations: [
    LoginComponent
    , RecoverComponent
    , RegisterComponent
    , RecoverStep2Component
    , RecoverStep3Component
  ],
  providers: [
    ReCaptchaService,
    SharingEmailService
  ],
  exports: [
    LoginComponent
    , RecoverComponent
    , RegisterComponent
    , RecoverStep2Component
    , RecoverStep3Component
  ]
})

export class OauthModuleCustom { }
