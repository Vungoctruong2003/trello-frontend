import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'src/app/services/group.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {ToastrModule, ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

  formCreateGroup?: FormGroup;
  constructor(
    private groupService: GroupService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<GroupCreateComponent>,
    private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    this.formCreateGroup = this.fb.group({
      title : ['',[Validators.required]],
      policy : ['',[Validators.required]],
    })
  }

  get title() {
    return this.formCreateGroup?.get('title');
  }

  get policy() {
    return this.formCreateGroup?.get('policy');
  }

  createGroup(){
    const data = this.formCreateGroup?.value;
    console.log(data);
    this.groupService.createGroup(data).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Thêm mới không gian làm việc thành công ');
        this.onClose();


        // this.router.navigate(['/login'])
      }else{}
    })
  }
  onClose(){

    this.formCreateGroup?.reset();
    this.dialogRef.close();
    this.router.navigate(['/load-home'])
  }

}
