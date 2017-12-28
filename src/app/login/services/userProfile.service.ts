import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OAuthSettings } from "../../oauthsettings"

@Injectable()
export class UserProfileService {
  private userProfileSource = new BehaviorSubject<UserProfileInterface>(<UserProfileInterface>{});
  userProfile = this.userProfileSource.asObservable();

  constructor(private http: Http) { }

  updateUserProfile() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    this.http.get(OAuthSettings.api_user_management_user_profile_url, options)
      .subscribe(
      res => {
        this.userProfileSource.next(<UserProfileInterface>res.json());
      });
  }
}

export interface UserProfileInterface {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  country: string;
}
