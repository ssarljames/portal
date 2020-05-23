import { GuestGuard } from './core/guards/guest/guest.guard';
import { AuthenticatedGuard } from './core/guards/authenticated/authenticated.guard';
import { PageNotFoundComponent } from './layout/errors/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedPageComponent } from './layout/authenticated-page/authenticated-page.component';
import { IndexComponent } from './layout/index/index.component';
import { GuestPageComponent } from './layout/guest-page/guest-page.component';
import { environment } from 'src/environments/environment';


const routes: Routes = [
  

  {
    path: 'dashboard',
    component: AuthenticatedPageComponent,
    canActivate: [ AuthenticatedGuard ],
    loadChildren: () => import(`./modules/dashboard/dashboard.module`).then(m => m.DashboardModule)
  },
  {
    path: 'users',
    component: AuthenticatedPageComponent,
    canActivate: [ AuthenticatedGuard ],
    loadChildren: () => import(`./modules/users/users.module`).then(m => m.UsersModule)
  },
  {
    path: 'posts',
    component: AuthenticatedPageComponent,
    canActivate: [ AuthenticatedGuard ],
    loadChildren: () => import(`./modules/posts/posts.module`).then(m => m.PostsModule)
  },
  {
    path: 'events',
    component: AuthenticatedPageComponent,
    canActivate: [ AuthenticatedGuard ],
    loadChildren: () => import(`./modules/events/events.module`).then(m => m.EventsModule)
  },
  {
    path: 'students',
    component: AuthenticatedPageComponent,
    canActivate: [ AuthenticatedGuard ],
    loadChildren: () => import(`./modules/students/students.module`).then(m => m.StudentsModule)
  },
  {
    path: 'programs',
    component: AuthenticatedPageComponent,
    canActivate: [ AuthenticatedGuard ],
    loadChildren: () => import(`./modules/programs/programs.module`).then(m => m.ProgramsModule)
  },
  {
    path: 'service-transactions',
    component: AuthenticatedPageComponent,
    canActivate: [ AuthenticatedGuard ],
    loadChildren: () => import(`./modules/service-transactions/service-transactions.module`).then(m => m.ServiceTransactionsModule)
  },
  {
    path: 'settings',
    component: AuthenticatedPageComponent,
    canActivate: [ AuthenticatedGuard ],
    loadChildren: () => import(`./modules/settings/settings.module`).then(m => m.SettingsModule)
  },
  {
    path: 'account',
    component: AuthenticatedPageComponent,
    canActivate: [ AuthenticatedGuard ],
    loadChildren: () => import(`./modules/account/account.module`).then(m => m.AccountModule)
  },






  {
    path: '',
    component: GuestPageComponent,
    canActivate: [ GuestGuard ],
    loadChildren: () => import(`./modules/guest/guest.module`).then(m => m.GuestModule)
  },

  {
    path: '**',
    component: PageNotFoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
