import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OKTA_AUTH, OktaAuthModule, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [CommonModule, RouterLink, OktaAuthModule],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})

export class LoginStatusComponent implements OnInit{
  isAuthenticated: boolean = false;
  userFullName: string = '';
  storage: Storage = sessionStorage;//keep track of the web browser's session storage

  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth){
    console.log("--enterd into LoginStatusComponent constructor--")
  }

  ngOnInit(): void {
    //Subscribe to authentication state changes
    console.log("--enterd into ngOnInit() for LoginStatusComponent--")
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        console.log("subscribing..")
        console.log("isAuthenticated: "+result.isAuthenticated);
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    );
  }

  getUserDetails() {
    if(this.isAuthenticated){
      console.log("User is authenticated!!")
      console.log("Access Token: "+this.oktaAuth.getAccessToken());
      //Fetch the logged in user details (user's claim)
      //user full name is exposed as a property name
      this.oktaAuth.getUser().then(
        (res) => {
          this.userFullName = res.name as string;

          //retrieve the user's email from authentication response
          const theEmail = res.email;

          //now store email in browser storage
          this.storage.setItem('userEmail', JSON.stringify(theEmail));
        }
      );
    }
  }

  logout(){
    //Terminate the session with Okta and remove current tokens.
    this.oktaAuth.signOut();
  }
}