import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BoardService } from 'src/app/services/board.service';
import { GroupService } from 'src/app/services/group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  users: any[] = []
  formChangeRole?: FormGroup
  id?: number
  role?: number

  constructor(
    private boardService: BoardService,
    private groupService: GroupService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private dialogRef: MatDialogRef<GetUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
      // @ts-ignore
      this.id = this.boardService.getBoardId()
      this.boardService.getRole(this.id).subscribe(res => {
        this.role = res.data
      })

  }

  ngOnInit(): void {
    this.getUser();
    this.formChangeRole = this.fb.group({
      'role': ['']
    })
    let id = this.boardService.getBoardId()
    this.boardService.getRole(id).subscribe(res => {
      this.role = res.data
    })
  }

  getUser() {
    this.boardService.getUser(this.id).subscribe(res => {
      this.users = res.data
      console.log(this.users)
    })
  }

  changeRole(id: any, role: any) {
    let data = this.formChangeRole?.value
    console.log(data)
    this.boardService.changeRole(data, id).subscribe(res => {
    })
  }

  // delete(id: any, role: any, index: any) {
  //   if (confirm('Ban chac chan muon xoa chu ?')) {
  //     this.groupService.delete(id).subscribe(res => {
  //       this.users.splice(index, 1)
  //     })
  //
  //   }
  //
  // }

  confirmDeleteUser(id: any, role:any, index: any){
    Swal.fire({
      title: 'B???n c?? ch???c ch???n mu???n x??a ng?????i d??ng n??y ?',
      // text: 'B???n s??? kh??ng th??? kh??i ph???c t???p n??y!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '?????ng ?? x??a!',
      cancelButtonText: 'H???y'
    }).then((result) => {
      if (result.value) {
        this.boardService.delete(id).subscribe(res => {
          this.users.splice(index, 1)
        })
        Swal.fire(
          '???? x??a !',
          'Th??nh vi??n ???? b??? x??a !.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          '???? h???y',
          'Kh??ng x??a ng?????i d??ng n??y !',
          'error'
        )
      }
    })
  }

  onClose() {
    this.dialogRef.close();
  }
}

