import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCreateComponent } from './card-create/card-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CardDetailComponent } from './card-detail/card-detail.component';



@NgModule({
  declarations: [
    CardCreateComponent,
    CardDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CardModule { }
