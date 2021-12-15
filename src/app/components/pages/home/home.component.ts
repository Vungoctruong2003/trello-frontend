import {Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { BoardService } from 'src/app/services/board.service';
import {HomeService} from 'src/app/services/home.service';
import { BoardCreateComponent } from '../../board/board-create/board-create.component';
import { GroupCreateComponent } from '../../group/group-create/group-create.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  groups: any;
  boards: any;
  arr: any = [[]];


  constructor(private homeService: HomeService,
              private router: Router,
              private matDialog: MatDialog,
              private boardService: BoardService
              ) {
  }

  
  ngOnInit(): void {
    this.getAll();
  }
  
  getAll(){
    let i = 0;
    let j = 0;
    this.homeService.listGroup().subscribe(res => {
      this.groups = res.data
      i=1
      if (i==1 && j==1){
        this.merge(this.groups,this.boards)
      }
    })
    this.homeService.listBoard().subscribe(res => {
      this.boards = res.data
      j=1
      if (i==1 && j==1){
        this.merge(this.groups,this.boards)
      }
    })
  }

  merge(groups:any,boards:any){
    console.log(this.groups)
    console.log(this.boards)
       for (let i=0;i<groups.length;i++){
         console.log(i)
      this.arr[i]=[]
      for (let j=0;j<boards.length;j++){      
        if (groups[i].group.id == boards[j].board.group_id){
          this.arr[i].push(boards[j])
        }
      }
      this.arr[i].id = 1
    }
  }

  openDialogCreateGroup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    this.matDialog.open(GroupCreateComponent,dialogConfig);
  }

  openDialogCreateBoard(id:any){
    this.boardService.setGroupId(id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    this.matDialog.open(BoardCreateComponent,dialogConfig);
  }

}
