import {ActivatedRoute, Router} from '@angular/router' ;
import {Component, OnInit} from '@angular/core' ;
import {FormBuilder, FormGroup, FormArray, Validators} from
    '@angular/forms' ;

import {SlistFactory} from "../shared/slist-factory" ;
import {ShoppingListService} from "../shared/shopping-list.service" ;
import {Slist} from "../shared/slist" ;
import {Item} from "../shared/item";
import {SlistFormErrorMessages} from "./slist-form-error-messages";

@Component({
  selector: 'bs-slist-form',
  templateUrl: './list-form.component.html'
})
export class SlistFormComponent implements OnInit {
  listForm: FormGroup;
  slist = SlistFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingBook = false;
  items: FormArray;

  constructor(private fb: FormBuilder, private bs: ShoppingListService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const list_id = this.route.snapshot.params['id'];
    if (list_id) {
      this.isUpdatingBook = true;
      this.bs.getSingle(list_id).subscribe(slist => {
        this.slist = slist;
        this.initList();
      });
    }
    this.initList();
  }

  initList() {
    this.buildItemsArray ();
    this.listForm = this.fb.group({
      id: this.slist.id,
      list_name: [this.slist.list_name, Validators.required],
      done: this.slist.done,
      duedate: [this.slist.duedate, Validators.required],
      creator_id: this.slist.creator_id = localStorage.id,
      helper_id: this.slist.helper_id,
      items: this.items,
      //feedback: this.feedback,
    });
    this.listForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  buildItemsArray() {
     if(this.slist.items.length == 0 ){
       this.slist.items.push (new Item( 0 , '' , 0, 0 ))
     }
     this.items = this.fb.array (
       this.slist.items.map (
         t => this.fb.group ({
           id: this.fb.control (t.id),
           name: this.fb.control (t.name),
           amount: this.fb.control (t.amount),
           maxPrice: this.fb.control (t.maxPrice)
         })
       )
     );
    console.log(this.items);
  }

  addNewItem() {
    this.items.push(this.fb.group({name: null, amount: null, maxPrice: null}));
  }

  submitForm() {
    const slist: Slist = SlistFactory.fromObject(this.listForm.value);
    console.log(slist);
    slist.items = this.listForm.value.items;
    //Feedback
    if (this.isUpdatingBook) {
      this.bs.update(slist).subscribe(res => {
        this.router.navigate(['../../slists', slist.id], {
          relativeTo:
          this.route
        });
      });
    } else {
      console.log("liste:" , slist);
      this.bs.create(slist).subscribe(res => {
        this.slist = SlistFactory.empty();
        this.listForm.reset(SlistFactory.empty());
        this.router.navigate(['../slists'], {relativeTo: this.route});
      });
    }
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of SlistFormErrorMessages) {
      const control = this.listForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors [message.forValidator] &&
        !this.errors [message.forControl]) {
        this.errors [message.forControl] = message.text;
      }
    }
  }
}

