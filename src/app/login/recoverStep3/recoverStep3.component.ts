import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { OAuthSettings } from '../../oauthsettings'
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordChange',
  templateUrl: 'app/login/recoverStep3/recoverStep3.component.html'
})
export class RecoverStep3Component {
  valForm: FormGroup;
  passwordForm: FormGroup;
  private alertMessage: string;

  constructor(private route: ActivatedRoute, public fb: FormBuilder, private http: Http, private router: Router) {
    let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}$')]));
    let certainPassword = new FormControl('', CustomValidators.equalTo(password));

    this.passwordForm = fb.group({
      'password': password,
      'confirmPassword': certainPassword
    });

    this.valForm = fb.group({
      'passwordGroup': this.passwordForm
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.passwordForm.controls) {
      this.passwordForm.controls[c].markAsTouched();
    }

    if (!this.valForm.valid || value.passwordGroup.password !== value.passwordGroup.confirmPassword) return;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let body = {
      Password: value.passwordGroup.password
    };

    this.http.post(OAuthSettings.api_user_management_change_password_url, body, options)
      .subscribe(
      res => {
        if (res.text() === "\"Accepted\"") {
          this.router.navigate(['/login']);
        } else {
          this.alertMessage = "Invalid request";
        }
      },
      res => {
        this.alertMessage = "Invalid request";
      });
  }
}
