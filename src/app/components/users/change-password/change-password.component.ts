import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  formChangePassword? : FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formChangePassword = new FormGroup({
      new_password: new FormControl('',[Validators.required]),
      new_password_confirmation: new FormControl('',[Validators.required]),
    },this.comparePassword)
  }

  get newPassword(){
    return this.formChangePassword?.get('new_password')
  }
  get cfmPassword(){
    return this.formChangePassword?.get('new_password_confirmation')
  }

  onSubmit() {
    const data = this.formChangePassword?.value;
    this.userService.changePassword(data).subscribe(res => {
      if (res.status != 200) {
        alert('Doi mat khau thanh cong')
        console.log(res)
        this.router.navigate(['/master'])
      }else{}
        // this.errRegister = 'Không đăng ký được'
    })
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.new_password === v.new_password_confirmation) ?
      null : {
        passwordnotmatch: true
      };
  }
}
