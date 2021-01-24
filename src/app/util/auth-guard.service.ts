import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import { AppState } from '../shared/appState';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = '';
    let currentUser = null;
    this.store.pipe(select(fromStore.getAuthToken), take(1)).subscribe(t => token = t);
    this.store.pipe(select(fromStore.getAuthUser), take(1)).subscribe(u => currentUser = u);
    if (currentUser && token) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}
