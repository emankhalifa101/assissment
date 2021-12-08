import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'users',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import("./feature-modules/users/users.module").then(
        (u) => u.UsersModule
      )
  },
  //{ path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
