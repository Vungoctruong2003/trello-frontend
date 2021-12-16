import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ChangeAvatarComponent} from "../../pages/change-avatar/change-avatar.component";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AddUserComponent} from "../../board/add-user/add-user.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private route: Router,
              private toastr: ToastrService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  changeAvatar(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    this.matDialog.open(AddUserComponent,dialogConfig);
  }

}
