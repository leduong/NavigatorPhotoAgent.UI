import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'authorization',
  providers: [],
  templateUrl: 'app/routes/authorization/components/authorization.html'
})
export class AuthorizationComponent {
  constructor(private oauthService: OAuthService) { }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  public get name() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['given_name'];
  }

  get requestAccessToken() {
    return this.oauthService.requestAccessToken;
  }

  get requestIdToken() {
    return this.oauthService.getIdToken();
  }
}