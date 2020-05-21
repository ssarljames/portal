import { trigger, style, state, transition, animate } from '@angular/animations';


export const fetchAnimation = trigger('fetch', [
                          state('fetching', style({
                            opacity: 0.1,
                          })),
                          state('done', style({
                            opacity: 1,
                          })),
                          transition('fetching => done', [
                            animate('0.5s')
                          ]),
                          transition('done => fetching', [
                            animate('0.5s')
                          ]),
                      ]);


