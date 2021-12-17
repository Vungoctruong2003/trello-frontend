import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CardCreateComponent} from "../../card/card-create/card-create.component";
import {ChangeAvatarComponent} from "../../pages/change-avatar/change-avatar.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: any;

  constructor(private authService: AuthService,
              private route: Router,
              private toastr: ToastrService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getProfile()
  }

  logout() {
    this.authService.logout().subscribe(res => {
      console.log(res)
      window.localStorage.removeItem('access_token')
      this.toastr.warning('Đăng xuất thành công');
      return this.route.navigate([''])
    })
  }

  getProfile() {
    this.authService.getProfile().subscribe(res => {
      this.user = res
    })
  }

  changeAvatar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    this.matDialog.open(ChangeAvatarComponent,dialogConfig);
  }

}
