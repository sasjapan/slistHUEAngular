export class ErrorMessage {
  constructor (
    public forControl: string ,
    public forValidator: string ,
    public text: string
  ) { }
}
export const SlistFormErrorMessages = [
  new ErrorMessage( 'list_name' , 'required' , 'Ein Name für die Liste muss angegeben werden' ),
  new ErrorMessage( 'list_id' , 'required' , 'Es muss eine ID angegeben werden' ),new ErrorMessage( 'isbn' , 'minlength' , 'Die ISBN muss mindestens 10 Zeichen enthalten' ), new ErrorMessage( 'isbn' , 'maxlength' , 'Eine ISBN darf höchstens 13 Zeichen haben' ),
  new ErrorMessage( 'duedate' , 'required' , 'Es muss ein Fälligkeitsdatum angegeben werden' ),
  new ErrorMessage( 'items' , 'required' , 'Es muss mind. ein Item angegeben werden' ),
  new ErrorMessage( 'done' , 'required' , 'Es muss angegeneb werden, ob Liste fertig ist oder nicht' ),

  new ErrorMessage( 'itemname' , 'required' , 'Es muss ein Name für das Item angegeben werden' ),
  new ErrorMessage( 'amount' , 'required' , 'Es muss mind. ein Item angegeben werden' ),
  new ErrorMessage( 'maxPrice' , 'required' , 'Es muss ein Preis angegeben werden' ),


];
