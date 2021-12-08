import { fakeAsync } from '@angular/core/testing';
import { async, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from "src/app/feature-modules/users/user.service";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserService
      ],
    });
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it("should create", () => {
    expect(UserService).toBeDefined();
  });

  it('should get the list of users from the server', fakeAsync(() => {
    const users = {
      "page": 1,
      "per_page": 6,
      "total": 12,
      "total_pages": 2,
      "data": [
        {
          "id": 7,
          "email": "michael.lawson@reqres.in",
          "first_name": "Michael",
          "last_name": "Lawson",
          "avatar": "https://reqres.in/img/faces/7-image.jpg"
        },
        {
          "id": 8,
          "email": "lindsay.ferguson@reqres.in",
          "first_name": "Lindsay",
          "last_name": "Ferguson",
          "avatar": "https://reqres.in/img/faces/8-image.jpg"
        }]
    }
    service.getUsers(1)
      .subscribe((users: any) => {
        expect(users.data.length).toBe(2);
      });
    tick();
    const requests = httpMock.match({ method: 'get' });
    expect(requests[0].request.method).toBe("GET");
  }));


  it('should get single user from the server', fakeAsync(() => {
    const user = {
      "data": {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://reqres.in/img/faces/2-image.jpg"
      },
      "support": {
        "url": "https://reqres.in/#support-heading",
        "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
      }
    }
    service.getSingleUser(2)
      .subscribe((users: any) => {
        expect(users.data.id).toBe(2);
      });
    tick();
    const requests = httpMock.match({ method: 'get' });
    expect(requests[0].request.method).toBe("GET");
  }));

  it('should  update user on the server', fakeAsync(() => {
    const user = {
      "id": '2',
      "email": "michael.lawson@reqres.in",
      "first_name": "Michaelll",
      "last_name": "Lawson",
      "avatar": "https://reqres.in/img/faces/7-image.jpg"
    }
    service.updateUser(user)
      .subscribe((res: any) => {
        expect(res.first_name).toBe('Michaelll');
      });
    tick();
    const requests = httpMock.match({ method: 'patch' });
    expect(requests[0].request.method).toBe("PATCH");
  }));

  it('should  delete user from server', fakeAsync(() => {
    service.deleteUser(2)
      .subscribe((res: any) => {
      });
    tick();
    const requests = httpMock.match({ method: 'delete' });
    expect(requests[0].request.method).toBe("DELETE");
  }));

  it('should  create user on server', fakeAsync(() => {
    const user = {
      "email": "lindsay.ferguson@reqres.in",
      "first_name": "Lindsay",
      "last_name": "Ferguson",
      "avatar": "https://reqres.in/img/faces/8-image.jpg"
    }
    service.createNewUser(user)
      .subscribe((res: any) => {
        expect(res.createdAt).toBeDefined();
      });
    tick();
    const requests = httpMock.match({ method: 'post' });
    expect(requests[0].request.method).toBe("POST");
  }));


});
