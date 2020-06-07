import { BrowserModule } from '@angular/platform-browser' ;
import { NgModule } from '@angular/core' ;
import { AppComponent } from './app.component' ;
import { SlistListComponent } from './slist-list/slist-list.component';
import { SlistDetailsComponent } from './slist-details/slist-details.component';
import { HomeComponent } from './home/home.component' ;
import {AppRoutingModule} from './app-routing.module' ;
import { SlistListItemComponent} from './slist-list-item/slist-list-item.component';
import {ShoppingListService} from './shared/shopping-list.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from '@angular/forms';
import { SlistFormComponent } from './list-form/list-form.component';
import { LoginFormComponent } from './login-form/login-form.component' ;
import { registerLocaleData } from '@angular/common' ;
import localeDe from '@angular/common/locales/de' ;
import { LOCALE_ID } from '@angular/core';
import { LoginComponent } from './login/login.component' ;
import {AuthService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { ItemFormComponent } from './item-form/item-form.component';

registerLocaleData ( localeDe );

@NgModule({
  declarations : [
    AppComponent,
    SlistListComponent,
    SlistDetailsComponent,
    HomeComponent,
    SlistDetailsComponent,
    SlistListItemComponent,
    SlistFormComponent,
    LoginFormComponent,
    LoginComponent,
    ItemFormComponent
  ],
  imports : [
    BrowserModule, AppRoutingModule, HttpClientModule,
    ReactiveFormsModule
  ],
  providers : [ ShoppingListService,
    { provide: LOCALE_ID , useValue: 'de' }, AuthService,{
      provide : HTTP_INTERCEPTORS ,
      useClass : JwtInterceptorService,
      multi : true
    } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
