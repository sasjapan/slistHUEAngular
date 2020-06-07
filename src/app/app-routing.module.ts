import { NgModule } from '@angular/core' ;
import {Routes, RouterModule} from '@angular/router' ;
import { SlistDetailsComponent } from './slist-details/slist-details.component' ;
import { SlistListComponent } from './slist-list/slist-list.component' ;
import { HomeComponent } from './home/home.component' ;
import {SlistFormComponent} from "./list-form/list-form.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {LoginComponent} from "./login/login.component";
import {ItemFormComponent} from "./item-form/item-form.component";


const routes: Routes = [
  { path: '' , redirectTo: 'slists' , pathMatch : 'full' },
 // { path: 'home' , component: HomeComponent },
  { path: 'slists' , component: SlistListComponent},
  { path: 'slists/:id' , component: SlistDetailsComponent },
  { path: 'admin' , component: LoginFormComponent },
  { path: 'addslist' , component: SlistFormComponent },
  { path : 'login' , component: LoginComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
