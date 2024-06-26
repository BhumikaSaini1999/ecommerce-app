export default{
    oidc: {
        clientId: '0oahvv4pv8QBzUTLQ5d7',
        issuer: 'https://dev-78565656.okta.com/oauth2/default',
        redirectUri: 'https://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email']
    }
    //clientId: public identifier of client apps
    //issuer: Issuer of tokens => URL when authorizing with Okta Authorization server
    //redirect Uri: send user when user logs in
    //scopes provides access to information about a user
      //openid: required for authentication requests
      //profile: user's first name,last name, phone etc
      //email: user's email address
};
