import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCreateComponent } from './card-create/card-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CardDetailComponent } from './card-detail/card-detail.component';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import { AddUserIntoCardComponent } from './add-user-into-card/add-user-into-card.component';



@NgModule({
  declarations: [
    CardCreateComponent,
    CardDetailComponent,
    AddUserIntoCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule
  ]
})
export class CardModule { }
