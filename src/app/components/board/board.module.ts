import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BoardCreateComponent} from "./board-create/board-create.component";
import {RouterModule, Routes} from "@angular/router";
import {ChangePasswordComponent} from "../users/change-password/change-password.component";
import {RegisterComponent} from "../users/register/register.component";

const routes: Routes = [
  {
    path:'create-board', component: BoardCreateComponent
  },

]

@NgModule({
  declarations: [
    BoardCreateComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BoardModule { }
