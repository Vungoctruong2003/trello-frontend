import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../../services/board.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ListCreateComponent} from '../../list/list-create/list-create.component';
import {ListService} from 'src/app/services/list.service';
import {CardCreateComponent} from "../../card/card-create/card-create.component";
import {CardService} from "../../../services/card.service";
import {ListEditTitleComponent} from "../../list/list-edit-title/list-edit-title.component";
import {CardDetailComponent} from "../../card/card-detail/card-detail.component";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  lists: any;
  cards: any;
  listCards: any;
  id?: number;
  role: any = 3;

  constructor(private boardService: BoardService,
              private listService: ListService,
              private matDialog: MatDialog,
              private router: Router,
              private toastr: ToastrService,
              private cardService: CardService,
              private activeRouter: ActivatedRoute) {
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = paramMap.get('id')
      this.boardService.setBoardId(this.id)
      this.boardService.getRole(this.id).subscribe(res => {
        this.role = res.data
      })
    })
  }

  ngOnInit(): void {
    this.uploadData(this.id)
  }

  uploadData(id: any | undefined) {
    this.boardService.listCard(id).subscribe(res => {
      if (res.status == 'success') {
        this.lists = res.lists
        this.listCards = res.cards
      }
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    if (this.role == 1 || this.role == 2) {
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
  }

  drip(event: CdkDragDrop<string[]>) {
    if (this.role == 1 || this.role == 2) {
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

  openDialogCreateList() {
    if (this.role == 1 || this.role == 2) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "30%";
      this.matDialog.open(ListCreateComponent, dialogConfig);
    }
  }
  openDialogEditTitleList(id:any) {
    if (this.role == 1 || this.role == 2) {
      this.cardService.setListId(id)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "20%";
      this.matDialog.open(ListEditTitleComponent, dialogConfig);
    }
  }

  openDialogCreateCard(id: any) {
    if (this.role == 1 || this.role == 2) {
      this.cardService.setListId(id)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "30%";
      this.matDialog.open(CardCreateComponent, dialogConfig);
    }
  }

  openDialogDetailCard(id: any) {
    this.cardService.setListId(id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.minHeight = "50%";
    dialogConfig.height = "80%";
    this.matDialog.open(CardDetailComponent, dialogConfig);
  }

  confirmDeleteList(id:any){
    Swal.fire({
      title: 'B???n c?? ch???c ch???n mu???n x??a danh s??ch n??y ?',
      // text: 'B???n s??? kh??ng th??? kh??i ph???c t???p n??y!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '?????ng ?? x??a!',
      cancelButtonText: 'H???y'
    }).then((result) => {
      if (result.value) {
        if (this.role == 1 || this.role == 2) {
          this.listService.deleteList(id).subscribe(res => {
            this.router.navigate(['/load'])
          })
        }
        Swal.fire(
          '???? x??a !',
          'Danh s??ch ???? b??? x??a !.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          '???? h???y',
          'Kh??ng x??a danh s??ch n??y !',
          'error'
        )
      }
    })
  }
}
