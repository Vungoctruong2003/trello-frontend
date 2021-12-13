import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  validatePasswordConfirm: any;

  constructor(private userService : UserService,
              private fb : FormBuilder,
              private router : Router) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['',[Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['',[Validators.required]]
    })
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
    this.userService.register(user).subscribe(res => {
      if (res.status != 200) {
        alert('dang ky thanh cong quay ve trang login')
        this.router.navigate(['/login'])
      }else{}
        this.errRegister = 'Không đăng ký được'
    })
  }
}
