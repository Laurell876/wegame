import { IBasketItem, Basket, IBasketTotals } from './../shared/models/basket';
import { IVideoGame } from './../shared/models/videogame';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBasket } from '../shared/models/basket';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string): any {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        // sets behaviour subject next value
        this.basketSource.next(basket);
        // console.log(this.getCurrentBasketValue());
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket): any {
    return this.http
      .post(this.baseUrl + 'basket', basket)
      .subscribe((response: IBasket) => {
        // sets behaviour subject next value
        this.basketSource.next(response);
        this.calculateTotals();
      }, error => {
        console.log(error);
      });
  }

  getCurrentBasketValue(): IBasket {
    return this.basketSource.value;
  }

  addItemToBasket(item: IVideoGame, quantity = 1): void {
    const itemToAdd: IBasketItem = this.mapVideoGameItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);

    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
    this.setBasket(basket);
  }

  removeItemFromBasket(item: IBasketItem): void {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket): object {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(()=>{
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }


  private calculateTotals(): void {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = shipping + subtotal;
    this.basketTotalSource.next({ shipping, total, subtotal });
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    // find the index of that specific item in the basket
    const index = items.findIndex(i => i.id === itemToAdd.id);

    // if the item doesnt exist add it
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      // if the item esxists increase the quantity
      items[index].quantity += quantity;
    }
    return items;
  }


  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }


  private mapVideoGameItemToBasketItem(item: IVideoGame, quantity: number): IBasketItem {
    return {
      id: item.id,
      videoGameTitle: item.title,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      developer: item.developer,
      publisher: item.publisher
    };
  }

}
