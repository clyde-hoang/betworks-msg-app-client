import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AuthenticationService } from '../services';
import { AppState } from '../shared/appState';
import * as fromStore from '../store';
import { skip, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    // redirect to home if already logged in
    this.store.pipe(select(fromStore.getAuthIsLoggedIn), skip(1), take(1)).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const {username, password} = this.loginForm.value;
    this.error = null;
    this.loading = true;
    this.submitted = true;

    this.store.dispatch(new fromStore.LoginAction({username, password}));
    this.store.pipe(select(fromStore.getAuthIsLoggedIn), skip(1), take(1)).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    });

    this.store.pipe(select(fromStore.getAuthError), skip(1), take(1)).subscribe(error => {
      if (error) {
        this.submitted = false;
        this.loading = false;
        this.error = 'Invalid Username/Password';
      }
    });
  }
}
