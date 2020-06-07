import { Component } from '@angular/core' ;
@Component({
  selector : 'co-home' ,
  template : `
      <div class="ui container">
          <h1>Home</h1>
          <p>Das ist die KWM CoronaHUE.</p>
          <a routerLink="../slists" class="ui red button">
              Shoppingliste ansehen
              <i class="right arrow icon"></i>
          </a>
      </div>
  ` ,
  styles : []
})
export class HomeComponent { }
