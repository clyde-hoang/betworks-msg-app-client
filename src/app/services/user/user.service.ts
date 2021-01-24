import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../models';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${this.constructBaseUrl()}`);
  }

  getContacts(userId: number) {
    return this.http.get<User[]>(`${this.constructBaseUrl()}/${userId}/${environment.USERS.CONTACTS}`);
  }

  private constructBaseUrl() {
    return `${environment.REST_URL}/${environment.REST_VERSION}/${environment.USERS.BASE_SERVICE_PATH}`;
  }
}
