import { Item } from './item' ;
export { User } from './user' ;
import { Feedback } from './feedback' ;

export class Slist {
  constructor(
    public id: string ,
    public list_name: string ,
    public done: boolean ,
    public duedate: Date,
    public creator_id: number,
    public helper_id?: number,
    public items?: Item[],
    public feedback?: Feedback[],
  ) { }
}
