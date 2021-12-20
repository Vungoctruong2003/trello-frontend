import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../../services/group.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GroupCreateComponent} from "../group-create/group-create.component";
import {BoardService} from "../../../services/board.service";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
  styleUrls: ['./add-user-to-group.component.css']
})
export class AddUserToGroupComponent implements OnInit {

  formAddUserToGroup?: FormGroup;
  idGroup?: any;
  idUser?: any;
  notice?: any



  constructor(private groupService: GroupService,
              private fb: FormBuilder,
              private boardService: BoardService,
              private userService: UserService,
              private router: Router,
              private toastr: ToastrService,
              private dialogRef: MatDialogRef<GroupCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }


  ngOnInit(): void {
    this.formAddUserToGroup = this.fb.group({
      key: ['', [Validators.required]],
    })
    this.idGroup = this.boardService.getGroupId()
  }

  get email() {
    return this.formAddUserToGroup?.get('key');
  }

  searchByEmail() {
    const key = this.formAddUserToGroup?.value;
    this.userService.searchByEmail(key).subscribe(res => {
      this.idUser = res.data[0].id
      this.addUserToGroup()
    })
  }

  addUserToGroup() {
    let data = {
      "user_id": this.idUser,
      "group_id": this.idGroup,
      "role": 3
    }

    this.groupService.addUserToGroup(data).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Thêm mới người dùng thành công ');
        this.onClose();
      } else if (res.status =='error'){
        this.toastr.warning('Người dùng đã có trong nhóm');
      } else {
        this.toastr.error('Người dùng không tồn tại')
      }
    })
  }

  onClose() {
    this.formAddUserToGroup?.reset();
    this.dialogRef.close();
    this.router.navigate(['/load-home'])
  }

  onCancel(){
    this.formAddUserToGroup?.reset();
    this.dialogRef.close();
  }

}

