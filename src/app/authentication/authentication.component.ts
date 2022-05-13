import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthenticationRequest, RegisterRequest } from '../http-client/api-http-client';
import { DataSerivce } from '../services/data-service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  registerForm = this.fb.group({
    name: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    passwordConfirm: [null, Validators.required]
  });

  public isLogin: boolean = true;
  public errorMessage?: string;
  public isLoading = false;

  constructor(private fb: FormBuilder,
    private dataSerivce: DataSerivce,
    private snackBar: MatSnackBar,
    private router: Router) { }

  onSubmit(): void {
    if (this.registerForm.invalid && this.registerForm.touched || this.loginForm.invalid && this.loginForm.touched) {
      this.errorMessage = 'Please fill in all fields';
      this.showError();
      return;
    }
    if (this.isLogin) {
      this.Login();
    } else {
      if (this.registerForm.value.password !== this.registerForm.value.passwordConfirm) {
        this.errorMessage = 'Passwords do not match';
        this.showError();
        return;
      }
      this.Register();
    }
  }

  switchForm(){
    this.isLogin 
    ? this.loginForm.reset()
    : this.registerForm.reset();

    this.isLogin =! this.isLogin;
  }

  private Login() {
    this.isLoading = true;
    this.dataSerivce.login(new AuthenticationRequest({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })).subscribe(response => {
      if (response) {
        this.isLoading = false;
        this.errorMessage = response;
      }
      this.isLoading = false;
      this.showError();
    });
  }

  private Register() {
    this.isLoading = true;
    this.dataSerivce.register(new RegisterRequest({
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    })).subscribe({
      next: response => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        this.isLoading = false;
        this.errorMessage = error;
        this.showError();
      }
    });
  }

  private showError() {
    if (this.errorMessage) {
      this.snackBar.open(this.errorMessage, 'Close', {
        duration: 3000,
      }).afterDismissed().subscribe(() => this.errorMessage = undefined);
    }
  }
}
