import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupCreateComponent } from './group-create/group-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import {AddUserToGroupComponent} from "./add-user-to-group/add-user-to-group.component";
import { GetUserComponent } from './get-user/get-user.component';

const routes: Routes = [
  {
    path:'create-group', component: GroupCreateComponent
  },
  {
    path:'get-user/:id', component: GetUserComponent
  },

]

@NgModule({
  declarations: [
    GroupCreateComponent,
    AddUserToGroupComponent,
    GetUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class GroupModule { }
