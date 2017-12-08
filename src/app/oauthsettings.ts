export class OAuthSettings {
  public static get authority(): string {
    return localStorage.getItem("authority");
  }
  public static get client_id(): string {
    return localStorage.getItem("client_id");
  }
  public static get redirect_uri(): string {
    return localStorage.getItem("redirect_uri");
  }
  public static get response_type(): string {
    return localStorage.getItem("response_type");
  }
  public static get scope(): string {
    return localStorage.getItem("scope");
  }
  public static get post_logout_redirect_uri(): string {
    return localStorage.getItem("post_logout_redirect_uri");
  }
  public static get dummy_client_secret(): string {
    return localStorage.getItem("dummy_client_secret");
  }
}

import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: OAuthSettings.authority,
  clientId: OAuthSettings.client_id,
  redirectUri: OAuthSettings.redirect_uri,
  responseType: OAuthSettings.response_type,
  scope: OAuthSettings.scope,
  postLogoutRedirectUri: OAuthSettings.post_logout_redirect_uri,
  dummyClientSecret: OAuthSettings.dummy_client_secret,
  oidc: false
}
