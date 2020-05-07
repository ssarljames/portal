import { Component, OnInit, Input } from '@angular/core';
import { PermissionGroup, Permission } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';
import { HttpShowResponse } from 'src/app/core/services/resource/resource.service';
import { UserPermissionsService } from 'src/app/services/user-permissions/user-permissions.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-permissions-modal',
  templateUrl: './permissions-modal.component.html',
  styleUrls: ['./permissions-modal.component.scss']
})
export class PermissionsModalComponent implements OnInit {

  @Input() permission_group: PermissionGroup;
  objectKeys = Object.keys;

  types: any[] = [];

  changes: {
    to_add: number[],
    to_remove: number[]
  } = {
    to_add: [],
    to_remove: []
  }


  saving: boolean = false;

  constructor(private userPermissionsService: UserPermissionsService,
              private dialogRef: MatDialogRef<PermissionsModalComponent>) { }

  ngOnInit(): void {
    this.userPermissionsService
          .get(`users/${this.permission_group.user_id}/permissions/types`).subscribe( 
            (response: HttpShowResponse) => {

              this.types = response.data;

    });
  }

  checkChanges(c: MatCheckboxChange): void{
    if(c.checked 
        && this.findExistingType(Number(c.source.value)) == false
        && this.changes.to_add.findIndex(t => t == Number(c.source.value)) == -1)

      this.changes.to_add.push(Number(c.source.value));

    else 
      if(c.checked == false 
          && this.findExistingType(Number(c.source.value))
          && this.changes.to_remove.findIndex(t => t == Number(c.source.value)) == -1){

        this.changes.to_remove.push(Number(c.source.value));
      }

    

    if(c.checked)
      this.changes.to_remove = this.changes.to_remove.filter( type => type != Number(c.source.value))
    else
      this.changes.to_add = this.changes.to_add.filter( type => type != Number(c.source.value))

    
        
  }

  findExistingType(type: number): boolean{
    return this.permission_group.types.findIndex(p => p.type == type) > -1
  }


  save(): void{

    const permission: any = this.changes;
    permission.id = this.permission_group.permission

    this.saving = true;
    this.userPermissionsService
          .update(permission, `users/${this.permission_group.user_id}/`)
          .subscribe( permission => {

          
            this.saving = true;
            this.dialogRef.close(permission);

    });
  }

}
