import { AuthenticationService } from './../../services/authentication.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginComponent } from './login.component';
import { UserService } from 'src/app/feature-modules/users/user.service';
import { Observable } from 'rxjs';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, HttpClientModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
      providers: [UserService, HttpClient, AuthenticationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user on the server', fakeAsync(() => {
    spyOn(component,'isFieldInvalid').withArgs('email').and.returnValue(true);
    spyOn(authService, 'login').and.returnValue(
      new Observable((observer) => {
        observer.next({"token": "QpwL5tke4Pnpja7X4"});
        return observer;
      })
    );
    component.login();
    expect(component.invaildData).toBe(false);
  }));
});
