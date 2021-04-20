import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../config/default';

@Component({
  selector: 'auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent implements OnInit {
  public gapiSetup: boolean = false; // marks if the gapi library has been loaded
  public authInstance: any; // gapi.auth2.GoogleAuth;
  public error: string = '';
  public user: any; // gapi.auth2.GoogleUser;

  constructor() {}

  async ngOnInit(): Promise<void> {
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance.currentUser.get();
    }
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: CONFIG.GOOGLE_OAUTH_CLIENTID })
        .then((auth) => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        (user: any) => (this.user = user),
        (error: any) => (this.error = error)
      );
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }

    return this.authInstance.isSignedIn.get();
  }
}
