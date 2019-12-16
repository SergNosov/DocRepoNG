import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TokenService} from "../../service_rest/TokenService";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private loginForm: FormGroup;
  private invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private tokenService:TokenService) { }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    /*
    this.router.navigate(['/mainunit']);
    console.log('onSubmit()');
     */

    this.tokenService.login(loginPayload).subscribe(data => {
      debugger;
      if(data.status === 200) {
        window.localStorage.setItem('token', data.result.token);
        this.router.navigate(['list-user']);
      }else {
        this.invalidLogin = true;
        alert(data.message);
      }
    });
    */
  }
}
