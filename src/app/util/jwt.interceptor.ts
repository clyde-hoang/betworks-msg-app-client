import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {AppState} from '../shared/appState';
import * as fromStore from '../store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let token = '';
    this.store.pipe(select(fromStore.getAuthToken), take(1)).subscribe(t => token = t);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
