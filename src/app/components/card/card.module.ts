import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCreateComponent } from './card-create/card-create.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CardCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CardModule { }
