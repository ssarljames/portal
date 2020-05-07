import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[hideOnMobile]'
})
export class HideOnMobileDirective {

  constructor(breakpointObserver: BreakpointObserver,
              templateRef: TemplateRef<any>,
              viewContainer: ViewContainerRef) {

    breakpointObserver.observe(Breakpoints.Handset).subscribe( state => {
      state.matches 
        ? viewContainer.clear()
        : viewContainer.createEmbeddedView(templateRef);
    });

  }

}
