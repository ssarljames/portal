import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private authService: AuthenticationService) {
    this.isLoggedIn = authService.isLoggedIn;
  }

  ngOnInit(): void {
  }

}
