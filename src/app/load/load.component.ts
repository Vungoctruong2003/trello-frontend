import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BoardService} from "../services/board.service";

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  constructor(private boardService: BoardService,
              private router: Router) {
    let id = this.boardService.getBoardId()
    // @ts-ignore
    this.router.navigate(['trello/master/boards/index/', id])
  }

  ngOnInit(): void {
  }

}
