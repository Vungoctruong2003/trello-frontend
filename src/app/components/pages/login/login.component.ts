import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin?: FormGroup;
  errLogin: any

  constructor(private authService : AuthService,
              private fb : FormBuilder,
              private router : Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required]],
    })
  }
  login() {
    let data = this.formLogin?.value;

    if (this.authService.checkAccount(data)) {
      // this.router.navigate(['admin/dashboard'])
      alert('oke ')
    } else {
      this.errLogin = {
        status: 'error',
        content: 'Account not exits',
        classElement: 'alert alert-danger'
      }
    }
  }

}
