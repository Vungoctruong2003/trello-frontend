import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterComponent } from './components/mater/mater.component';
import {LoginComponent} from "./components/pages/login/login.component";
import { UsersModule } from './components/users/users.module';

const routes: Routes = [
  {
    path :'login',
    component : LoginComponent
  },
  {
    path :'users',
    loadChildren: () => import('./components/users/users.module').then(module => UsersModule)
  },
  {
    path :'master',
    component : MaterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
