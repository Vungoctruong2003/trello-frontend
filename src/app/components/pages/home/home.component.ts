import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {HomeService} from 'src/app/services/home.service';

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
              private router: Router) {
  }

  ngOnInit(): void {
    let i = 0;
    let j = 0;
    this.homeService.listGroup().subscribe(res => {
      this.groups = res.data
      i=1
      console.log(this.groups)
      if (i==1 && j==1){
        this.merge(this.groups,this.boards)
      }
    })
    this.homeService.listBoard().subscribe(res => {
      this.boards = res.data
      j=1
      console.log(this.boards)
      if (i==1 && j==1){
        this.merge(this.groups,this.boards)
      }
    })

  }

  merge(groups:any,boards:any){
    for (let i=0;i<groups.length;i++){
      for (let j=0;j<boards.length;j++){
        if (groups[i].group.id == boards[j].board.group_id){
          if (this.arr[i] == null)
          this.arr[i]=[]
          this.arr[i].push(boards[j])
          console.log(i,j)
        }
      }
    }
    console.log(this.arr)

  }

}
