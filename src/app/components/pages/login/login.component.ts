import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin?: FormGroup;
  errLogin: any

  constructor(private authService: AuthService,
              private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get email() {
    return this.formLogin?.get('email');
  }

  get password() {
    return this.formLogin?.get('password');
  }

  login() {
    const user = this.formLogin?.value;
    this.authService.login(user).subscribe(res => {
      if (res.status != 200) {
      return this.errLogin = 'Tài khoản hoặc mật khẩu không đúng!'
      }
      return alert('Okkk')

    })
  }
}
