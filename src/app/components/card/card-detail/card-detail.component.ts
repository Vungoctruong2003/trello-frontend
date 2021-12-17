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
  content: boolean = false;
  title: boolean = false;
  user: any;
  users: any;

  constructor(
    private cardService: CardService,
    private boardService: BoardService,
    private authService: AuthService,
    private fb: FormBuilder,
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
      this.formDetailCard = this.fb.group({
        id: [res.card.id, [Validators.required]],
        title: [res.card.title, [Validators.required]],
        contents: [res.card.content, [Validators.required]],
      })
      if (this.formDetailCard.value.contents == '') {
        this.content2()
      }
    })
  }

  onClose() {
    this.formDetailCard?.reset();
    this.dialogRef.close();
    this.router.navigate(['/load'])
  }

}
