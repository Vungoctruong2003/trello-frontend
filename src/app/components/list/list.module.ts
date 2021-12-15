import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCreateComponent } from './list-create/list-create.component';

const routes: Routes = [
  {
    path: 'create-list', component: ListCreateComponent
  }
]

@NgModule({
  declarations: [
    ListCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ListModule { }
