import { Injectable } from '@angular/core' ;
import {Slist} from "./slist" ;
import {HttpClient} from "@angular/common/http" ;
import {Observable, throwError } from "rxjs" ;
import { catchError , retry } from 'rxjs/operators' ;
import {Item} from "./item";
@Injectable ()
export class ShoppingListService {
  private api = 'http://bookstore20hue.s1610456006.student.kwmhgb.at/api' ;
  constructor(private http: HttpClient) { }

  getAll():Observable<Array<Slist>> {
    return this.http.get(`${this.api}/slists`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  getItemsInList(id: string):Observable<Array<Item>> {
    return this.http.get( `${this.api}/currentitem/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingle(id: string):Observable<Slist> {
    return this.http.get( `${this.api}/currentlist/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(slist: Slist): Observable<any> {
    return this.http.post(`${this.api}/slist`, slist)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  update(slist: Slist): Observable<any> {
    return this.http.put(` ${this.api}/slist/${slist.id}`, slist)
      . pipe(retry (3 )).pipe(catchError(this.errorHandler));
  }
  updateHelper(slist: Slist, id: string): Observable<Slist> {
    return this.http.put(` ${this.api}/slist/${id}`, slist)
      . pipe(retry (3 )).pipe(catchError(this.errorHandler));
  }

  remove (id: string): Observable<any> {
    return this.http.delete (`${this.api}/slist/${id}`)
      .pipe(retry ( 3 )).pipe(catchError (this.errorHandler));
  }
  private errorHandler(error: Error | any): Observable<any> {
    return throwError (error);
  }

}
