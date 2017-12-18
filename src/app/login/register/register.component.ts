import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OAuthSettings } from '../../oauthsettings';

import { Router } from '@angular/router';

import { ReCaptchaService, ReCaptchaParamsInterface } from '../../reCaptchaCallback'

@Component({
  selector: 'app-register',
  templateUrl: 'app/login/register/register.component.html'
})
export class RegisterComponent implements AfterViewInit {
  valForm: FormGroup;
  passwordForm: FormGroup;

  constructor(public fb: FormBuilder
    , private http: Http
    , private router: Router
    , private reCaptchaService: ReCaptchaService) {

    let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
    let certainPassword = new FormControl('', CustomValidators.equalTo(password));

    this.passwordForm = fb.group({
      'password': password,
      'confirmPassword': certainPassword
    });

    this.valForm = fb.group({
      'userId': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'lname': [null, Validators.required],
      'fname': [null, Validators.required],
      'accountagreed': [null, Validators.required],
      'passwordGroup': this.passwordForm,
      'ggl-recaptcha-input': [null, Validators.required]
    });
  }

  ngAfterViewInit(): void {
    var self = this;

    var reCaptchaElement: HTMLElement = <HTMLElement>document.querySelector("#ggl-recaptcha");
    if (reCaptchaElement) {
      let params: ReCaptchaParamsInterface = {
        sitekey: "6Lfy0xMUAAAAAFl75Kn67YGjr29FB7GsZ_M1espF",
        callback: (recaptchaToken) => {
          self.valForm.controls['ggl-recaptcha-input'].setValue(recaptchaToken);
        },
        'expired-callback': () => {
          console.warn("recaptcha is expired");
          this.reCaptchaService.reset();
          self.valForm.controls['ggl-recaptcha-input'].setValue(null);
        },
        'error-callback': () => {
          console.error("recaptcha error");
          this.reCaptchaService.reset();
          self.valForm.controls['ggl-recaptcha-input'].setValue(null);
        }
      }
      this.reCaptchaService.render(reCaptchaElement, params);
    }
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    for (let c in this.passwordForm.controls) {
      this.passwordForm.controls[c].markAsTouched();
    }

    if (!this.valForm.valid || value.passwordGroup.password !== value.passwordGroup.confirmPassword) return;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let body = {
      Email: value.email,
      Password: value.passwordGroup.password,
      RecaptchaToken: value["ggl-recaptcha-input"]
    };

    this.http.post(OAuthSettings.api_user_management_registration_url, body, options)
      .subscribe(
      res => {
        console.dir(res);
        this.router.navigate(['/login']);
      }
      );
  }
}
