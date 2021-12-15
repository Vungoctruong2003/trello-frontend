import { Component, OnInit } from '@angular/core';
import {BoardService} from "../../../services/board.service";

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.css']
})
export class BoardCreateComponent implements OnInit {

  constructor(private boardService : BoardService) { }

  ngOnInit(): void {
  }


}
