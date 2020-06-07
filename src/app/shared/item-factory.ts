import {Item} from "./item";
import {Slist} from "./slist";


export class ItemFactory {
  static empty(): Item {
    return new Item( 0 , '' , 0, 0);
  }
  static fromObject (rawItem: any ): Item {
    return new Item(
      rawItem.id ,
      rawItem.name,
      rawItem.amount,
      rawItem.maxPrice
    );
  }
}
