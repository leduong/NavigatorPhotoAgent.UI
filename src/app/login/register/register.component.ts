import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OAuthSettings } from '../../oauthsettings';

@Component({
  selector: 'app-register',
  templateUrl: 'app/login/register/register.component.html'
})
export class RegisterComponent {

  valForm: FormGroup;
  passwordForm: FormGroup;

  constructor(public fb: FormBuilder, private http: Http) {

    let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
    let certainPassword = new FormControl('', CustomValidators.equalTo(password));

    this.passwordForm = fb.group({
      'password': password,
      'confirmPassword': certainPassword
    });

    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'accountagreed': [null, Validators.required],
      'passwordGroup': this.passwordForm
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    for (let c in this.passwordForm.controls) {
      this.passwordForm.controls[c].markAsTouched();
    }

    if (!this.valForm.valid
      || value.passwordGroup.password !== value.passwordGroup.confirmPassword) return;


    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let body = {
      Email: value.email,
      Password: value.passwordGroup.password
    };

    this.http.post(OAuthSettings.api_user_management_registration_url, body, options)
      .subscribe(
      res => {
        console.dir(res);
      }
      );

  }
}
