import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-home',
  templateUrl: './load-home.component.html',
  styleUrls: ['./load-home.component.css']
})
export class LoadHomeComponent implements OnInit {

  constructor(
    private router: Router,
  ) { 
    this.router.navigate(['trello/home']);
  }

  ngOnInit(): void {
  }

}
