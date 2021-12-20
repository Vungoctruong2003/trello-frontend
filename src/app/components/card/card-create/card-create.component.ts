import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoardService} from "../../../services/board.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CardService} from "../../../services/card.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css']
})
export class CardCreateComponent implements OnInit {

  formCreateCard?: FormGroup ;
  constructor(
    private cardService: CardService,
    private boardService: BoardService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CardCreateComponent>,
    private router: Router,
    private toastr : ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    let id = this.cardService.getListId()
    this.formCreateCard = this.fb.group({
      title: ['',[Validators.required]],
      contents: ['',[Validators.required]],
      list_id: [id,[Validators.required]],
    })
  }

  createCard(){
    const data = this.formCreateCard?.value;
    console.log(data);
    this.cardService.createCard(data).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Tạo mới thẻ thành công ');
        this.onClose();
      }else{}
    })
  }

  get title() {
    return this.formCreateCard?.get('title');
  }

  get content() {
    return this.formCreateCard?.get('content');
  }

  onClose(){
    this.formCreateCard?.reset();
    this.dialogRef.close();
    this.router.navigate(['/load'])
  }

  onCancel(){
    this.formCreateCard?.reset();
    this.dialogRef.close()
  }


}
