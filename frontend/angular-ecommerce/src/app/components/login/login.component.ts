import { Component, Inject, OnInit } from '@angular/core';
import myAppConfig from '../../config/my-app-config';
import { OKTA_AUTH, OktaAuthModule, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { OktaSignIn } from '@okta/okta-signin-widget';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [OktaAuthModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  oktaSignIn: any;

  constructor( @Inject(OKTA_AUTH) private oktaAuth: OktaAuth){
        console.log("--Entered into LoginComponent constructor--")
        this.oktaSignIn = new OktaSignIn({
        logo: 'assets/images/logo.png',
        baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
        clientId: myAppConfig.oidc.clientId,
        redirectUri: myAppConfig.oidc.redirectUri,
        authParams: {
          pkce: true, //proof key for code exchange, we can make use of dynamic secrets for passing the information between our app and Authorization server
          issuer: myAppConfig.oidc.issuer,
          scopes: myAppConfig.oidc.scopes
        },
        useClassicEngine: true
      });
      console.log("--oktaAuth initialized succesfully--")
  }

  ngOnInit(): void{
      console.log("Entered into LoginComponent ngOnInit()")
      if(this.oktaSignIn){
        this.oktaSignIn.remove();
        console.log("ngOnInit() - oktaAuth initialized properly");
      }else{
        console.log("ngOnInit() - oktaAuth did not initialized properly");
      }
    
      this.oktaSignIn.renderEl(
        {el: '#okta-sign-in-widget'}, //this name should be same as div tag id in login.component.html
        (response: any)=> {
          console.log("entered inside")
          if(response.status === 'SUCCESS'){
            console.log('SUCCESS');
            this.oktaAuth.signInWithRedirect();
          }
        },
        (error: any) => {
          console.log("error thrown here");
          throw error;
        }
      );
      console.log("done with method")
  }
}