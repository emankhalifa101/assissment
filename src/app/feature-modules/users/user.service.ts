import { User } from './../../core/models/user-message.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { APIConfig } from 'src/configs/api-configs';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  // list users
  public getUsers(pageIndex) {
    let url = APIConfig.listUsers.url(pageIndex + 1);
    return this.http.get(url);
  }

  // delete get Single User
  public getSingleUser(userId) {
    let url = APIConfig.userDetails.url(userId);
    return this.http.get(url);
  }


  // update user data
  public updateUser(user:User) {
    let url = APIConfig.userDetails.url(user.id);
    return this.http.patch(url , user);

  }

  // delete user data
  public deleteUser(userId) {
    let url = APIConfig.userDetails.url(userId);
    return this.http.delete(url);
  }

  // delete user data
  public createNewUser(user:User) {
    let url = APIConfig.createNewUser.url;
    return this.http.post(url, user);

  }

}
