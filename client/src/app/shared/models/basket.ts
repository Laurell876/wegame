

import { v4 as uuidv4 } from 'uuid';


export interface IBasket {
  id: string;
  items: IBasketItem[];
}

export interface IBasketItem {
  id: number;
  videoGameTitle: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  developer: string;
  publisher: string;
}


export class Basket implements IBasket {
    id = uuidv4();
    items: IBasketItem[] = new Array();

}


export interface IBasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}
