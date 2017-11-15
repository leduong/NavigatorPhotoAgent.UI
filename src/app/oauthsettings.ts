export class OAuthSettings {
    public static get authority(): string {
        return "https://auth.informationcart.com";
    }
    public static get client_id(): string {
        return "navigatorphotoagentui-dev";
    }
    public static get redirect_uri(): string {
        return "http://localhost:8000/callback.html";
    }
    public static get response_type(): string {
        return "id_token token";
    }
    public static get scope(): string {
        return "openid profile roles imagegalleryapi country subscriptionlevel";
    }
    public static get post_logout_redirect_uri(): string {
        return "http://localhost:8000/index.html";
    }
}