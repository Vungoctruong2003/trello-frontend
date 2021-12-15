import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupCreateComponent } from './group-create/group-create.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path:'create-group', component: GroupCreateComponent
  },
  
]

@NgModule({
  declarations: [
    GroupCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class GroupModule { }
