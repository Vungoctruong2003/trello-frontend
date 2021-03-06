import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister?: FormGroup;
  errRegister: any;
  show: boolean = false
  show1: boolean = false

  constructor(private userService : UserService,
              private fb : FormBuilder,
              private router : Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      avatar: new FormControl('https://firebasestorage.googleapis.com/v0/b/trello-eb91c.appspot.com/o/RoomsImages%2F1639542019135?alt=media&token=6a53a8a9-a60c-43a2-89b6-60b323c0678a',[Validators.required])
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
        this.toastr.success('về trang đăng nhập','Đăng ký thành công ');
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

  pwd(){
    this.show = !this.show
  }
  pwd1(){
    this.show1 = !this.show1
  }
}
