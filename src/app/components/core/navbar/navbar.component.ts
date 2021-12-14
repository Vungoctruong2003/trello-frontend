import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: any;

  constructor(private authService: AuthService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.getProfile()
  }

  logout() {
    this.authService.logout().subscribe(res => {
      console.log(res)
      window.localStorage.removeItem('access_token')
      return this.route.navigate(['login'])
    })
  }

  getProfile() {
    this.authService.getProfile().subscribe(res => {
      this.user = res
      console.log(res)
    })
  }

}
