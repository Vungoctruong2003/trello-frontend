import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardCreateComponent} from "./board-create/board-create.component";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./index/index.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ReactiveFormsModule} from '@angular/forms';
import { AddUserComponent } from './add-user/add-user.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";

const routes: Routes = [
  {
    path: 'create-board', component: BoardCreateComponent
  }, {
    path: 'index/:id', component: IndexComponent
  },

]

@NgModule({
  declarations: [
    BoardCreateComponent,
    IndexComponent,
    AddUserComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DragDropModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule
  ]
})
export class BoardModule {
}
