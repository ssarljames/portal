import { Directive, Input, ViewContainerRef, TemplateRef } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from 'src/app/models/user/user';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {

  user: User;
  code: string;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              authService: AuthenticationService) {

    authService.user$.subscribe(user => {
        this.user = user;
        if(this.code)
          this.toggle();
      });

  }

  @Input()
  set hasPermission(code: string){
    this.code = code;
    this.toggle();
  }


  toggle(): void{

    if(this.user.canAccess(this.code)) 
      this.viewContainer.createEmbeddedView(this.templateRef);
    else
      this.viewContainer.clear();

  }



}
