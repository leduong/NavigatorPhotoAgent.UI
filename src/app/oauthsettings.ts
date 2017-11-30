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
}

import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: OAuthSettings.authority, //'https://steyer-identity-server.azurewebsites.net/identity',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: OAuthSettings.client_id, //'spa-demo',

  // URL of the SPA to redirect the user to after login
  redirectUri: OAuthSettings.redirect_uri, //window.location.origin + '/index.html',

  responseType: OAuthSettings.response_type,

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: OAuthSettings.scope,//'openid profile email voucher',

  postLogoutRedirectUri: OAuthSettings.post_logout_redirect_uri
}
