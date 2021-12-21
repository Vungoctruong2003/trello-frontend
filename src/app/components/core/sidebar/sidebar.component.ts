import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ChangeAvatarComponent} from "../../pages/change-avatar/change-avatar.component";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AddUserComponent} from "../../board/add-user/add-user.component";
import {BoardService} from "../../../services/board.service";
import Swal from "sweetalert2";
import { GetUserComponent } from '../../board/get-user/get-user.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role?: any
  id?: any
  constructor(private authService: AuthService,
              private boardService: BoardService,
              private route: Router,
              private toastr: ToastrService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    let id = this.boardService.getBoardId();
    this.id = id
    this.boardService.getRole(id).subscribe(res => {
      if (res.status == 'success') {
        this.role = res.data
      }
    })
  }

  AddUserToBoard() {
    if (this.role == 1 || this.role == 2) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "30%";
      this.matDialog.open(AddUserComponent, dialogConfig);
    } else {
      this.toastr.warning('Bạn không có quyền chỉnh sửa')
    }
  }

  // DeleteBoard() {
  //   if (this.role == 1) {
  //     let id = this.boardService.getBoardId()
  //     this.boardService.deleteBoard(id).subscribe(res => {
  //       this.toastr.success('Bảng đã xoá bảng thành công')
  //       this.route.navigate(['/trello/home'])
  //     })
  //   } else {
  //     this.toastr.warning('Bạn không có quyền chỉnh sửa')
  //   }
  // }

  confirmDeleteBoard() {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa bảng này không ?',
      // text: 'Bạn sẽ không thể khôi phục tệp này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý xóa!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.value) {
        if (this.role == 1) {
          let id = this.boardService.getBoardId()
          this.boardService.deleteBoard(id).subscribe(res => {
            this.toastr.success('Bảng đã xoá bảng thành công')
            this.route.navigate(['/trello/home'])
          })
        } else {
          this.toastr.warning('Bạn không có quyền chỉnh sửa')
        }
        Swal.fire(
          'Đã xóa !',
          'Bảng đã bị xóa !.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Đã hủy',
          'Bảng không được xóa !',
          'error'
        )
      }
    })
  }

  openDialogGetUser(id: any) {
    this.boardService.setGroupId(id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.matDialog.open(GetUserComponent, dialogConfig);
  }
}
