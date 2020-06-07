import { Component, OnInit, Input } from '@angular/core' ;
import {Slist} from "../shared/slist" ;
import {AuthService} from "../shared/authentication.service";
import {Observable} from "rxjs";
import {ShoppingListService} from "../shared/shopping-list.service";
@Component({
  selector : 'a.bs-slist-list-item' ,
  templateUrl : './slist-list-item.component.html' ,
  styles : []
})
export class SlistListItemComponent implements OnInit {
  @Input() slist : Slist;
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
}
