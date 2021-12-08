import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { APIConfig } from 'src/configs/api-configs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = new BehaviorSubject<boolean>(this.hasToken())

  constructor(
    public http: HttpClient , private router: Router
  ) { }

  login(user) {
    let url = APIConfig.login.url;
    return this.http.post(url, {
      email: user.email,
      password: user.password
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/']);
    this.isLoggedIn.next(false);
  }
  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
