import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Http, Headers, RequestOptions } from '@angular/http';

import { OAuthSettings } from '../../oauthsettings';
import { Router } from '@angular/router';

import { SharingEmailService } from '../services/sharingEmail.service';

@Component({
  selector: 'app-recover',
  templateUrl: 'app/login/recover/recover.component.html'
})
export class RecoverComponent {
  valForm: FormGroup;
  private alertMessage: string;

  constructor(public fb: FormBuilder
    , private http: Http
    , private router: Router
    , private emailSharingService: SharingEmailService) {
    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (!this.valForm.valid) return;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let body = {
      Email: value.email
    };

    this.http.post(OAuthSettings.api_user_management_recover_url, body, options)
      .subscribe(
      res => {
        console.dir(res);
        this.emailSharingService.changeEmail(body.Email)
        this.router.navigate(['/login/recoverStep2']);
      },
      res => {
        this.alertMessage = "Invalid request";
      });
  }
}
