import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';
import { ListService } from 'src/app/services/list.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.css']
})
export class ListCreateComponent implements OnInit {

  formCreateList?: FormGroup

  constructor(
    private boardService: BoardService,
    private listService: ListService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<ListCreateComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    let id = this.boardService.getBoardId();
    this.formCreateList = this.fb.group({
      title: ['',[Validators.required]],
      board_id: [id,[Validators.required]],
    })
  }

  createList(){
    const data = this.formCreateList?.value;
    console.log(data);
    this.listService.createList(data).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Tạo mới líst thành công ');
        this.onClose();
      }else{}
    })
  }

  get title() {
    return this.formCreateList?.get('title');
  }

  onClose(){

    this.formCreateList?.reset();
    this.dialogRef.close();
    this.router.navigate(['/load']);
  }

}
