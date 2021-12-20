import {Component, Inject, OnInit} from '@angular/core';
import {BoardService} from "../../../services/board.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TagService} from "../../../services/tag.service";
import {CardService} from "../../../services/card.service";

@Component({
  selector: 'app-add-user-into-card',
  templateUrl: './add-user-into-card.component.html',
  styleUrls: ['./add-user-into-card.component.css']
})
export class AddUserIntoCardComponent implements OnInit {

  users: any
  userInCard: any=[]

  constructor(private boardService: BoardService,
              private tagService: TagService,
              private cardService: CardService,
              private dialogRef: MatDialogRef<AddUserIntoCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit(): void {
    let idBoard = this.boardService.getBoardId()
    this.boardService.getUser(idBoard).subscribe(res => {
      if (res.status == 'success')
        this.users = res.data
    })
    this.cardService.index(this.tagService.getId()).subscribe(res => {
      for (let i=0 ;i<this.users.length;i++){
        let a = 0
        for (let tagElement of res.tags) {
          if (tagElement.user_id == this.users[i].user_id){
            a = 1
          }
        }
        this.userInCard.push(a)
      }
    })
  }

  add(id: any,index:any) {
    let data = {
      user_id: id,
      card_id: this.tagService.getId()
    }
    console.log(data)
    this.tagService.addUser(data).subscribe(res => {
      if (res.status == 'add'){
        this.userInCard[index]=true
      }
      if (res.status == 'delete'){
        this.userInCard[index]=false
      }
    })
  }

  onClose() {
    this.dialogRef.close();
  }

}
