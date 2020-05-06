import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserPermissionsService } from 'src/app/services/user-permissions/user-permissions.service';
import { HttpShowResponse } from 'src/app/core/services/resource/resource.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionGroup } from 'src/app/models/user/user';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {

  userId: number;

  objectKeys = Object.keys;

  permissions: any[] = null;

  constructor(private userPermessionService: UserPermissionsService,
              private matDialogRef: MatDialogRef<AddPermissionComponent>,
              @Inject(MAT_DIALOG_DATA) private matData: any) {

                this.userId = matData.userId;

              }

  ngOnInit(): void {
    this.userPermessionService.get(`users/${this.userId}/permissions/all`).subscribe( (response: HttpShowResponse) => {
      this.permissions = response.data;
    });
  }

  selectPermission(key: number): void{
    const p: PermissionGroup = {
      permission: key,
      permission_label: this.permissions[key],
      user_id: this.userId,
      types: []
    }

    this.matDialogRef.close(p);
  }

}
