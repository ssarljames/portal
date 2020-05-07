import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  displayedColumns: string[];

  users: User[] = [];

  queryParams: any = {
    q: '',
    page: 1
  }

  meta: any = {};

  d = new Date();

  isLoading: boolean = false;

  user: User;

  constructor(private userService: UserService,
              private store: Store<{users: User[]}>,
              breakpointObserver: BreakpointObserver) {

    this.store.select('users').subscribe(users => {
      this.users = users;
    });

    breakpointObserver.observe(Breakpoints.Handset).subscribe( state => {
      this.displayedColumns = state.matches
                                ? [ 'firstname', 'lastname' ]
                                : [ 'username', 'firstname', 'lastname', 'created_at' ]
    })

  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void{
    this.isLoading = true;
    this.userService.query({
      params: this.queryParams
    }).subscribe((users: User[]) => {
      this.meta = this.userService.getMeta();
      this.isLoading = false;
    })
  }


  makeid(length: number): string {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
