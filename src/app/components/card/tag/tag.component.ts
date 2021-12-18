import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../services/board.service";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  users:any

  constructor(private boardService: BoardService) {
  }

  ngOnInit(): void {
    let idBoard = this.boardService.getBoardId()
    this.boardService.getUser(idBoard).subscribe(res => {
      if (res.status == 'success')
        this.users = res.data
      console.log(this.users)
    })
  }

}
