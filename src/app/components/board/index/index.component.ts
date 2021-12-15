import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../services/board.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  lists: any;
  cards: any;
  listCards: any;
  id?: number ;

  constructor(private boardService: BoardService,
              private activeRouter: ActivatedRoute) {
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = paramMap.get('id')
    })
  }

  ngOnInit(): void {
    this.uploadData(this.id)
  }

  uploadData(id: number | undefined) {
    this.boardService.listCard(3).subscribe(res => {
      if (res.status == 'success') {
        this.lists = res.lists
        this.listCards = res.cards
        console.log('asd')
      }
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      for (let i = 0; i < this.listCards.length; i++) {
        for (let j = 0; j < this.listCards[i].length; j++) {
          if (this.listCards[i] != null) {
            this.listCards[i][j].list_id = this.lists[i].id
            this.listCards[i][j].seq = j
          }
        }
      }
      let data = {cards: this.listCards}
      this.boardService.updateCard(data).subscribe(res => {
        console.log(res)
      })
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log(this.listCards)
      for (let i = 0; i < this.listCards.length; i++) {
        for (let j = 0; j < this.listCards[i].length; j++) {
          if (this.listCards[i] != null) {
            this.listCards[i][j].list_id = this.lists[i].id
            this.listCards[i][j].seq = j
          }
        }
      }
      let data = {cards: this.listCards}
      this.boardService.updateCard(data).subscribe(res => {
        console.log(res)
      })
    }
  }

  drip(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listCards, event.previousIndex, event.currentIndex);
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    for (let i = 0; i < this.lists.length; i++) {
      this.lists[i].seq = i
    }
    let data = {lists: this.lists}
    this.boardService.updateLists(data).subscribe(res => {
    })
  }

}
