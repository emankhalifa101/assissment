import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invaildData: boolean = false;
  loadingFlag: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formInitialization();
  }

  formInitialization() {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(3)
        ]

      ]
    })
  }

  isFieldInvalid (field: string) {
    if (this.loginForm.get(field).touched) {
      return !this.loginForm.get(field).valid;
    }
  }

  login() {
    this.loadingFlag = true;
    if(this.loginForm.value) {
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          this.successHandling(data);
        },
        error => {
          this.failureHandling();
          console.log('dd',this.loginForm.invalid && !this.loadingFlag || this.invaildData)
        }
      )
    }

  }
  successHandling(data) {
    this.loadingFlag = false;
    localStorage.setItem('token', data['token'] );
    this.authService.isLoggedIn.next(true);
    this.invaildData = false;
    this.router.navigate(['/users']);
  }
  failureHandling() {
    this.loadingFlag = false;
    this.authService.isLoggedIn.next(false);
    this.invaildData = true;
  }

}
