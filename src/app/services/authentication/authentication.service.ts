import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.REST_URL}/${environment.REST_VERSION}/${environment.AUTH.BASE_SERVICE_PATH}`, { username, password });
  }

  /*logout(): Observable<any> {
  }*/
}
