import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardCreateComponent} from "./board-create/board-create.component";
import {RouterModule, Routes} from "@angular/router";
import {AddUserComponent} from './add-user/add-user.component';


const routes: Routes = [
  {
    path: 'create-board',
    component: BoardCreateComponent
  }

]

@NgModule({
  declarations: [
    BoardCreateComponent,
    AddUserComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BoardModule {
}
