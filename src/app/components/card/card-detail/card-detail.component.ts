import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardService} from "../../../services/card.service";
import {BoardService} from "../../../services/board.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {


  formDetailCard?: FormGroup;
  formComment?: FormGroup;
  formEdit?: FormGroup;
  content: boolean = false;
  title: boolean = false;
  user: any;
  users: any;
  listComment?: any;
  userCmtId?: any;

  constructor(
    private cardService: CardService,
    private boardService: BoardService,
    private authService: AuthService,
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private dialogRef: MatDialogRef<CardDetailComponent>,
    private router: Router,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  content1() {
    this.content = true
  }

  content2() {
    this.content = false
  }

  edit1() {
    this.title = true
  }

  edit2() {
    this.title = false
    this.content = false
    let data = this.formDetailCard?.value
    this.cardService.updateCard(data).subscribe(res => {
      if (res.status == 'success') {
        this.router.navigate(['/load'])
      }
    })
  }

  ngOnInit(): void {
    let id = this.cardService.getListId()
    this.authService.getProfile().subscribe(res => {
      this.user = res
    })

    this.cardService.index(id).subscribe(res => {
      this.listComment = res.comments
      this.formDetailCard = this.fb.group({
        id: [res.card.id, [Validators.required]],
        title: [res.card.title, [Validators.required]],
        contents: [res.card.content, [Validators.required]],
      })
      if (this.formDetailCard.value.contents == '') {
        this.content2()
      }
    })
    this.formComment = this.fb1.group({
      contentsCmt: ['', [Validators.required]]
    })
    this.formEdit = this.fb2.group({
      contentsCmt: ['', [Validators.required]]
    })
  }

  onClose() {
    this.formDetailCard?.reset();
    this.dialogRef.close();
    this.router.navigate(['/load'])
  }

  comment() {
    let contentCmt = this.formComment?.value
    let data = {
      "card_id": this.cardService.getListId(),
      "contentsCmt": contentCmt.contentsCmt
    }
    this.cardService.comment(data).subscribe(res => {
      this.formComment?.reset();
      this.toastr.success('Thêm mới bình luận thành công');
      let comment = {
        content: contentCmt.contentsCmt,
        user: this.user
      }
      if (res.status == "success") {
        this.listComment.push(comment)
      }
    })
  }

  deleteCmt(id: any, index: number) {
    this.cardService.deleteCmt(id).subscribe(res => {
      if (res.status == 'success') {
        this.toastr.success(res.message);
        this.listComment.splice(index, 1);
      } else {
        this.toastr.warning(res.message);
      }
    })
  }
}
