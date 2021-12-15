import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: any;
  userArr?: any;

  constructor(private authService: AuthService,
              private route: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getProfile()
  }

  logout() {
    this.authService.logout().subscribe(res => {
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
}
