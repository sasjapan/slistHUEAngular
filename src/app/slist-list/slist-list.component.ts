import {Component, OnInit} from '@angular/core' ;
import {Slist} from '../shared/slist' ;
import {ShoppingListService} from '../shared/shopping-list.service' ;
import {Observable} from 'rxjs' ;
import {AuthService} from "../shared/authentication.service";

@Component ({
  selector : 'a.bs-slist-list' ,
  templateUrl : './slist-list.component.html' ,
  styles : []
})
export class SlistListComponent implements OnInit {
//books: Book[];
  slists$: Observable<Slist[]>;
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
}
