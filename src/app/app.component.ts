import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {User} from './models';
import {select, Store} from '@ngrx/store';
import {AppState} from './shared/appState';
import * as fromStore from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(fromStore.getAuthUser)).subscribe(x => this.currentUser = x);
  }

  logout(): void {
    this.store.dispatch(new fromStore.LogoutAction());
  }
}
