import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  templateUrl: 'app/login/login.component.html'
})
export class LoginComponent implements OnInit {
  valForm: FormGroup;
  private alertMessage: string;

  constructor(private oauthService: OAuthService
    , fb: FormBuilder
    , private router: Router) {
    //oath
    if (oauthService.hasValidAccessToken()) {
      this.router.navigate(["home"]);
    }

    //form validation
    this.valForm = fb.group({
      'login': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.required]
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.loginWithPassword(value.login, value.password);
    }
  }

  loginWithPassword(login: string, password: string) {
    this
      .oauthService
      .fetchTokenUsingPasswordFlowAndLoadUserProfile(login, password)
      .then(() => {
        this.router.navigate(['/home']);
      },
      (err) => {
        this.alertMessage = "Invalid request";
      });
  }

  ngOnInit() {

  }
}
