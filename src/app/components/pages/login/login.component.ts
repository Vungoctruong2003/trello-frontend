import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin?: FormGroup;
  errLogin: any;
  access_token?: any;
  show: boolean = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private route: Router,
              private toastr: ToastrService
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
      this.access_token = res.access_token
      window.localStorage.setItem('access_token',this.access_token)
      this.toastr.success('Đăng nhập thành công');
      return this.route.navigate(['trello/home'])
    })
  }

  pwd(){
    this.show = !this.show
  }
}
