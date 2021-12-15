import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoardCreateComponent} from "./board-create/board-create.component";
import {RouterModule, Routes} from "@angular/router";
import {ChangePasswordComponent} from "../users/change-password/change-password.component";
import {RegisterComponent} from "../users/register/register.component";
import {IndexComponent} from "./index/index.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'create-board', component: BoardCreateComponent
  },{
    path:'index', component: IndexComponent
  },

]

@NgModule({
  declarations: [
    BoardCreateComponent,IndexComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class BoardModule { }
