import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Http, Headers, RequestOptions } from '@angular/http';

import { OAuthSettings } from '../../oauthsettings'

@Component({
  selector: 'app-recover',
  templateUrl: 'app/login/recover/recover.component.html'
})
export class RecoverComponent {

  valForm: FormGroup;

  constructor(public fb: FormBuilder, private http: Http) {
    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
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
        }
        );
    }
  }
}
