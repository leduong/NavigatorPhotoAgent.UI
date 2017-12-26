import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { OAuthSettings } from '../../oauthsettings'
import { Router } from '@angular/router';

import { SharingEmailService } from '../sharingEmailService';

@Component({
  selector: 'app-recoverStep2',
  templateUrl: 'app/login/recoverStep2/recoverStep2.component.html'
})
export class RecoverStep2Component implements OnInit {
  private alertMessage: string;
  valForm: FormGroup;
  private emailShared: string;

  constructor(private route: ActivatedRoute
    , public fb: FormBuilder
    , private http: Http
    , private router: Router
    , private emailSharingService: SharingEmailService) {
    this.valForm = fb.group({
      'password': [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.emailSharingService.currentEmail.subscribe(email => this.emailShared = email);
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
      Password: value.password
    };

    this.http.post(OAuthSettings.api_user_management_change_password_token_validate_url, body, options)
      .subscribe(
      res => {
        if (res.text() === "\"Accepted\"") {
          this.router.navigate(['/login/recoverStep3']);
        } else {
          this.alertMessage = "Invalid request";
        }
      },
      res => {
        this.alertMessage = "Invalid request";
      });
  }
}
