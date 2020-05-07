import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[showOnMobile]'
})
export class ShowOnMobileDirective {

  constructor(breakpointObserver: BreakpointObserver,
              templateRef: TemplateRef<any>,
              viewContainer: ViewContainerRef) {

    breakpointObserver.observe(Breakpoints.Handset).subscribe( state => {
        state.matches 
          ? viewContainer.createEmbeddedView(templateRef)
          : viewContainer.clear();
    });

  }
}
