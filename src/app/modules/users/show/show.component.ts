import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ModalService } from '../../../shared/services/modal/modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, PermissionGroup } from 'src/app/models/user/user';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionsModalComponent } from '../permissions-modal/permissions-modal.component';
import { UserPermissionsService } from 'src/app/services/user-permissions/user-permissions.service';
import { HttpShowResponse } from 'src/app/core/services/resource/resource.service';
import { AddPermissionComponent } from './add-permission/add-permission.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  isFetching: boolean = true;

  userId: string;

  user: User;

  subscription: Subscription;

  constructor(private userService: UserService,
              private userPermessionService: UserPermissionsService,
              private modalService: ModalService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<{ users: User[]}>,
              private dialog: MatDialog) {

        this.userId = this.activatedRoute.snapshot.params['id'];

        this.subscription = this.store.select('users').subscribe( users => {
          const user = users.find(user => user.id == this.userId);
          if(user)
            this.user = (new User()).fill(user);
        });

  }


  ngOnInit(): void {

    this.isFetching = true;
    this.userService.read(this.userId).subscribe((user: User) => {

      this.isFetching = false;

    });


  }

  fetchUserPermissions(): void{
    this.userPermessionService.query({}, `users/${this.userId}/`).subscribe( permissions => {
      this.user.permissions = permissions;
    })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  selectPermission(permission_group: PermissionGroup): void{

    const modal: MatDialogRef<PermissionsModalComponent> = this.dialog.open(PermissionsModalComponent, {
      width: '400px'
    });

    modal.componentInstance.permission_group = permission_group; 

    modal.afterClosed().subscribe( permission => {
      if(permission)
        this.fetchUserPermissions();
    })
  }

  addPermission(): void{

    const modal: MatDialogRef<AddPermissionComponent> = this.dialog.open(AddPermissionComponent, {
      width: '400px',
      data: {
        userId: this.userId
      }
    });

    modal.afterClosed().subscribe( permission => {
      if(permission)
        this.selectPermission(permission);
    })
  }

}