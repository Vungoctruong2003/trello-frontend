import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BoardService} from 'src/app/services/board.service';
import {HomeService} from 'src/app/services/home.service';
import {BoardCreateComponent} from '../../board/board-create/board-create.component';
import {GroupCreateComponent} from '../../group/group-create/group-create.component';
import {AddUserToGroupComponent} from "../../group/add-user-to-group/add-user-to-group.component";
import {GetUserComponent} from '../../group/get-user/get-user.component';
import {GroupService} from 'src/app/services/group.service';
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  groups: any;
  boards: any;
  arr: any = [];
  id?: any
  role: any = 3;

  constructor(private homeService: HomeService,
              private router: Router,
              private toastr: ToastrService,
              private matDialog: MatDialog,
              private boardService: BoardService,
              private activatedRouter: ActivatedRoute,
              private groupService: GroupService
  ) {
    this.activatedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = paramMap.get('id')
      this.groupService.getRole(this.id).subscribe(res => {
        this.role = res.data
      })
    })
  }


  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    let i = 0;
    let j = 0;
    this.homeService.listGroup().subscribe(res => {
      this.groups = res.data
      i = 1
      if (i == 1 && j == 1) {
        this.merge(this.groups, this.boards)
      }
    })
    this.homeService.listBoard().subscribe(res => {
      this.boards = res.data
      j = 1
      if (i == 1 && j == 1) {
        this.merge(this.groups, this.boards)
      }
    })
  }

  merge(groups: any, boards: any) {
    for (let i = 0; i < groups.length; i++) {
      this.arr[i] = []
      for (let j = 0; j < boards.length; j++) {
        if (groups[i].group.id == boards[j].board.group_id) {
          this.arr[i].push(boards[j])
        }
      }
      this.arr[i].id = 1
    }
  }

  openDialogCreateGroup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.matDialog.open(GroupCreateComponent, dialogConfig);
  }

  openDialogCreateBoard(id: any, role: number) {
    if (role == 1 || role == 2) {
      this.boardService.setGroupId(id)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "30%";
      this.matDialog.open(BoardCreateComponent, dialogConfig);
    }
  }


  openDialogAddUserToGroup(id: any, role: number) {
    if (role == 1) {
      this.boardService.setGroupId(id)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "30%";
      this.matDialog.open(AddUserToGroupComponent, dialogConfig);
    }
  }

  outGroup(id: number) {
    this.groupService.outGroup(id).subscribe(res => {
      if (res.status == 'success') {
       this.router.navigate(['/load-home'])
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

  confirmDeleteGroup(role: any, id: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa không gian làm việc này không ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý xóa!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.value) {
        if (role == 1 || role == 2) {
          this.groupService.delete(id).subscribe(res => {
            console.log(res)
            this.router.navigate(['/load-home'])
          })
        } else {
          this.toastr.warning('Bạn không có quyền chỉnh xóa không gian này')
        }
        Swal.fire(
          'Đã xóa !',
          'Không gian làm việc đã bị xóa !.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Đã hủy',
          'Không gian làm việc không được xóa !',
          'error'
        )
      }
    })
  }

  confirmOutGroup(id: number){
    Swal.fire({
      title: 'Bạn chắc chắn muốn thoát ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý !',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.value) {
        this.groupService.outGroup(id).subscribe(res => {
          if (res.status == 'success') {
            this.router.navigate(['/load-home'])
          }
        })
        Swal.fire(
          'Đã thoát !',
          'Bạn đã thoát khỏi không gian làm việc !.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Đã hủy',
          'Không rời không gian làm việc !',
          'error'
        )
      }
    })
  }
}
