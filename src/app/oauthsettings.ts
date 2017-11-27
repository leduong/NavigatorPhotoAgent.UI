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