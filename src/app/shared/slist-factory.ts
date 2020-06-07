import { Slist } from './slist' ;
import {Item} from "./item";
import {Feedback} from "./feedback";

export class SlistFactory {
  static empty(): Slist {
    return new Slist( '0' , '' , false , null , 0,0,[], []);
  }
  static fromObject (rawList: any ): Slist {
    return new Slist(
      rawList.id ,
      rawList.list_name,
      rawList.done,
      rawList.duedate,
      rawList.creator_id,
      rawList.helper_id,
      rawList.items,
      rawList.feedback,

    );
  }

}
