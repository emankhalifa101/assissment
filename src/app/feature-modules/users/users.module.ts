import { UserService } from './user.service';
import { SharedModule } from './../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from "src/app/feature-modules/users/users.component";
import { HttpClientModule } from "@angular/common/http";
import { TopHeaderComponent } from './top-header/top-header.component';
import { UsersListComponent } from './users-list/users-list.component';
import { DeleteFormComponent } from './delete-form/delete-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ViewFormComponent } from './view-form/view-form.component';



@NgModule({
  declarations: [
    UsersComponent,
    TopHeaderComponent,
    UsersListComponent,
    DeleteFormComponent,
    EditFormComponent,
    ViewFormComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  entryComponents: [
    DeleteFormComponent,
    EditFormComponent,
    ViewFormComponent,
  ],
  providers: [UserService]
})
export class UsersModule { }
