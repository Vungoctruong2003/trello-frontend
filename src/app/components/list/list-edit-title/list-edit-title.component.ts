import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ListCreateComponent} from "../list-create/list-create.component";
import {ListService} from "../../../services/list.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CardService} from "../../../services/card.service";

@Component({
  selector: 'app-list-edit-title',
  templateUrl: './list-edit-title.component.html',
  styleUrls: ['./list-edit-title.component.css']
})
export class ListEditTitleComponent implements OnInit {
  formEditTitle?: FormGroup;
  idListCard?:any;
  constructor(
    private dialogRef: MatDialogRef<ListCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private listService: ListService,
    private fb: FormBuilder,
    private cardService: CardService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.formEditTitle = this.fb.group({
      title: ['',[Validators.required]],
    })
    this.idListCard = this.cardService.getListId()
  }

  editTitle(){
    const data = this.formEditTitle?.value;
    const id = this.idListCard;
    console.log(data);
    this.listService.editTitle(data,id).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success('Thay đổi tiêu đề thành công');
        this.onClose();
      }else{}
    })
  }

  get title() {
    return this.formEditTitle?.get('title');
  }

  onClose(){
    this.formEditTitle?.reset();
    this.dialogRef.close();
    this.router.navigate(['/load']);
  }

}
