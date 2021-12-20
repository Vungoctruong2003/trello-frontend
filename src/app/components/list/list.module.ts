import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCreateComponent } from './list-create/list-create.component';
import {ListEditTitleComponent} from "./list-edit-title/list-edit-title.component";
import {MatButtonModule} from "@angular/material/button";
const routes: Routes = [
  {
    path: 'create-list', component: ListCreateComponent
  }
]

@NgModule({
  declarations: [
    ListCreateComponent,
    ListEditTitleComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        MatButtonModule,
    ]
})
export class ListModule { }
