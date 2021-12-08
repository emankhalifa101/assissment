import { AuthenticationService } from './services/authentication.service';
import { NotFoundComponent } from 'src/app/core/components/not-found/not-found.component';
import { SnackbarComponent } from 'src/app/core/components/snackbar/snackbar.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from "src/app/feature-modules/users/users.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "src/app/core/components/login/login.component";




@NgModule({
  declarations: [LoginComponent, SnackbarComponent , NotFoundComponent] ,
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    SharedModule
  ],
  entryComponents: [
    SnackbarComponent
  ],
  providers: [AuthenticationService]
})
export class CoreModule { }
