import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'src/app/services/group.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


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
    private dialogRef: MatDialogRef<GroupCreateComponent>,
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
        alert('Tao group thanh cong')
        this.onClose();
        
        // this.router.navigate(['/login'])
      }else{}
    })
  }
  onClose(){

    this.formCreateGroup?.reset();
    this.dialogRef.close();
  }

}
