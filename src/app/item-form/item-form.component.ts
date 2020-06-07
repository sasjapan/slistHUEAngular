import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SlistFactory} from "../shared/slist-factory";
import {ShoppingListService} from "../shared/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../shared/item";
import {Slist} from "../shared/slist";
import {SlistFormErrorMessages} from "../list-form/slist-form-error-messages";

@Component({
  selector: 'co-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  itemForm : FormGroup;
  item = SlistFactory. empty ();
  errors : {[key : string]: string } = {};
  isUpdatingBook = false;
  items : FormArray;
  constructor(private fb : FormBuilder, private bs : ShoppingListService,
              private route : ActivatedRoute, private router : Router) { }
  ngOnInit(){
    const list_id = this.route.snapshot.params['list_id'];
    if (list_id) {
      this.isUpdatingBook = true;
    /*  this.bs.getSingle(list_id).subscribe (slist => {
        this.item = this.item;
       // this.initItem ();
      });*/
    }
    //this. initItem ();
  }/*
  initItem () {
    this.buildThumbnailsArray ();
    this.itemForm = this.fb.group ({
      name: [this. item.name , Validators. required ],
      amount: this.item.amount ,
      maxPrice: [this.item.list_id , [
        Validators. required ,
        Validators. minLength ( 0.1 ),
        Validators. maxLength ( 50 )
      ]],
//authors: this.authors,
      items: this.items ,
    });
    this.itemForm.statusChanges . subscribe (() =>
      this. updateErrorMessages ());
  }
  buildThumbnailsArray () {
    console.log(this.slist.items );
    if(this.slist.items.length == 0 ){ //if new book had no items -> but no in edit mode
      this.slist.items.push (new Item( 10 , 'Kugelschreiber' , 5, 1 ))
    }
    this.items = this.fb.array (
      this.slist.items.map (
        t => this.fb.group ({
          id: this.fb.control (t.name ),
          url: this.fb.control (t.amount ),
          title: this.fb.control (t.maxPrice)
        })
      )
    );
    console.log (this.items);
  }
  addThumbnailControl () {
    this.items.push (this.fb.group ({name : null, amount : null, maxPrice : null }));
  }
  submitForm () {
// filter empty values
    this.itemForm.value.items =
      this.itemForm.value.items.filter (thumbnail => thumbnail.name );
    const slist : Slist = SlistFactory.fromObject (this.itemForm.value );
//deep copy - did not work without??
    slist.items = this.itemForm.value.items ;
    console.log ( slist );
//just copy the authors
    slist.items = this. slist.items ;
    if (this.isUpdatingBook ) {
      this. bs . update ( slist ). subscribe (res => {
        this. router .navigate ([ '../../slists', slist.list_id ], { relativeTo :
          this. route });
      });
    } else {
      console.log(slist)
      this.bs.create(slist).subscribe (res => {
        this. slist = SlistFactory. empty ();
        this. itemForm . reset (SlistFactory. empty ());
        this. router.navigate ([ '../slists' ], { relativeTo : this. route });
      });
    }
  }
  updateErrorMessages(){
    this. errors = {};
    for (const message of SlistFormErrorMessages ) {
      const control = this.itemForm. get ( message.forControl );
      if ( control &&
        control.dirty &&
        control.invalid &&
        control.errors [message.forValidator] &&
        !this.errors [message.forControl]) {
        this.errors [message.forControl] = message.text ;
      }
    }
  }*/
}

