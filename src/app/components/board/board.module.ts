import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardCreateComponent} from "./board-create/board-create.component";
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./index/index.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ReactiveFormsModule} from '@angular/forms';

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
    IndexComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class BoardModule {
}
