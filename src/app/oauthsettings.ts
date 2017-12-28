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
  public static get client_secret(): string {
    return localStorage.getItem("client_secret");
  }
  public static get api_user_management(): string {
    return localStorage.getItem("api_user_management");
  }
  public static get api_user_management_recover_url(): string {
    return `${OAuthSettings.api_user_management}api/Account`;
  }
  public static get api_user_management_change_password_token_validate_url(): string {
    return `${OAuthSettings.api_user_management}api/Account/ValidatePassword`;
  }
  public static get api_user_management_change_password_url(): string {
    return `${OAuthSettings.api_user_management}api/Account/CreatePassword`;
  }
  public static get api_user_management_registration_url(): string {
    return `${OAuthSettings.api_user_management}api/UserRegistration`;
  }
  public static get api_user_management_user_profile_url(): string {
    return `${OAuthSettings.api_user_management}api/UserProfile`;
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
  dummyClientSecret: OAuthSettings.client_secret,
  oidc: false
}
