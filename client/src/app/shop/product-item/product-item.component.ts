import { BasketService } from './../../basket/basket.service';
import { IVideoGame } from './../../shared/Models/videogame';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() videoGame: IVideoGame;

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {}

  addItemToBasket() {
    this.basketService.addItemToBasket(this.videoGame);
  }
}
