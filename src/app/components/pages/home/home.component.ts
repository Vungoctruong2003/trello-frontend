import {Component, OnInit} from '@angular/core';
import {HomeService} from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  groups: any;
  boards: any;

  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.listGroup().subscribe(res => {
      this.groups = res.data
      console.log(this.groups[0].group.id)
    })
    this.homeService.listBoard().subscribe(res => {
      this.boards = res.data
      console.log(this.boards[0].board.group_id)
    })
  }

}
