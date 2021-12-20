import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupCreateComponent } from './group-create/group-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddUserToGroupComponent} from "./add-user-to-group/add-user-to-group.component";
import { GetUserComponent } from './get-user/get-user.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

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
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class GroupModule { }
