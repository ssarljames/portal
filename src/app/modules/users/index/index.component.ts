import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  displayedColumns: string[] = [ 'username', 'firstname', 'lastname', 'created_at', 'actions' ];

  users: User[] = [];

  queryParams: any = {
    q: '',
    page: 1
  }

  meta: any = {};

  d = new Date();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void{
    this.userService.query({
      params: this.queryParams
    }).subscribe((users: User[]) => {
      this.meta = this.userService.getMeta();
      this.users = users;
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
