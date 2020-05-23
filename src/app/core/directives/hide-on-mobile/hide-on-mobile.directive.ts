import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[hideOnMobile]'
})
export class HideOnMobileDirective {

  hidden: boolean = false;

  constructor(breakpointObserver: BreakpointObserver,
              templateRef: TemplateRef<any>,
              viewContainer: ViewContainerRef) {

    breakpointObserver.observe(Breakpoints.Handset).subscribe( state => {
      if(state.matches && this.hidden == false)
        viewContainer.clear();
      else if(state.matches == false && this.hidden)
        viewContainer.createEmbeddedView(templateRef)

      this.hidden = state.matches;
    });

  }

}
