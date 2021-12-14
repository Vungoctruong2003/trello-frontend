import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister?: FormGroup;
  errRegister: any;

  constructor(private userService : UserService,
              private fb : FormBuilder,
              private router : Router) { }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('',[Validators.required])
    },this.comparePassword)
  }
  get email() {
    return this.formRegister?.get('email');
  }

  get password() {
    return this.formRegister?.get('password');
  }

  get confirmPassword() {
    return this.formRegister?.get('confirmPassword');
  }

  get name() {
    return this.formRegister?.get('name');
  }

  register() {
    const user = this.formRegister?.value;
    console.log(user);
    this.userService.register(user).subscribe(res => {
      if (res.status != 200) {
        alert('dang ky thanh cong quay ve trang login')
        this.router.navigate(['/login'])
      }else{}
        this.errRegister = 'Không đăng ký được'
    })
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.password === v.confirmPassword) ?
      null : {
        passwordnotmatch: true
      };
  }
}
