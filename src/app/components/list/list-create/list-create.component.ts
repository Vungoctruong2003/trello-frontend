import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from 'src/app/services/board.service';
import { ListService } from 'src/app/services/list.service';

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
    private dialogRef: MatDialogRef<ListCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    let id = this.listService.getBoardId();
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
        alert('Tao list thanh cong')
        this.onClose();
        
        // this.router.navigate(['/login'])
      }else{}
    })
  }

  get title() {
    return this.formCreateList?.get('title');
  }

  onClose(){

    this.formCreateList?.reset();
    this.dialogRef.close();
  }

}
