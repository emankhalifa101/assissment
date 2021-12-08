import { environment } from "src/environments/environment";

export const  APIConfig = {
  login : {
    url: `${environment.api}api/login`
  },
  listUsers: {
    url: (pageIndex) => `${environment.api}api/users?page=${pageIndex}`
  },
  userDetails: {
    url: (userId) => `${environment.api}api/users/${userId}`
  },
  createNewUser: {
    url: `${environment.api}api/users`
  },
}
