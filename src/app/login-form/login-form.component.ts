import {Component, Input, OnInit} from '@angular/core';
import {Slist} from "../shared/slist";
import {Observable} from "rxjs";
import {ShoppingListService} from "../shared/shopping-list.service";
import {AuthService} from "../shared/authentication.service";
import {forEachComment} from "tslint";

@Component({
  selector: 'a.bs-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: []
})
export class LoginFormComponent implements OnInit {
  //books: Book[];
  slists$: Observable<Slist[]>;
  private $loggedUser: any;
  private $slist: Slist;
  constructor (private bs: ShoppingListService,
               private authService: AuthService){ }
  ngOnInit () {
//this.bs.getAll().subscribe(res => {this.books = res; console.log(this.books);});
    this.slists$ = this.bs.getAll();
  }
  isSearchingForHelp(){
    if(this.authService.isSearchingForHelp() == true){
      return true;
    }
    return false;
  }
  isLoggedIn() {
    return this .authService.isLoggedIn ();
  }
  currentHelper() {
    this.$loggedUser = localStorage.id;
    console.log(this.$loggedUser);
    return this.$loggedUser
  }
  hasNoLists(){
    this.slists$.forEach(function ($slist) {
      console.log(this.$slist);
      return this.$slist;
    });
  }

}
