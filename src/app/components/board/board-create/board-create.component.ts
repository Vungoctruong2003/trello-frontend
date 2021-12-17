import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoardService } from 'src/app/services/board.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.css']
})
export class BoardCreateComponent implements OnInit {

  formCreateBoard?: FormGroup;
  constructor(
    private boardService: BoardService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<BoardCreateComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    let id = this.boardService.getGroupId()
    this.formCreateBoard = this.fb.group({
      title: ['',[Validators.required]],
      policy: ['',[Validators.required]],
      group_id: [id,[Validators.required]],
    })
  }

  createBoard(){
    const data = this.formCreateBoard?.value;
    console.log(data);
    this.boardService.createBoard(data).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Tạo mới bảng thành công')
        this.onClose();
      }else{}
    })
  }

  get title() {
    return this.formCreateBoard?.get('title');
  }

  get policy() {
    return this.formCreateBoard?.get('policy');
  }

  onClose(){

    this.formCreateBoard?.reset();
    this.dialogRef.close();
    this.router.navigate(['/load-home']);
  }

}
