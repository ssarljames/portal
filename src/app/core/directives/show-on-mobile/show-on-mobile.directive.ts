import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[showOnMobile]'
})
export class ShowOnMobileDirective {

  shown: boolean = false;

  constructor(breakpointObserver: BreakpointObserver,
              templateRef: TemplateRef<any>,
              viewContainer: ViewContainerRef) {

    breakpointObserver.observe(Breakpoints.Handset).subscribe( state => {
        if(state.matches && this.shown == false)
          viewContainer.createEmbeddedView(templateRef)
        else if(state.matches == false && this.shown)
          viewContainer.clear();

        this.shown = state.matches;
    });

  }
}
