import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {AuthService} from "../shared/authentication.service";

interface Response {
  response : string;
  result : {
    token : string;
  }
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
              private authService : AuthService ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    const val = this.loginForm.value;
    console.log(val);
    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe(res => {
        const resObj = res as Response;
        if (resObj.response === "success") {
          console.log("res", resObj.result.token);
          this.authService.setLocalStorage(resObj.result.token);
          this.router.navigateByUrl('/');
        }
      });

    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }
}
