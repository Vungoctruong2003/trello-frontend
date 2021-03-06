import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './components/pages/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { SidebarComponent } from './components/core/sidebar/sidebar.component';
import { UsersModule } from './components/users/users.module';
import { MaterComponent } from './components/mater/mater.component';
import { HomeComponent } from './components/pages/home/home.component';
import { IntroComponent } from './components/pages/intro/intro.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import { GroupCreateComponent } from './components/group/group-create/group-create.component';

import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { ListCreateComponent } from './components/list/list-create/list-create.component';
import { BoardCreateComponent } from './components/board/board-create/board-create.component';
import { LoadHomeComponent } from './load-home/load-home.component';
import { LoadComponent } from './load/load.component';
import { TrelloComponent } from './components/trello/trello.component';
import { ChangeAvatarComponent } from './components/pages/change-avatar/change-avatar.component';
import {MatButtonModule} from "@angular/material/button";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    MaterComponent,
    HomeComponent,
    IntroComponent,
    LoadHomeComponent,
    LoadComponent,
    TrelloComponent,
    ChangeAvatarComponent,
  ],
  entryComponents: [
    GroupCreateComponent,
    ListCreateComponent,
    BoardCreateComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        UsersModule,
        BrowserAnimationsModule,
        MatDialogModule,
        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
        ToastrModule.forRoot(),
        MatButtonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
