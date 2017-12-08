import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { CustomValidators } from 'ng2-validation';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'app/login/login.component.html'
})
export class LoginComponent implements OnInit {
  valForm: FormGroup;
  private alertMessage: string;

  constructor(private oauthService: OAuthService, fb: FormBuilder, private router: Router) {
    //oath
    if (oauthService.hasValidAccessToken()) {
      this.router.navigate(["home"]);
    }

    //form validation
    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required/*, CustomValidators.email*/])],
      'password': [null, Validators.required]
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this.loginWithPassword(value.email, value.password);
    }
  }

  loginWithPassword(login: string, password: string) {
    this
      .oauthService
      .fetchTokenUsingPasswordFlowAndLoadUserProfile(login, password)
      .then(() => {
        this.router.navigate(['/home']);

      })
      .catch((err) => {
        //console.error('error logging in', err);
        this.alertMessage = "Invalid request";
        //this.loginFailed = true;
      });
  }

  ngOnInit() {

  }
}
