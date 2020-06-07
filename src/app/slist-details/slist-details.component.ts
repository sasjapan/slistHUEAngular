import {Component,OnInit} from '@angular/core' ;
import {ActivatedRoute, Router} from "@angular/router" ;
import {SlistFactory} from "../shared/slist-factory" ;
import {ShoppingListService} from "../shared/shopping-list.service";
import {Slist} from "../shared/slist";
import {AuthService} from "../shared/authentication.service";
import {SlistFormComponent} from "../list-form/list-form.component";
import {Item} from "../shared/item";
import {Observable} from "rxjs";
import {ItemFactory} from "../shared/item-factory";

@Component({
  selector : 'bs-slist-details' ,
  templateUrl : './slist-details.component.html' ,
  styles : []
})
export class SlistDetailsComponent implements OnInit {
  slist : Slist = SlistFactory.empty();
  items$ : Item[];
  link : string;

  constructor(
    private bs: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
  ) { }

  getItems($id){

    /*const params = this.route.snapshot.params ;
    this.bs.getItemsInList($id).subscribe(b => this.items = b);
    console.log("funktioniert?",$id, "und:", this.items);

    if($id == $id){

    }*/

  }

  ngOnInit(): void{
    const params = this.route.snapshot.params ;
    this.bs.getSingle(params['id']).subscribe(b =>{ this.slist = b; console.log(b)});
    console.log(params['id']);
    console.log("Liste?", this.slist);
    console.log(this.bs.getSingle(params['id']));
    this.link = "../additem/"+params['id'];

    this.bs.getItemsInList(params['id']).subscribe(res => this.items$= res);
   // this.items$ = this.bs.getItemsInList(params['id']);
    console.log("hier", params['id'], "und: ");
  }

  removeList () {
    if (confirm ( 'Liste wirklich löschen?' )) {
      this.bs.remove(this.slist.id)
        .subscribe(res =>this.router.navigate(['../'], {relativeTo :
          this.route}));
    }
  }
  isSearchingForHelp(){
    if(this.authService.isSearchingForHelp() == true){
      return true;
    }
    return false;
  }
  updateHelper(){
    console.log("Helfer:", this.slist.helper_id);

    if(this.slist.helper_id == null){
      this.slist.helper_id = localStorage.id;
      this.bs.update(this.slist).subscribe(res => {
        this.router.navigate(['../../slists', this.slist.id], { relativeTo: this.route})
      })

      console.log("Du wurdest als Helfer hinzugefügt");
      return true;
    }else{
      console.log("liste hat schon einen Helfer");
      return false;
    }


  }
  updateDone() {
    console.log("Done:", this.slist.done);

    if (this.slist.done == true) {
      this.slist.done = false;
      this.bs.update(this.slist).subscribe(res => {
        this.router.navigate(['../../slists', this.slist.id], {relativeTo: this.route})
      })

      console.log("Liste ist jetzt erledigt");
      return true;
    } else {
      this.slist.done = true;
      this.bs.update(this.slist).subscribe(res => {
        this.router.navigate(['../../slists', this.slist.id], {relativeTo: this.route})
      })
      console.log("Liste ist bereits erledigt");
      return false;

    }
  }
}
