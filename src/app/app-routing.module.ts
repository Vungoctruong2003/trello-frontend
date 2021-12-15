import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupModule } from './components/group/group.module';
import { MaterComponent } from './components/mater/mater.component';
import { HomeComponent } from './components/pages/home/home.component';
import { IntroComponent } from './components/pages/intro/intro.component';
import {LoginComponent} from "./components/pages/login/login.component";
import { UsersModule } from './components/users/users.module';
import {BoardModule} from "./components/board/board.module";
import { ListModule } from './components/list/list.module';
import { LoadHomeComponent } from './load-home/load-home.component';
import {CardModule} from "./components/card/card.module";
import {LoadComponent} from "./load/load.component";
import { TrelloComponent } from './components/trello/trello.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path :'login',
    component : LoginComponent
  },
  {
    path :'users',
    loadChildren: () => import('./components/users/users.module').then(module => module.UsersModule)
  },
  {
    path: '',
    component: IntroComponent,
  },
  {
    path: 'trello',
    component: TrelloComponent,
    children: [
      {
        path :'groups',
        loadChildren: () => import('./components/group/group.module').then(module => module.GroupModule)
      },
      {
        path :'cards',
        loadChildren: () => import('./components/card/card.module').then(module => CardModule)
      },
      {
        path :'lists',
        loadChildren: () => import('./components/list/list.module').then(module => ListModule)
      },
      {
        path :'master',
        component : MaterComponent,
        children: [
          {
            path :'boards',
            loadChildren: () => import('./components/board/board.module').then(module => BoardModule)
          }, 
        ]
      },
      {
        path :'home',
        component : HomeComponent
      },
    ],
    canActivate: [AuthGuard]
  },
  
  {
    path :'load-home',
    component : LoadHomeComponent
  },
  {
    path :'load',
    component : LoadComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
