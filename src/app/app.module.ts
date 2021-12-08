import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { AuthenticationService } from './core/services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './feature-modules/users/users.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [AuthenticationGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
