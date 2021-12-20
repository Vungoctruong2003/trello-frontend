import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BoardService } from 'src/app/services/board.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  users: any[] = []
  formChangeRole?: FormGroup
  id?: number
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

  }

  ngOnInit(): void {
    this.getUser();
    this.formChangeRole = this.fb.group({
      'role': ['']
    })
  }

  getUser() {
    this.groupService.getUser(this.boardService.getGroupId()).subscribe(res => {
      this.users = res.data
    })
  }

  changeRole(id: any, role: any) {
    if (role == 1) {
      let data = this.formChangeRole?.value
      console.log(data)
      this.groupService.changeRole(data, id).subscribe(res => {

      })
    }
  }

  delete(id: any, role: any,index: any) {
    if(confirm('Ban chac chan muon xoa chu ?')){
      this.groupService.delete(id).subscribe(res => {
      this.users.splice(index,1)
      })

    }
    
  }

  onClose() {
    this.dialogRef.close();
  }
}
