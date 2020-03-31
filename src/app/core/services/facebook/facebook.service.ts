import { Injectable } from '@angular/core';

declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {


  applicationId: string;

  constructor() {
    let self = this;
    self.applicationId = "876636719522107";  // **Enter your Created FB App's ID**
    self.loadFBSDK();
  }


  loadFBSDK() {
    let self = this;
    (<any>window).fbAsyncInit = () => {
      FB.init({
        appId: self.applicationId,
        xfbml: false,
        version: 'v2.9'
      });
    };

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-js-sdk'));
  }
}
